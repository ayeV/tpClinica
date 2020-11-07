import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';



@Component({
  selector: 'app-ver-resena',
  templateUrl: './ver-resena.component.html',
  styleUrls: ['./ver-resena.component.css']
})
export class VerResenaComponent implements OnInit {
  @ViewChild('htmlData') htmlData: ElementRef;
  public pdfMake:any;
  public data: any;
  public keys = [];

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.data = this.config.data;
    this.keys = Object.keys(this.config.data);
    console.log(this.keys);
  }

  async loadPdfMaker() {
    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      this.pdfMake = pdfMakeModule.default;
      this.pdfMake.vfs = pdfFontsModule.default.pdfMake.vfs;
    }
  }

 async generatePdf() {
    const documentDefinition = this.getDocumentDefinition();
    await this.loadPdfMaker();
    this.pdfMake.createPdf(documentDefinition).download();

  }

  setLista()
  {
    let lista = [];
    
    if(this.keys)
    {
      for (let i = 0; i < this.keys.length; i++) {
        lista.push(this.keys[i] + ": " + this.data[this.keys[i]]);
      }
    }
   
    return lista;
  }

  getDocumentDefinition() {
    return {
      header: `Reseña realizada por el Profesional ${this.data.medico} para el paciente: ${this.data.paciente}`,
      content: ['Datos: ', {
        ul: this.setLista()
      }],
      footer: "Clinica Online",
      defaultStyle: {
        fontSize: 15,
        bold: true,
      }
    };
  }

}
