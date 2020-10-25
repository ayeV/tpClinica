import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
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
  public loggedUser: any;
  public cargando = true;
  toppings = new FormControl();
  public dia: string;
  public diasSeleccionados;
  public diasDeSemanaDesde;
  public diasDeSemanaHasta;
  public dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  public times = ["30", "60"];
  public duraciones;
  constructor(private db: FirestoreService, private authService: AuthenticationService, private messageService: MessageService,private router:Router) { }

  ngOnInit(): void {
    this.getLoggedUser();
  }



  getLoggedUser() {
    let user;
    this.db.getLoggedUser(this.authService.userLoggedIn.uid).subscribe((res) => {

      user = res.payload.data();
      this.cargando = false;
      this.loggedUser = user;
      console.log(this.loggedUser)
    });
  }

  comboChange(event) {
    if (!event) {
      this.diasSeleccionados = this.toppings.value;
      console.log(this.diasSeleccionados);
    }
  }

  Confirm() {
    this.messageService.clear();
    if (this.diasSeleccionados != null && this.diasDeSemanaDesde != null && this.diasDeSemanaHasta != null) {
      if (this.trabajaLosSabados) {
        let sabadoDesde;
        let sabadoHasta;
        if (this.horarioSabadosDesde == null || this.horarioSabadosHasta == null) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Especifique el horario para poder guardar.' });

        }
        else{
          sabadoDesde = parseInt(this.horarioSabadosDesde.split(':')[0]);
          sabadoHasta = parseInt(this.horarioSabadosHasta.split(':')[0]);

          if(sabadoDesde >= sabadoHasta)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor ingrese horarios validos.' });

        }
      }
      let desde = parseInt(this.diasDeSemanaDesde.split(':')[0]);
      let hasta= parseInt(this.diasDeSemanaHasta.split(':')[0]);

      if (desde >= hasta) {
        
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor ingrese horarios validos.' });

      }
      else {

        let user = this.setData();
        this.db.updateMedico(user, this.authService.userLoggedIn.uid).then((x) => {
          this.messageService.add({ severity: 'success', summary: '', detail: 'Se ha guardado correctamente.' });

        });
      }

    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Complete todos los datos del formulario para poder guardar.' });

    }
  }



  setData() {
    this.diasSeleccionados = this.diasSeleccionados.map((x) => {
      return {
        dia: x,
        desde: this.diasDeSemanaDesde,
        hasta: this.diasDeSemanaHasta
      };
    });
    if (this.trabajaLosSabados) {
      this.diasSeleccionados.push({
        dia: "Sábado",
        desde: this.horarioSabadosDesde,
        hasta: this.horarioSabadosHasta
      });
    }
    let obj =
    {
      specialities: this.loggedUser.specialities,
      diasQueTrabaja: this.diasSeleccionados
     
    };

    return obj;
  }

  Cancel() {
   
    this.router.navigate(['']);
  }

}
