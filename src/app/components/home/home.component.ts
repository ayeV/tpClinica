import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AlertService } from 'src/app/services/alertService';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { NotificationService } from 'src/app/services/notification.service';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as json2csv from 'json2csv';
import { saveAs } from 'file-saver';

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
  public turnos = [];
  public especialidades = [];
  public arrayNumeros = [];
  public pdfMake: any;
  public logueos = [];
  data: any;
  Json2csvParser = json2csv.Parser;
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

    this.getLoggedUser();
    this.getHistorial();
  }

  async loadPdfMaker() {
    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      this.pdfMake = pdfMakeModule.default;
      this.pdfMake.vfs = pdfFontsModule.default.pdfMake.vfs;
    }
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
          receptor: item.data().receptor
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

  getHistorial() {
    let logueos = [];
    this.db.getHistorial().subscribe(x => {
      x.forEach(item => {
        logueos.push({
          Fecha: item.data().fecha.toDate().toLocaleDateString(),
          Usuario: item.data().usuario.firstName + ' ' + item.data().usuario.lastName
        });
      });
      this.estaCargando = false;
      this.logueos = logueos;
    });
  }



  crearInformes() {
    let fields = ['Usuario', 'Fecha']
    this.downloadFile(this.logueos);
  }

  public downloadFile(data: any, filename?: string) {
    let csvData = this.convertToCSV(data);
    let file = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(file, "data.csv");
  }



  public convertToCSV(objArray: any, fields?) {
    let json2csvParser = new this.Json2csvParser({ opts: fields });
    let csv = json2csvParser.parse(objArray);
    console.log(csv);
    return csv;
  }


}
