import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { AlertService } from 'src/app/services/alertService';

import { Usuario } from './../../classes/user';
import { isThisTypeNode } from 'typescript';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user = new Usuario();
  logeando = true;
  public estaCargando = true;
  public loggedUser;
  public errorMessage: string;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private authService: AuthenticationService,
    public dialog: MatDialog,
    private db: FirestoreService) { }

  ngOnInit(): void {
  }


  Login() {
    this.alertService.clear();

    if (this.user.email != null && this.user.password != null) {
      this.authService.SignIn(this.user.email, this.user.password).then((res) => {
        this.db.getLoggedUser(this.authService.userLoggedIn.uid).subscribe((data) => {
          let user: any = data.payload.data();
          if (user.role != 'admin') {
            if (this.authService.userLoggedIn.emailVerified) {
              this.router.navigate(['']);
            }
            else {
              this.alertService.error("Debes verificar tu email para poder iniciar sesión.");
            }
          }
          else {
            this.router.navigate(['']);

          }
        });



      }).catch((ex) => {
        console.log(ex);
        this.errorMessage = this.ErrorMessageBuilder(ex.code);
        this.alertService.error(this.errorMessage);

      });
    }
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


  fillInput(userType) {
    this.user.password = "123456";

    switch (userType) {
      case 'admin':
        this.user.email = "ayelenvaldez07@hotmail.com"
        break;
      case 'paciente':
        this.user.email = "ayelenvaldez07@gmail.com"
        break;
      case 'medico':
        this.user.email = "wonasi8951@insertswork.com"
        break;

      default:
        break;
    }
  }

}
