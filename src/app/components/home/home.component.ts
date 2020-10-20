import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alertService';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public loggedUser:any;
  public estaCargando = true;
  public esAdmin = false;

  constructor(    
    private authService: AuthenticationService,
    public router: Router,
    private alertService: AlertService,
    private db: FirestoreService
    ) { 
     
    }

  ngOnInit(): void {
   this.getLoggedUser()
  }

  getLoggedUser()
  {
    let user;
    this.db.getLoggedUser(this.authService.userLoggedIn.uid).subscribe((res)=>{
      
        user = res.payload.data();
        this.estaCargando = false;
        this.loggedUser = user;
        console.log(this.loggedUser)
    });



    
  }

  logOut() {
    this.authService.SignOut().then((res) => {
      this.router.navigate(['/Login']);
    }).catch((ex) => {
      this.alertService.error(ex);

    });

  }

  validarAdmin()
  {
    if(this.loggedUser ==null)
       return false;
    else if(this.loggedUser.role == 'admin')
       return true;
  }

}
