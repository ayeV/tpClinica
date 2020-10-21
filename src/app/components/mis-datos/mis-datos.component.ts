import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Usuario } from 'src/app/classes/user';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.css']
})
export class MisDatosComponent implements OnInit {

  public user:any;
  public estaCargando = true;
  constructor(private db: FirestoreService,private authService: AuthenticationService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData()
  {
    this.db.getLoggedUser(this.authService.userLoggedIn.uid).subscribe((res:any) =>
    {
      this.estaCargando = false;
      this.user = res.payload.data();
      console.log(this.user)
    });
  }

}
