import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Notificacion } from '../classes/notificacion';
import { AuthenticationService } from './authentication-service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  public notificacion: Notificacion
  constructor(private db: AngularFirestore, private storage: AngularFireStorage, private auth: AuthenticationService) { }



  postNotificacion(notificacion: Notificacion) {
    return this.db.collection("notificaciones").add({
      mensaje:notificacion.mensaje,
      paciente:notificacion.paciente,
      medico:notificacion.medico,
      estaLeido:notificacion.estaLeido,
      fecha:notificacion.fecha,
      receptor:notificacion.receptor
    });

  }

  getNotificationes()
  {
    return this.db.collection("notificaciones").get();

  }

  updateNotificacion(id)
  {
    return this.db.collection('notificaciones').doc(id).set({
      estaLeido: true,
    },{merge: true});
  }


}
