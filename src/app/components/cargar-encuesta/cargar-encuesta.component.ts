import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Encuesta } from 'src/app/classes/encuesta';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-cargar-encuesta',
  templateUrl: './cargar-encuesta.component.html',
  styleUrls: ['./cargar-encuesta.component.css']
})
export class CargarEncuestaComponent implements OnInit {
  val1=1;

  public puntuacionAtencion = 1;
  public loggedUser:any;
  public turno;
  public cargando = true;
  public comentario:string;
  public estaConforme;
  public noEstaConforme;

  constructor(  private db: FirestoreService,
    private authService: AuthenticationService,
    private router: Router,
    private messageService: MessageService,
    private turnosService: TurnosService
    ) { }

  ngOnInit(): void {
    this.getLoggedUser();
  }

  getLoggedUser() {

    this.db.getLoggedUser(this.authService.userLoggedIn.uid).subscribe((res: any) => {
      this.cargando = false;
      this.loggedUser = res.payload.data();
      this.loggedUser['uid'] = this.authService.userLoggedIn.uid;
      this.turno = this.turnosService.turno;

    });
  }

  cargar()
  {
    this.messageService.clear();
    debugger;
    if(this.estaConforme != null && this.comentario != null && this.puntuacionAtencion != null)
    {
       let encuesta = new Encuesta(this.turno.medico.uid,this.turno.medico.name,this.turno.paciente.firstName +' '+ this.turno.paciente.lastName,this.turno.paciente.uid,
        this.puntuacionAtencion,this.comentario,this.estaConforme,this.turno.id);
        this.db.postEncuesta(this.turno.id,encuesta).then((x)=>
        {
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Se ha guardado correctamente.' });
          this.estaConforme = null;
          this.comentario= null;
          this.puntuacionAtencion =null;

        }).catch((x)=>{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error, vuelva a intentarlo mas tarde.' });

        })
    }
    else
    {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor complete todos los campos para poder guardar.' });

    }

  }

  onRateEvent(event)
  {
    if(event)
    {
      this.puntuacionAtencion = event.value
      console.log(event.value);
    }
  }

  

}
