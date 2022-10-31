import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
@Component({
  selector: 'app-nueva-noti',
  templateUrl: './nueva-noti.component.html',
  styleUrls: ['./nueva-noti.component.scss']
})
export class NuevaNotiComponent implements OnInit {

  constructor(private authService: AuthService,private formBuilder: FormBuilder) { }

  usuarios = {
    tipoUsuario: "",
    nombre: "",
    telefono: "",
    correo: "",
  };
  envios ={
    tipoUsuario: "",
    nombre: "",
    telefono: "",
    correo: "",
  };
  resultadosUsuarios: any =[];
  ensayoUsuarios:any = [];
  aux:any=[];
  enviarCorreo:any=[];
  estadoi = false;
  estadoii = false;
  estadoiii = false;
  estadoiv = false;
  checkUno = false;
  checkDos = false;
  checkTres = false;
  checkCua = false;
  mostrarFecha = false;
  mostrarPeriodico = false;
  cantidadIndicadores = false;
  fechaEspera: Date;
  ngOnInit() {
    this.getUsuarios(); 
    this.elegitTodos();
  }

getUsuarios() {
  this.authService.getUsuarios(this.usuarios).subscribe((res: any) => {
    this.resultadosUsuarios = res.map((item) => {
      return item;
    });
  });
}

elegitTodos(){
  this.authService.getUsuarios(this.usuarios).subscribe((res: any) => {
    this.ensayoUsuarios = res.forEach((item) => {
      item.checked=false;
      console.log("item", item)
      this.aux.push(item);
    });        
    console.log("resultados", this.aux);   
  });
}

todosCorreos(event){
  const eve=event.target.checked;
  this.aux.forEach((check)=>{
    check.checked = eve;
    if(check.checked===true){
      this.enviarCorreo.push(
        {
        nombre: check.nombre,
        correo: check.correo,
        }
      );
    }else if (check.checked===false){
      this.enviarCorreo.pop();
    }
  });
  console.log("enviado",this.aux)
  console.log("enviarCorreo",this.enviarCorreo)
}
algunosCorreos(){
  const algunosC = this.aux.filter(hola=>hola.checked===true);
  algunosC.forEach((m)=>{
    this.enviarCorreo.push(
      {
      nombre: m.nombre,
      correo: m.correo,
      }
    );
  })
  console.log("enviarCorreo",this.enviarCorreo)  
}


BoxUno(){
   if( this.estadoi!=this.checkUno){
      this.checkDos = false;
      this.checkTres = false;
      this.checkCua = false;
      this.estadoi = false;
    } else if(this.checkUno===this.estadoi){
      this.checkDos = true;
      this.checkTres = true;
      this.checkCua = true;
      this.estadoi = true;
    }
  console.log("enviar de inmediato checki", this.estadoi)
}

BoxDos(){
  if(this.estadoii!=this.checkDos ){
    this.checkUno = false;
    this.checkTres = false;
    this.checkCua = false;
    this.estadoii = false;
    this.mostrarFecha = false;
  } else if(this.estadoii=== this.checkDos ){
    this.checkUno = true;
    this.checkTres = true;
    this.checkCua = true;
    this.estadoii= true;
    this.mostrarFecha = true;
  }
  console.log("enviar de inmediato check", this.estadoii)
}

BoxTres(){
  if(this.estadoiii != this.checkTres ){
    this.checkUno = false;
    this.checkDos = false;
    this.checkCua = false;
    this.estadoiii = false;
    this.mostrarPeriodico = false;
  } else if(this.estadoiii === this.checkTres){
    this.checkUno = true;
    this.checkDos = true;
    this.checkCua = true;
    this.estadoiii = true;
    this.mostrarPeriodico = true;
  }
}

BoxCuatro(){
  if(this.estadoiv != this.checkCua ){
    this.checkUno = false;
    this.checkDos = false;
    this.checkTres = false;
    this.estadoiv = false;
    this.cantidadIndicadores = false;
  } else if(this.estadoiv === this.checkCua){
    this.checkUno = true;
    this.checkDos = true;
    this.checkTres = true;
    this.estadoiv = true;
    this.cantidadIndicadores = true;
  }
}

Guardar(){
this.algunosCorreos();
console.log("se ejecuto")
console.log("enviar", this.enviarCorreo)
if(this.estadoi===true){
  console.log("enviar de inmediato")
}
if(this.estadoii===true){
  console.log("esperar fecha", this.fechaEspera)
}
if(this.estadoiii===true){
  console.log("enviar varias veces")
}
if(this.estadoiv===true){
  console.log("enviar cierta fecha")
}
}

}
