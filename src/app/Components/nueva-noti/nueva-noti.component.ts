import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: 'app-nueva-noti',
  templateUrl: './nueva-noti.component.html',
  styleUrls: ['./nueva-noti.component.scss']
})
export class NuevaNotiComponent implements OnInit {

  constructor(private authService: AuthService) { }

  usuarios = {
    tipoUsuario: "",
    nombre: "",
    telefono: "",
    correo: "",
  };
  resultadosUsuarios=[];
  ensayo = [];
  estado = false;
  checkUno = false;
  checkDos = false;
  checkTres = false;
  checkCua = false;
  mostrarFecha = false;
  mostrarPeriodico = false;
  cantidadIndicadores = false;
  ngOnInit() {
    this.getUsuarios();    
  }

getUsuarios() {
  console.log("en efecto se dispara")
  this.authService.getUsuarios(this.usuarios).subscribe((res: any) => {
    console.log("entra el auth")
    this.resultadosUsuarios = res.map((item) => {
      console.log('antes del r',this.resultadosUsuarios) 
      return item;
    });
    console.log('despues del r',this.resultadosUsuarios) 
  });
 console.log('usuarios',this.usuarios) 
 console.log('fuerade r',this.resultadosUsuarios) 
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

}
