import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { TurnosService } from 'src/app/services/turnos.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NotificationService } from 'src/app/services/notification.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Turno } from 'src/app/classes/turno';
import { VerResenaComponent } from '../ver-resena/ver-resena.component';
import { VerEncuestaComponent } from '../ver-encuesta/ver-encuesta.component';
import { Notificacion } from 'src/app/classes/notificacion';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit {
  public turnos = [];
  public loggedUser: any;
  public cargando = true;
  @ViewChild(Table) table: Table;
  public resenas = [];
  ref: DynamicDialogRef;
  public encuestas = [];
  public displayedColumns: string[] = ['Paciente', 'Médico', 'Estado', 'Fecha', 'Horario', 'Acciones'];
  public cols: any[];
  public tieneResena = false;
  constructor(
    private db: FirestoreService,
    private authService: AuthenticationService,
    private router: Router,
    private messageService: MessageService,
    private turnosService: TurnosService,
    public dialogService: DialogService,
    public notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.getLoggedUser();

    this.cols = [
      { field: 'paciente', header: 'Paciente' },
      { field: 'medico', header: 'Medico' },
      { field: 'estado', header: 'Estado' },
      { field: 'fecha', header: 'Fecha' },
      { field: 'horario', header: 'Horario' }]


  }

  getEncuestasMedico() {
    let encuestas = [];
    this.db.getEncuestas().subscribe(x => {
      x.forEach(item => {
        encuestas.push({
          paciente: item.data().paciente,
          medico: item.data().medico,
          estaConforme: item.data().estaConforme,
          comentario: item.data().comentario,
          puntuacionAtencion: item.data().puntuacionAtencion,
          id: item.id
        });
      });
      this.cargando = false;
      this.encuestas = encuestas.filter(x => {
        return x.medico.uid == this.loggedUser.uid;
      });
    });
  }


  getEncuestasPaciente() {
    let encuestas = [];
    this.db.getEncuestas().subscribe(x => {
      x.forEach(item => {
        encuestas.push({
          paciente: item.data().paciente,
          medico: item.data().medico,
          estaConforme: item.data().estaConforme,
          comentario: item.data().comentario,
          puntuacionAtencion: item.data().puntuacionAtencion,
          id: item.id
        });
      });
      this.cargando = false;
      this.encuestas = encuestas.filter(x => {
        return x.paciente.uid == this.loggedUser.uid;
      });
    });
  }

  getResenasMedico() {
    let resenas = [];
    this.db.getResenas().subscribe(x => {
      x.forEach(item => {
        resenas.push({
          edad: item.data().edad,
          paciente: item.data().paciente,
          medico: item.data().medico,
          presion: item.data().presion,
          temperatura: item.data().temperatura,
          id: item.id
        });
      });
      this.cargando = false;
      this.resenas = resenas.filter(x => {
        return x.medico.uid == this.loggedUser.uid;
      });
    });
  }


  getResenasPaciente() {
    let resenas = [];
    this.db.getResenas().subscribe(x => {
      x.forEach(item => {
        resenas.push({
          edad: item.data().edad,
          paciente: item.data().paciente,
          medico: item.data().medico,
          presion: item.data().presion,
          temperatura: item.data().temperatura,
          id: item.id
        });
      });
      this.cargando = false;
      this.resenas = resenas.filter(x => {
        return x.paciente.uid == this.loggedUser.uid;
      });
    });
  }

  getLoggedUser() {

    this.db.getLoggedUser(this.authService.userLoggedIn.uid).subscribe((res: any) => {
      this.cargando = false;
      this.loggedUser = res.payload.data();
      this.loggedUser['uid'] = this.authService.userLoggedIn.uid;
      if (this.loggedUser.role == 'medico') {
        this.getTurnosMedico();
        this.getResenasMedico();
        this.getEncuestasMedico();
      }
      else {
        this.getTurnosPaciente();
        this.getResenasPaciente();
        this.getEncuestasPaciente();

      }
    });
  }


  getTurnosMedico() {
    let turnos = [];
    this.db.getTurnos().subscribe(x => {
      x.forEach(item => {
        turnos.push({
          especialidad: item.data().especialidad,
          estado: item.data().estado,
          fecha: item.data().fecha.toDate().toLocaleDateString(),
          horario: item.data().horario,
          medico: item.data().medico,
          paciente: item.data().paciente,
          id: item.id
        });
      });
      this.cargando = false;
      this.turnos = turnos.filter(x => {
        return x.medico.uid == this.loggedUser.uid;
      });
    });

  }

  getTurnosPaciente() {
    let turnos = [];
    this.db.getTurnos().subscribe(x => {
      x.forEach(item => {
        turnos.push({
          especialidad: item.data().especialidad,
          estado: item.data().estado,
          fecha: item.data().fecha.toDate().toLocaleDateString(),
          horario: item.data().horario,
          medico: item.data().medico,
          paciente: item.data().paciente,
          id: item.id
        });
      });
      this.cargando = false;
      this.turnos = turnos.filter(x => {
        return x.paciente.uid == this.loggedUser.uid;
      });
    });
  }

  AceptarTurno(turno) {
    this.messageService.clear();
    turno.estado = "Confirmado";
    this.db.updateTurnoState(turno.id, "Confirmado").then((data: any) => {
      let listaModificada = [];
      for (let i = 0; i < this.turnos.length; i++) {
        if (turno.id == this.turnos[i].id) {
          listaModificada.push(turno);
        }
        else {
          listaModificada.push(this.turnos[i]);
        }

      }
      this.turnos = listaModificada;
      let mensaje = `Su turno con ${turno.medico.name} para la fecha ${turno.fecha} ha sido CONFIRMADO`;
      let notificacion = new Notificacion(mensaje, turno.medico.name, turno.medico.uid, turno.paciente.firstName + " " + turno.paciente.lastName, turno.paciente.uid,
        turno.fecha, false,turno.paciente.uid);
      this.notificationService.postNotificacion(notificacion).then(() => {
        console.log("Notificacion guardada");
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Turno aceptado correctamente.' });
      });


    }).catch(err => {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Ha ocurrido un error, vuelve a intentarlo mas tarde.' });

    });

  }

  CancelarTurno(turno) {
    this.messageService.clear();
    turno.estado = "Cancelado";
    this.db.updateTurnoState(turno.id, "Cancelado").then((data: any) => {
      let listaModificada = [];
      for (let i = 0; i < this.turnos.length; i++) {
        if (turno.id == this.turnos[i].id) {
          listaModificada.push(turno);
        }
        else {
          listaModificada.push(this.turnos[i]);
        }

      }
      this.turnos = listaModificada;
      let mensaje;
      let notificacion;
      if (this.loggedUser.role == 'paciente') {
        mensaje = `Su turno con ${turno.paciente.firstName + " " + turno.paciente.lastName} para la fecha ${turno.fecha} ha sido CANCELADO`;
        notificacion = new Notificacion(mensaje, turno.medico.name, turno.medico.uid, turno.paciente.firstName + " " + turno.paciente.lastName, turno.paciente.uid,
          turno.fecha, false, turno.medico.uid);
      }
      else {
        mensaje = `Su turno con ${turno.medico.name} para la fecha ${turno.fecha} ha sido CANCELADO`;
        notificacion = new Notificacion(mensaje, turno.medico.name, turno.medico.uid, turno.paciente.firstName + " " + turno.paciente.lastName, turno.paciente.uid,
          turno.fecha, false, turno.paciente.uid);
      }

      this.notificationService.postNotificacion(notificacion).then(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Turno cancelado correctamente.' });
      });
    }).catch(err => {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Ha ocurrido un error, vuelve a intentarlo mas tarde.' });

    });

  }


  CerrarTurno(turno) {
    this.messageService.clear();
    turno.estado = "Cerrado"
    this.db.updateTurnoState(turno.id, "Cerrado").then((data: any) => {
      let listaModificada = [];
      for (let i = 0; i < this.turnos.length; i++) {
        if (turno.id == this.turnos[i].id) {
          listaModificada.push(turno);
        }
        else {
          listaModificada.push(this.turnos[i]);
        }

      }
      this.turnos = listaModificada;
      this.turnosService.turno = new Turno(turno.medico, turno.fecha, turno.horario, turno.especialidad, turno.paciente, turno.id);
      this.turnosService.turno.estado = 'Cerrado';
      this.router.navigate(['CargarResena']);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Turno cancelado correctamente.' });
    }).catch(err => {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Ha ocurrido un error, vuelve a intentarlo mas tarde.' });

    });

  }

  show(resenaId) {
    let resena = this.resenas.filter((x) => {
      return x.id == resenaId;
    });
    if (resena.length > 0) {
      this.ref = this.dialogService.open(VerResenaComponent, {
        data: resena,
        header: 'Reseña del profesional',
        width: '70%',
        contentStyle: { "max-height": "500px", "overflow": "auto" },
        baseZIndex: 10000
      });

    }
    else {
      this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Aún no hay reseña cargada para este paciente.' });

    }
  }


  showEncuesta(resenaId) {
    let encuesta = this.encuestas.filter((x) => {
      return x.id == resenaId;
    });
    if (encuesta.length > 0) {
      this.ref = this.dialogService.open(VerEncuestaComponent, {
        data: encuesta,
        header: 'Encuesta del paciente',
        width: '70%',
        contentStyle: { "max-height": "500px", "overflow": "auto" },
        baseZIndex: 10000
      });

    }
    else {
      this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Aún no hay una encuesta cargada por el paciente.' });

    }
  }


  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  cargarEncuesta(turno) {
    let encuesta = this.encuestas.filter((x) => {
      return x.id == turno.id;
    });

    if (encuesta.length > 0) {
      this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Ya has cargado una encuesta para este médico.' });

    }
    else {
      this.turnosService.turno = new Turno(turno.medico, turno.fecha, turno.horario, turno.especialidad, turno.paciente, turno.id);
      this.router.navigate(['CargarEncuesta']);
    }


  }





}
