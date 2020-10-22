import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit {
  public turnos = 
  [
    
    
  ];
  public loggedUser:any;
  public cargando = true;
  public contador = 0;
  @ViewChild(Table) table: Table;

  public displayedColumns: string[] = ['Paciente', 'Medico', 'Estado','Acciones'];
  public cols: any[];

  constructor(private db: FirestoreService,private authService:AuthenticationService, private router:Router) { 

  }

  ngOnInit(): void {
     this.turnos = 
  [
    {
      paciente: 'Juan Perez',
      medico: 'Ana Lopez',
      estado:'Pendiente',
    },
    {
      paciente: 'Juan Perez',
      medico: 'Ana Lopez',
      estado:'Pendiente',
    },
    {
      paciente: 'Juan Perez',
      medico: 'Ana Lopez',
      estado:'Pendiente',
    },
    {
      paciente: 'Juan Perez',
      medico: 'Ana Lopez',
      estado:'Pendiente',
    }
    
  ];
    this.cols = [{ field: 'paciente', header: 'Paciente'},{ field: 'medico', header: 'Medico'}, { field: 'estado', header: 'Estado'}]
  this.getLoggedUser();
  }

  logOut() {
    this.authService.SignOut().then((res) => {
      this.router.navigate(['/Login']);
    }).catch((ex) => {
      console.log(ex);

    });

  }

  getLoggedUser()
  {
    let user;
    this.db.getLoggedUser(this.authService.userLoggedIn.uid).subscribe((res)=>{
      
        user = res.payload.data();
        this.cargando = false;
        this.loggedUser = user;
        console.log(this.loggedUser)
    });
  }




}
