import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Usuario } from '../classes/user';
import * as firebase from 'firebase';
import { AuthenticationService } from './authentication-service';
import { useAnimation } from '@angular/animations';
import { Turno } from '../classes/turno';
import { Resena } from '../classes/resena';
import { Encuesta } from '../classes/encuesta';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  
  public uploadTask: firebase.storage.UploadTask;
  
  public url:string;
  public storageRef;

  constructor(private db: AngularFirestore,private storage: AngularFireStorage,private auth: AuthenticationService) {     
    this.storageRef = firebase.storage().ref();
  }




  postUser(uid, user: Usuario) {
    this.db.collection("users").doc(uid).set({
      firstName: user.firstName,
      lastName:user.lastName,
      specialities:user.specialities,
      photo1:null,
      photo2:null,
      role:user.role,
      state: user.state

    })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }


  postTurno(turno: Turno) {
    return this.db.collection("turnos").add({
      medico: turno.medico,
      fecha: turno.fecha,
      horario: turno.horario,
      especialidad: turno.especialidad,
      paciente: turno.paciente,
      estado : turno.estado
    });
     
  }
  updateTurnoResena(id,resena:any) {
    return this.db.collection('turnos').doc(id).set({
      resena: this.convertReview(resena),
    },{merge: true});
     
  }

  
  postResena(id,resena: any) {
    return this.db.collection("resenas").doc(id).set(this.convertReview(resena)); 
  }

  convertReview(review){
    let object = {};
    Object.keys(review).forEach(key=>{
      object[key] = review[key];
    })
    return object;
  }

  postEncuesta(id,encuesta: Encuesta) {
    return this.db.collection("encuestas").doc(id).set({
      paciente: encuesta.paciente,
      medico:encuesta.medico,
      puntuacionAtencion:encuesta.puntuacionAtencion,
      comentario:encuesta.comentario,
      estaConforme:encuesta.estaConforme,
      
    });
     
  }

  
  postHistorialLogin(data:any) {
    return this.db.collection("historial").add({
     usuario: data.usuario,
     fecha: data.fecha
    });
  }
  
  getHistorial(){
    return this.db.collection('historial').get();
  }

  uploadFile(dataUrl) {
    var fileName = `${new Date().getTime()}photo`;
    var ref = firebase.storage().ref().child("pacientes/" + fileName);
     this.storageRef = ref;
     this.uploadTask = ref.putString(dataUrl, 'data_url');
     return this.uploadTask;
  }

 

  updateUserPhoto1(id,url) {
    return this.db.collection('users').doc(id).set({
      photo1: url,
    },{merge: true});
  }

  updateUserPhoto2(id,url) {
    return this.db.collection('users').doc(id).set({
      photo2: url,
    },{merge: true});
  }

  updateState(id,state)
  {
    return this.db.collection('users').doc(id).set({
      state: state,
    },{merge: true});
  }

  updateTurnoState(id,estado)
  {
    return this.db.collection('turnos').doc(id).set({
      estado: estado,
    },{merge: true});
  }



  
  getUsuarios() {
   return this.db.collection("users").get();

  }

  getResenas() {
    return this.db.collection("resenas").get();
 
   }

   
  getEncuestas() {
    return this.db.collection("encuestas").get();
 
   }
  
  
  getTurnos() {
    return this.db.collection("turnos").get();
 
   }
 

  getLoggedUser(uid){
    return this.db.collection("users").doc(uid).snapshotChanges();
  }


  updateMedico(user:any,uid)
  {
    return this.db.collection('users').doc(uid).update(
      {
         diasQueTrabaja: user.diasQueTrabaja,
         specialities: user.specialities
      },
    )

  }





}



