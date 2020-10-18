import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Usuario } from '../classes/user';
import * as firebase from 'firebase';
import { AuthenticationService } from './authentication-service';


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
      role:user.role

    })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }

  
  uploadFile(dataUrl) {
    var fileName = `${new Date().getTime()}photo`;
    var ref = firebase.storage().ref().child("pacientes/" + fileName);

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



  
  getUsuarios() {
   return this.db.collection("users").get();

  }







}



