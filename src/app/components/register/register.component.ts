import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/classes/user';
import { AlertService } from 'src/app/services/alertService';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { FirestoreService } from 'src/app/services/firestore.service';

const MEDICO = 'medico';
const PACIENTE = 'paciente';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public errorMessage: string;
  public user = new Usuario();
  toppings = new FormControl();
  public especialidad: string;
  public especialidades = ['Oftamologia', 'Cardiologia', 'Pediatria'];
  

  constructor(
    public router: Router,
    private alertService: AlertService,
    private dbService: FirestoreService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        this.user.photo1 = event.target.result.toString();
        console.log(this.user.photo1);
      }
    }
  }

  onSelectFile2(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        this.user.photo2 = event.target.result.toString();
        console.log(this.user.photo2);
      }
    }
  }

  Register() {
    this.alertService.clear();
    if (this.user.email != null && this.user.password != null && this.user.role != null) {
      this.authService.RegisterUser(this.user.email, this.user.password).then((res) => {
        this.authService.sendEmailVerification();
        this.router.navigate(['Login']);
        if (this.user.role == MEDICO) {
          this.user.photo1 = null;
          this.user.photo2 = null;
          this.dbService.postUser(res.user.uid, this.user);

        }
        else if (this.user.role == PACIENTE) {
          this.dbService.postUser(res.user.uid, this.user);
          this.user.specialities = [];
          this.dbService.uploadFile(this.user.photo1).on('state_changed', (snapshot) => {

          },
            (error) => {

            },
            () => {
              this.dbService.uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                this.dbService.updateUserPhoto1(this.authService.userData.uid, downloadURL).then(() => {

                  console.log("termino");
                  this.dbService.uploadFile(this.user.photo2).on('state_changed', (snapshot) => { },
                    (error) => { },
                    () => {
                      this.dbService.uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        this.dbService.updateUserPhoto2(this.authService.userData.uid, downloadURL).then(() => {
                          console.log("Registro exitoso");
                        });
                      }
                      )},
                  )},
                  (error) => {

                    console.log(error);
                  });
              });
            });;
        }
      }).catch((ex) => {
        this.errorMessage = this.ErrorMessageBuilder(ex.code);
        this.alertService.error(ex);
      });

    }

  }


  comboChange(event) {
    if (!event) {
      this.user.specialities = this.toppings.value;
      console.log(this.user.specialities);
    }
  }

  Cancel() {
    this.router.navigate(['Login']);

  }

  setUserRole(role) {
    this.user.role = role;
  }



  ErrorMessageBuilder(firebaseCode) {
    switch (firebaseCode) {
      case "auth/invalid-email":
        return "El email no es válido.";
      case "auth/email-already-exists":
        return "Otro usuario ya está utilizando el email proporcionado.";
      case "auth/invalid-password":
        return "Clave incorrecta.";
      case "auth/wrong-password":
        return "Clave incorrecta.";
      default:
        return "Parece que algo salio mal, intente de nuevo mas tarde.";

    }
  }

}
