import { Component, OnInit } from '@angular/core';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

   guardarimg =[];
  captImg(event){
    const imagen = event.target.files[0];
    this.guardarimg.push(imagen);
  }
  

}
