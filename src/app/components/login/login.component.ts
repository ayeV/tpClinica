import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { AlertService } from 'src/app/services/alertService';

import {  Usuario } from './../../classes/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user= new Usuario();
  logeando = true;
  public errorMessage: string;
  constructor(  private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private authService: AuthenticationService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }




Login() {
  this.alertService.clear();

  if (this.user.email != null && this.user.password != null) {
    this.authService.SignIn(this.user.email, this.user.password).then((res) => {
      if(res.user.emailVerified)
      {
        this.router.navigate(['']);
      }
      else
      {
        this.alertService.error("Debes verificar tu email para poder iniciar sesión.");
      }
    
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

/* openDialog(): void {
  const dialogRef = this.dialog.open(DialogComponent);
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.authService.PasswordRecover(result).then((res) => { 
        this.alertService.success("Email enviado.");

      }).catch((ex) => {
        this.errorMessage = this.ErrorMessageBuilder(ex.code);
        this.alertService.error(this.errorMessage);
        console.log(this.errorMessage);

      });
    }
  });

} */

FillInput(){
  this.user.email = "ayelenvaldez07@gmail.com";
  this.user.password = "123456";
}

}
