import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-admin-medico',
  templateUrl: './admin-medico.component.html',
  styleUrls: ['./admin-medico.component.css']
})
export class AdminMedicoComponent implements OnInit {
  public trabajaLosSabados = false;
  public horarioSabadosDesde;
  public horarioSabadosHasta;
  public loggedUser:any;
  public cargando = true;
  toppings = new FormControl();
  public dia: string;
  public diasSeleccionados;
  public diasDeSemanaDesde;
  public diasDeSemanaHasta;
  public dias = ['Lunes', 'Martes', 'Miércoles','Jueves','Viernes'];
  public times = ["30","60"];

  constructor(private db:FirestoreService, private authService:AuthenticationService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.getLoggedUser();
  }


  
  getLoggedUser()
  {
    let user;
    this.db.getLoggedUser(this.authService.userLoggedIn.uid).subscribe((res)=>{
      
        user = res.payload.data();
        this.cargando = false;
        this.loggedUser = user;
        console.log(this.loggedUser)
    });
  }

  comboChange(event)
{
  if (!event) {
    this.diasSeleccionados = this.toppings.value;
    console.log(this.diasSeleccionados);
  }
}

Confirm()
{
  this.messageService.clear();
   if(this.diasSeleccionados != null && this.diasDeSemanaDesde != null && this.diasDeSemanaHasta != null)
   {
     if(this.trabajaLosSabados)
     {
       if(this.horarioSabadosDesde == null || this.horarioSabadosHasta == null)
       {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Especifique el horario para poder guardar.' });

       }
     }
     let user = this.setData();
      this.db.updateMedico(user,this.authService.userLoggedIn.uid).then((x)=>
      {
        this.messageService.add({ severity: 'success', summary: '', detail: 'Se ha guardado correctamente.' });

      });
   }
   else
   {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Complete todos los datos del formulario para poder guardar.' });

   }
}

setData()
{
  this.diasSeleccionados = this.diasSeleccionados.map((x)=>{
    return{
      dia:x,
      desde: this.diasDeSemanaDesde,
      hasta: this.diasDeSemanaHasta
    };
  });
  if(this.trabajaLosSabados)
  {
    this.diasSeleccionados.push({
      dia: "Sábado",
      desde: this.horarioSabadosDesde,
      hasta:this.horarioSabadosHasta
    });
  }
  let obj =
  {
      diasQueTrabaja:this.diasSeleccionados

  };

  return obj;
}

Cancel(){
  this.toppings.setValue(null);
   this.diasSeleccionados = null;
   this.diasDeSemanaHasta = null;
   this.diasDeSemanaDesde = null;
   this.horarioSabadosDesde = null;
   this.horarioSabadosHasta =null;
   this.trabajaLosSabados = false;

}

}
