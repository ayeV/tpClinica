import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Turno } from 'src/app/classes/turno';
import { MenuItem, MessageService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0;
  }
  minDate: Date;
  maxDate: Date;
  public isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  fourFormGroup: FormGroup;
  public fechaMostrar;
  public especialidades = ['Oftamología', 'Cardiología', 'Pediatría', 'Neumonología'];
  private _medicos = [];
  public medicos = [];
  public estaCargando = true;
  public especialidad;
  public fecha;
  public diasDisponibles = [];
  public medicoSeleccionado;
  public turnos = [];
  public _turnos = [];
  public turnoSeleccionado;
  public loggedUser: any;
  public turnosPedidos = [];
  constructor(private router: Router, private authService: AuthenticationService, private db: FirestoreService, private messageService: MessageService, private _formBuilder: FormBuilder) {
    var today = new Date();
    var year = today.getFullYear();
    this.minDate = new Date(year, today.getMonth(), today.getDate());
    this.maxDate = new Date(year, today.getMonth(), today.getDate() + 15);
    this.firstFormGroup = this._formBuilder.group({
      especialidad: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      medicoSeleccionado: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      fecha: ['', Validators.required]
    });
    this.fourFormGroup = this._formBuilder.group({
      turnoSeleccionado: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    this.getMedicos();
    this.getLoggedUser();
    this.getTurnos();
  }

  getLoggedUser() {

    this.db.getLoggedUser(this.authService.userLoggedIn.uid).subscribe((res: any) => {
      this.estaCargando = false;
      this.loggedUser = res.payload.data();
      this.loggedUser['uid'] = this.authService.userLoggedIn.uid;
    });
  }

  comboChange(event) {
    if (event) {
      this.especialidad = event;
      this.medicos = this._medicos.filter((x) => {

        let lista = x.especialidades.map((z) => {
          return z.especialidad;
        });
        return lista.includes(event);
      })
      this.firstFormGroup.setValue({
        especialidad: event
      })
    }
  }

  getTurnos() {
    let turnos = [];
    this.db.getTurnos().subscribe(x => {
      x.forEach(item => {
        turnos.push({
          especialidad: item.data().especialidad,
          estado: item.data().estado,
          fecha: item.data().fecha,
          horario: item.data().horario,
          medico: item.data().medico,
          paciente: item.data().paciente,
          resena:item.data().resena
        });
      });
      this.estaCargando = false;
      this.turnosPedidos = turnos.filter(x => {
        return x.estado == 'Pendiente' || x.estado == 'Confirmado'
      });
      console.log(this.turnosPedidos);
    });

  }

  getMedicos() {
    let usuarios = [];
    this.db.getUsuarios().subscribe(x => {
      x.forEach(item => {
        usuarios.push({
          name: item.data().firstName + ' ' + item.data().lastName,
          state: item.data().state,
          role: item.data().role,
          uid: item.id,
          diasQueTrabaja: item.data().diasQueTrabaja,
          especialidades: item.data().specialities
        });
      });
      this.estaCargando = false;
      this._medicos = usuarios.filter(x => {
        return x.role == 'medico' && x.diasQueTrabaja != null;
      });
      this.medicos = this._medicos;
    });
  }


  buscar() {
    var turnosTemp = [];
    this._turnos = [];
    var a = new Date(this.fecha);
    var weekdays = new Array(7);
    weekdays[0] = "Domingo";
    weekdays[1] = "Lunes";
    weekdays[2] = "Martes";
    weekdays[3] = "Miércoles";
    weekdays[4] = "Jueves";
    weekdays[5] = "Viernes";
    weekdays[6] = "Sábado";
    var dia = weekdays[a.getDay()];
    var medicos = this.medicos.filter((x) => {
      if (x.uid == this.secondFormGroup.value.medicoSeleccionado.uid) {
        let lista = x.diasQueTrabaja.map((z) => {
          return z.dia;
        });
        return lista.includes(dia);
      }
      return false;
    });

    var startingTimeHour;
    var endingTimeHour;
    medicos.forEach((x) => {
      x.diasQueTrabaja.forEach(element => {
        if (element.dia == dia) {
          startingTimeHour = element.desde;
          endingTimeHour = element.hasta;
        }
      });
    })
    if (startingTimeHour != null && endingTimeHour != null) {
      var startingTime = moment().hours(startingTimeHour.split(':')[0]).minutes(startingTimeHour.split(':')[1]);
      var endingTime = moment().hours(endingTimeHour.split(':')[0]).minutes(endingTimeHour.split(':')[1]);
      var duracion;

      medicos.forEach((x) => {
        x.especialidades.forEach(element => {
          if (element.especialidad == this.firstFormGroup.value.especialidad) {
            duracion = element.duracion;
          }
        });
      });

      turnosTemp = this.turnosPedidos.filter((x) => {
        return x.medico.uid == this.secondFormGroup.value.medicoSeleccionado.uid && x.fecha.toDate().getTime() == a.getTime();
      });

      while (startingTime < endingTime) {

        this._turnos.push(new Turno(medicos[0], a, startingTime.format("H:mm"), this.firstFormGroup.value.especialidad, this.loggedUser));
        startingTime.add(duracion, 'minute');

      }
      this.turnos = this._turnos.filter((x) => {

        let retorno = true;
        turnosTemp.forEach((y) => {
          if (y.horario == x.horario) {
            retorno = false;
          }

        });
        return retorno;
      });


    }


  }


limpiarMedico()
{
  this.secondFormGroup.setValue({medicoSeleccionado:''});
  this.thirdFormGroup.setValue({fecha:''});
  this.fourFormGroup.setValue({turnoSeleccionado:''});
}

limpiarFecha()
{
  this.thirdFormGroup.setValue({fecha:''});
  this.fourFormGroup.setValue({turnoSeleccionado:''});
}

limpiarTurno()
{
  this.fourFormGroup.setValue({turnoSeleccionado:''});

}

  Confirm() {
    this.messageService.clear();
    if (this.turnoSeleccionado != null) {
      this.db.postTurno(this.turnoSeleccionado).then((res) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tu turno ha sido guardado.' });
        this.turnosPedidos = [];
        this.getTurnos();
        this.medicoSeleccionado = null;
        this.especialidad = null;
        this.fecha = null;
        this.turnoSeleccionado = null;

      }).catch(x => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error, vuelve a intentarlo mas tarde.' });

      });

    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor ingrese todos los campos requeridos.' });

    }
  }

  addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  obtenerDias(medico) {
    this.medicoSeleccionado = medico;
    this.secondFormGroup.setValue({ medicoSeleccionado: medico });
    var hoy = Date.now();
    for (let i = 0; i < 15; i++) {
      let fecha = this.addDays(hoy, i);
      this.fecha = fecha;
      this.buscar();
      if(this.turnos.length > 0)
      {
        this.diasDisponibles.push(fecha);
      }
    }
  }

  obtenerHorarios(fecha)
  {
    this.fechaMostrar = fecha;
    this.thirdFormGroup.setValue({fecha:fecha});
    this.fecha = fecha;
    this.buscar();
  }

  asignarHorario(turno)
  {
    this.turnoSeleccionado = turno;
    this.fourFormGroup.setValue({turnoSeleccionado:turno});
  }
}
