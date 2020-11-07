import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-grafico-barra',
  templateUrl: './grafico-barra.component.html',
  styleUrls: ['./grafico-barra.component.css']
})
export class GraficoBarraComponent implements OnInit {
  data: any;
  data2: any;
  data3: any;

  public pdfMake:any;
  public verGrafico2 =false;
  public verGrafico1 =false;
  public verGrafico3 =false;

  public cargando = true;
  public turnos = [];
  public especialidades = [];
  public arrayNumeros = [];
  public medicos = [];
  constructor(private db: FirestoreService) {

  }

  ngOnInit(): void {
    this.getTurnos();
  }

  setVerGrafico2(){
    this.verGrafico2 = true;
    this.verGrafico1 = false;
    this.verGrafico3 = false;
  }

  setVerGrafico1(){
    this.verGrafico1 = true;
    this.verGrafico2 = false;
    this.verGrafico3 = false;

  }

  setVerGrafico3(){
    this.verGrafico1 = false;
    this.verGrafico2 = false;
    this.verGrafico3 = true;

  }

  getMedicos()
  {
    let medicos = [];
    this.db.getUsuarios().subscribe(x => {
      x.forEach(item => {
        medicos.push({
          nombre: item.data().firstName + ' ' +  item.data().lastName,
          role : item.data().role,
          uid:item.id
        });
      });
      this.cargando = false;
      this.medicos = medicos.filter((x) => {
        return x.role == 'medico';
      });
      this.calcular3();
    });
  }
  

  getTurnos() {
    let turnos = [];
    this.db.getTurnos().subscribe(x => {
      x.forEach(item => {
        turnos.push({
          especialidad: item.data().especialidad,
          medico: item.data().medico.name,
          fecha:item.data().fecha.toDate(),
          uid:item.data().medico.uid
        });
      });
      this.cargando = false;
      this.turnos = turnos;
      this.especialidades = this.turnos.map((x) => {
        return x.especialidad;
      });
      this.getMedicos();
      this.calcular();
      this.calcular2();


    });
  }

  calcular() {
    let lista = ['Oftamología', 'Cardiología', 'Pediatría', 'Neumonología'];
    let especialidades = {'Oftamología': 0, 'Cardiología': 0, 'Pediatría': 0, 'Neumonología':0};
    this.turnos.forEach(element => {
      especialidades[element.especialidad] += 1;
    })
    console.log(this.arrayNumeros);
    this.data = {
      labels: lista,
      datasets: [
        {
          label: 'Turnos por especialidad',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [especialidades[lista[0]],especialidades[lista[1]],especialidades[lista[2]],especialidades[lista[3]]]
        }
      ]
    }

  }
  
  async loadPdfMaker() {
    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      this.pdfMake = pdfMakeModule.default;
      this.pdfMake.vfs = pdfFontsModule.default.pdfMake.vfs;
    }
  }

  async downloadPdfGraficoBarra1() {
    await this.loadPdfMaker();
    const chart = document.getElementById('chart');
    html2canvas(chart, {
      height: 4000,
      width: 1500
    }).then((canvas) => {
      const chartData = canvas.toDataURL();
      const docDefinition = { watermark: { text: 'Clinica online', color: 'blue', opacity: 0.3, bold: true, italics: false },content: [] ,pageOrientation:'landscape'}
      docDefinition.content.push({ image: chartData, width: 1000 });
      this.pdfMake.createPdf(docDefinition).download();
    })
  }

  calcular2() {
    let lista = ['Lunes', 'Martes', 'Miércoles', 'Jueves','Viernes','Sábado'];
    let dias = {'Lunes': 0, 'Martes': 0, 'Miércoles': 0, 'Jueves':0, 'Viernes':0, 'Sábado':0};
    var weekdays = new Array(7);
    weekdays[0] = "Domingo";
    weekdays[1] = "Lunes";
    weekdays[2] = "Martes";
    weekdays[3] = "Miércoles";
    weekdays[4] = "Jueves";
    weekdays[5] = "Viernes";
    weekdays[6] = "Sábado";
    this.turnos.forEach(element => {
      var fecha = new Date(element.fecha);
      var dia = weekdays[fecha.getDay()];
      dias[dia] += 1;
    })
    this.data2 = {
      labels: lista,
      datasets: [
        {
          label: 'Cantidad de turnos por día de la semana.',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [dias[lista[0]],dias[lista[1]],dias[lista[2]],dias[lista[3],dias[lista[4]],dias[lista[5]]]]
        }
      ]
    }

  }

  calcular3() {
  
    let turnosTotales = {};
    for (let i = 0; i < this.medicos.length; i++) {

      turnosTotales[this.medicos[i].uid] = 0;
      
    }
    this.turnos.forEach(element => {
      turnosTotales[element.uid] += 1;
    });
    let lista = [];
    this.medicos.forEach((a)=>{
      lista.push(turnosTotales[a.uid])
    });
    console.log(lista);
    let nombres = this.medicos.map((a)=>{
      return a.nombre;
    });
    this.data3 = {
      labels: nombres,
      datasets: [
        {
          label: 'Médicos por cantidad de turnos dados',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: lista
        }
      ]
    }

  }

  async downloadPdfGraficoBarra2() {
    await this.loadPdfMaker();
    const chart = document.getElementById('chart2');
    html2canvas(chart, {
      height: 4000,
      width: 1500
    }).then((canvas) => {
      const chartData = canvas.toDataURL();
      const docDefinition = {   watermark: { text: 'Clinica online', color: 'blue', opacity: 0.3, bold: true, italics: false },content: [] ,pageOrientation:'landscape'}
      docDefinition.content.push({ image: chartData, width: 1000 });
      this.pdfMake.createPdf(docDefinition).download();
    })
  }

  async downloadPdfGraficoBarra3() {
    await this.loadPdfMaker();
    const chart = document.getElementById('chart3');
    html2canvas(chart, {
      height: 4000,
      width: 1500
    }).then((canvas) => {
      const chartData = canvas.toDataURL();
      const docDefinition = {   watermark: { text: 'Clinica online', color: 'blue', opacity: 0.3, bold: true, italics: false },content: [] ,pageOrientation:'landscape'}
      docDefinition.content.push({ image: chartData, width: 1000 });
      this.pdfMake.createPdf(docDefinition).download();
    })
  }




}
