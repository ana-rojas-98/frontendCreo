import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nueva-noti',
  templateUrl: './nueva-noti.component.html',
  styleUrls: ['./nueva-noti.component.scss']
})
export class NuevaNotiComponent implements OnInit {

  constructor() { }

  estado = false;
  checkUno = false;
  checkDos = false;
  checkTres = false;
  checkCua = false;
  mostrarFecha = false;
  mostrarPeriodico = false;
  cantidadIndicadores = false;
  ngOnInit() {
  }


BoxUno(){
 if(this.estado != this.checkUno ){
      this.checkDos = false;
      this.checkTres = false;
      this.checkCua = false;
      this.estado = false;
    } else if(this.estado === this.checkUno){
      this.checkDos = true;
      this.checkTres = true;
      this.checkCua = true;
      this.estado = true;
    }
}

BoxDos(){
  if(this.estado != this.checkDos ){
    this.checkUno = false;
    this.checkTres = false;
    this.checkCua = false;
    this.estado = false;
    this.mostrarFecha = false;
  } else if(this.estado === this.checkDos){
    this.checkUno = true;
    this.checkTres = true;
    this.checkCua = true;
    this.estado = true;
    this.mostrarFecha = true;
  }
}

BoxTres(){
  if(this.estado != this.checkTres ){
    this.checkUno = false;
    this.checkDos = false;
    this.checkCua = false;
    this.estado = false;
    this.mostrarPeriodico = false;
  } else if(this.estado === this.checkTres){
    this.checkUno = true;
    this.checkDos = true;
    this.checkCua = true;
    this.estado = true;
    this.mostrarPeriodico = true;
  }
}

BoxCuatro(){
  if(this.estado != this.checkCua ){
    this.checkUno = false;
    this.checkDos = false;
    this.checkTres = false;
    this.estado = false;
    this.cantidadIndicadores = false;
  } else if(this.estado === this.checkCua){
    this.checkUno = true;
    this.checkDos = true;
    this.checkTres = true;
    this.estado = true;
    this.cantidadIndicadores = true;
  }
}

  // ShowData() {
  //   this.element = true;
  //   console.log(this.element);
  // }
  // HiddenData() {
  //   this.element = false;
  //   console.log(this.element);
  // }

}
