import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Resena } from 'src/app/classes/resena';
import { Turno } from 'src/app/classes/turno';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-cargar-resena',
  templateUrl: './cargar-resena.component.html',
  styleUrls: ['./cargar-resena.component.css']
})
export class CargarResenaComponent implements OnInit {

  public loggedUser:any;
  public edad:number;
  public presion:number;
  public temperatura:number;
  public lista = [];

  public turno:Turno;
  public cargando = true;
  public agregarCampo1= false;

  constructor(
    private db:FirestoreService,
    private turnoService:TurnosService, 
    private authService: AuthenticationService,
    private messageService: MessageService,
    ) { 
  }

  ngOnInit(): void {
    this.getLoggedUser();

  }

  getLoggedUser() {

    this.db.getLoggedUser(this.authService.userLoggedIn.uid).subscribe((res: any) => {
      this.cargando = false;
      this.loggedUser = res.payload.data();
      this.loggedUser['uid'] = this.authService.userLoggedIn.uid;
      this.turno = this.turnoService.turno;

    });
  }

  AgregarCampo()
  {
    this.lista.push({
      'clave':'',
      'valor':''
    });
  }
  eliminarCampo(i)
  {
    this.lista.splice(i,1);
  }

  cargar()
  {
    this.messageService.clear();
    if(this.presion != null && this.temperatura != null && this.edad != null)
    {
       let resena = new Resena(this.turno.medico.name,this.turno.paciente.firstName +' '+ this.turno.paciente.lastName,
        this.edad,this.temperatura,this.presion);
        this.algo2(resena);
        this.db.updateTurnoResena(this.turno.id,resena).then((x)=>
        {
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Se ha guardado correctamente.' });
          this.edad = null;
          this.presion= null;
          this.temperatura =null;
          this.lista = [];

        }).catch((x)=>{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error, vuelva a intentarlo mas tarde.' });

        })
    }
    else
    {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor complete todos los campos para poder guardar.' });

    }

  }

  algo2(resena)
  {
    for (let i = 0; i < this.lista.length; i++) {
        resena[this.lista[i].clave] = this.lista[i].valor;
    }
  }

}
