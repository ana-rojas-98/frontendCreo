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
    asunto: "",
    mensaje: "",
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
  dias=false;
  boxtres=false;
  semana=false;
  boxtresI=false;
  lunes=false;
  martes=false;
  miercoles=false;
  jueves=false;
  viernes=false;
  sabado=false;
  estadoDias=false;
  quedia=[];
  fechaEspera:Date;
  fecha = new Date();
  dia = this.fecha.getDate();
  mes = this.fecha.getMonth()+1;
  year=this.fecha.getFullYear();
  completa=`${this.year}-${this.mes}-${this.dia}`;
  ensayo= this.fecha.toLocaleDateString();
  ahora  = Date.parse(this.ensayo);
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
    check.asunto = this.envios.asunto;
    check.mensaje = this.envios.mensaje;
    if(check.checked===true){
      this.enviarCorreo.push(
        {
        correo: check.correo,
        asunto:check.asunto,
        mensaje:check.mensaje,
        }
      );
    }else if (check.checked===false){
     this.enviarCorreo.pop();
   }
  });
 
}
algunosCorreos(){
  const algunosC = this.aux.filter(hola=>hola.checked===true);
  algunosC.forEach((m)=>{
    m.asunto = this.envios.asunto;
    m.mensaje = this.envios.mensaje;
    this.enviarCorreo.push(
      {
      correo: m.correo,
      asunto:m.asunto,
      mensaje:m.mensaje,
      }
    );
  });
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
casillaBoxTres(){
  if (this.boxtres!==this.semana){
    this.dias=false;
    this.boxtres=false;
  }else if(this.boxtres===this.semana){
    this.dias=true;
    this.boxtres=true;
  }
}
diasElectos(){
  if(this.lunes.valueOf()==true){
    this.quedia.push("lunes");
    this.lunes=false;
  }
  if(this.martes.valueOf()==true){
      this.quedia.push("martes");
      this.martes=false;
  }
  if(this.miercoles.valueOf()==true){
      this.quedia.push("miercoles");
      this.miercoles=false;
  }
  if(this.jueves.valueOf()==true){
      this.quedia.push("jueves");
      this.jueves=false;
  }
   if(this.viernes.valueOf()==true){
      this.quedia.push("viernes");
      this.viernes=false;
  }
  if(this.sabado.valueOf()==true){
      this.quedia.push("sabado");
      this.sabado=false;
  }
}
boxtresDias(){
  if (this.boxtresI!==this.dias){
    this.semana=false;
    this.boxtresI=false;
  }else if(this.boxtresI===this.dias){
    this.semana=true;
    this.boxtresI=true;
  }
}
enviar(){
  // console.log("Asunto", this.envios.asunto)
  // console.log("Mensaje", this.envios.mensaje)
  console.log("Envios ", this.envios)
  console.log("Enviar a ", this.enviarCorreo)
//     var form = new FormData();
//     form.append("asunto", this.envios.asunto);
//     form.append("mensaje",this.envios.mensaje); 
//     form.append("correo",this.enviarCorreo);
//       console.log("dentroforeach",this.enviarCorreo)
    
   // form.append("correos",this.enviarCorreo);
    this.authService.enviarCorreo(this.enviarCorreo).subscribe((res:any)=>{
      return res;
    }); 
  
//   var form = new FormData();
//   form.append("asunto", this.envios.asunto);
//   form.append("mensaje",this.envios.mensaje); 
//   form.append("correo",this.enviarCorreo);
//     console.log("dentroforeach",this.enviarCorreo)   
//  // form.append("correos",this.enviarCorreo);
//   this.authService.enviarCorreo(form).subscribe((res:any)=>{
//     return res;
//   });
  this.algunosCorreos();
}
Guardar(){
if(this.estadoi===true){
  console.log("enviar de inmediato")
  this.enviar();
}
if(this.estadoii===true){
  console.log("enviar con fecha");
  var f1 =Date.parse(this.fechaEspera.toString());
  var f= Date.parse(this.completa);
  if(f1<f){
    console.log("La fecha digitada es anterior a hoy");
  }else if(f1===f){
    console.log("La fecha digitada es hoy, selecciona enviar inmediatamente")
  }else if(f1>f){
    console.log("Correo programado exitosamente")
    this.enviar();
    // if(this.fechaEspera.toString()==this.completa){
    //        console.log("enviar correo") 
    // }
  }
}
if(this.estadoiii===true){
  console.log("enviar varias veces")
  console.log("dias",this.lunes)
}
if(this.estadoiv===true){
  console.log("enviar cierta fecha")
}
}

}
