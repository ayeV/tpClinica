import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { catchError } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alertService';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  cols: any[];
  public users: any;
  public estaCargando = true;
  public displayedColumns: string[] = ['name', 'state'];

  @ViewChild('dt') table: Table;

  constructor(private db: FirestoreService, private authService: AuthenticationService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.cols = [{ field: 'name', header: 'Nombre' }, { field: 'state', header: 'Estado' }]

    let usuarios = [];
    this.db.getUsuarios().subscribe(x => {
      x.forEach(item => {
        usuarios.push({
          name: item.data().firstName + ' ' + item.data().lastName,
          state: item.data().state,
          role: item.data().role,
          uid: item.id
        });
      });
      this.estaCargando = false;
      this.users = usuarios.filter(x => {
        return x.role == 'medico';
      });
      console.log(this.users);
    });
  }

  AceptarMedico(medico) {
    this.messageService.clear();
    medico.state = 'Aceptado';
    this.db.updateState(medico.uid, medico.state).then((data: any) => {
      let listaModificada = [];
      for (let i = 0; i < this.users.length; i++) {
        if (medico.uid == this.users[i].uid) {
          listaModificada.push(medico);
        }
        else {
          listaModificada.push(this.users[i]);
        }

      }
      this.users = listaModificada;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Médico aceptado correctamente.' });
      console.log('ok');
    }).catch(err => {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Ha ocurrido un error, vuelve a intentarlo mas tarde.' });

    });

  }

  RechazarMedico(medico) {
    this.messageService.clear();
    medico.state = 'Rechazado';
    this.db.updateState(medico.uid, medico.state).then((data: any) => {
      let listaModificada = [];
      for (let i = 0; i < this.users.length; i++) {
        if (medico.uid == this.users[i].uid) {
          listaModificada.push(medico);
        }
        else {
          listaModificada.push(this.users[i]);
        }

      }
      this.users = listaModificada;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Médico rechazado correctamente.' });
      console.log('ok');
    }).catch(err => {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Ha ocurrido un error, vuelve a intentarlo mas tarde.' });

    });
  }

  logOut() {
    this.authService.SignOut().then((res) => {
      this.router.navigate(['/Login']);
    }).catch((ex) => {
      console.log(ex);

    });

  }



}
