import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-indicadores-masivos',
  templateUrl: './indicadores-masivos.component.html',
  styleUrls: ['./indicadores-masivos.component.scss']
})
export class IndicadoresMasivosComponent implements OnInit {

  constructor() { }
  archivos=[];
  archivoCaptu = File;
  ngOnInit() {
  }

  capturarArchivo(event){
      this.archivoCaptu = event.target.files[0];
      this.archivos.push(this.archivoCaptu);
      console.log('array archivos', this.archivos);
      for (let index = 0; index < this.archivoCaptu.length; index++) {
        const element = this.archivos[index];
        console.log('elementos del array', element);
      }
  }

}
