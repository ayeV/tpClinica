import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Usuario } from 'src/app/classes/user';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-alta-admin',
  templateUrl: './alta-admin.component.html',
  styleUrls: ['./alta-admin.component.css']
})
export class AltaAdminComponent implements OnInit {

  public user= new Usuario();
  constructor( public router: Router,
    private dbService: FirestoreService,
    private authService: AuthenticationService,
    private messageService: MessageService) { }

  ngOnInit(): void {
  }

  Register() {
    this.user.role = 'admin';
    if (this.user.email != null && this.user.password != null && this.user.firstName != null && this.user.lastName != null) 
   {
      this.authService.RegisterUser(this.user.email, this.user.password).then((res) => {
        this.dbService.postUser(res.user.uid, this.user);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Se ha creado el administrador.' });

      });
      
     

    }

  }


  logOut() {
    this.authService.SignOut().then((res) => {
      this.router.navigate(['/Login']);
    }).catch((ex) => {
      console.log(ex);

    });

  }

  Cancel() {
    this.user = new Usuario();

  }
}
