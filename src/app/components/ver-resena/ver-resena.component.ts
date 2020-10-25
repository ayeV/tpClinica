import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-ver-resena',
  templateUrl: './ver-resena.component.html',
  styleUrls: ['./ver-resena.component.css']
})
export class VerResenaComponent implements OnInit {

  public data:any;
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
   console.log(this.config.data);
   }

  ngOnInit(): void {
    this.data = this.config.data[0];
  }

}
