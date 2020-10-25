import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AlertService } from 'src/app/services/alertService';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public loggedUser: any;
  public estaCargando = true;
  public esAdmin = false;
  public notificaciones = [];
  constructor(
    private authService: AuthenticationService,
    public router: Router,
    private alertService: AlertService,
    private db: FirestoreService,
    private messageService: MessageService,
    private notificationService: NotificationService
  ) {

  }

  ngOnInit(): void {
    this.getLoggedUser()
  }

  getLoggedUser() {
    let user;
    this.db.getLoggedUser(this.authService.userLoggedIn.uid).subscribe((res) => {

      user = res.payload.data();
      this.estaCargando = false;
      this.loggedUser = user;
      this.loggedUser['uid'] = this.authService.userLoggedIn.uid;

     this.getNotificacionesMedico();

    });




  }

  logOut() {
    this.authService.SignOut().then((res) => {
      this.router.navigate(['/Login']);
    }).catch((ex) => {
      this.alertService.error(ex);

    });

  }

  validarAdmin() {
    if (this.loggedUser == null)
      return false;
    else if (this.loggedUser.role == 'admin')
      return true;
  }




  getNotificacionesMedico() {
    let notif = [];
    this.notificationService.getNotificationes().subscribe(x => {
      x.forEach(item => {
        notif.push({
          paciente: item.data().paciente,
          medico: item.data().medico,
          fecha: item.data().fecha,
          estaLeido: item.data().estaLeido,
          mensaje: item.data().mensaje,
          id: item.id,
          receptor:item.data().receptor
        });
      });
      this.estaCargando = false;
      this.notificaciones = notif.filter(x => {
        return x.receptor == this.loggedUser.uid;
      });
      this.notificaciones.forEach((x) => {
        if (!x.estaLeido) {
          this.messageService.add({ severity: 'info', summary: 'Info', detail: x.mensaje, closable: false, id: x.id });
        };
      }
      )
    });
  }

  close(message) {
    if (message) {
      console.log(message);
      this.notificationService.updateNotificacion(message.id).then(() => {
        console.log("Mensaje leido");
        this.messageService.clear();
      }).catch((err) => {
        console.log(err);

      })
    }
  }



}
