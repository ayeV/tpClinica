import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit {
  public turnos = 
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
  public cargando = true;
  public contador = 0;
  @ViewChild(Table) table: Table;

  public displayedColumns: string[] = ['Paciente', 'Medico', 'Estado','Acciones'];
  public cols: any[];

  constructor(private db: FirestoreService) { 

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

  }

}