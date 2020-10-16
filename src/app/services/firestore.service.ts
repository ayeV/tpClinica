import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Usuario } from 'app/clases/usuario';
import { firestore } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  

  constructor(private db: AngularFirestore) { }




  postUser(uid, user: Usuario) {
    this.db.collection("usuarios").doc(uid).set({
      nombre: user.nombre,
      apellido: user.apellido,
      edad: user.edad,
      email: user.email
    })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }


  postScore(uid, game, score) {
    let json = {};
    json[game] = firestore.FieldValue.increment(score)

    this.db.collection('puntajes').doc(uid).set(
      json, {
      merge: true
    })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });


  }

  
  getUsuarios() {
   return this.db.collection("usuarios").get();

  }

  getPuntajes() {
   return this.db.collection("puntajes").get();

  }






}



