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
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    console.log(this.config.data);
  }

  ngOnInit(): void {
    this.data = this.config.data[0];
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
    lista.push( `Edad: ${this.data.edad}`);
    lista.push(`Temperatura: ${this.data.temperatura}`);
    lista.push(`Presion arterial: ${this.data.presion}`);
    if(this.data.campos)
    {
      for (let i = 0; i < this.data.campos.length; i++) {
        lista.push(this.data.campos[i].clave + ": " + this.data.campos[i].valor);
      }
    }
   
    return lista;
  }

  getDocumentDefinition() {
    return {
      header: `Reseña realizada por el Profesional ${this.data.medico.nombre} para el paciente: ${this.data.paciente.nombre}`,
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
