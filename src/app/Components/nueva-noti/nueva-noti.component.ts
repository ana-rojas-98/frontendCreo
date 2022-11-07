import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import Swal from "sweetalert2";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-nueva-noti",
  templateUrl: "./nueva-noti.component.html",
  styleUrls: ["./nueva-noti.component.scss"],
})
export class NuevaNotiComponent implements OnInit {
  constructor(
    private authService: AuthService,
    public router: Router,
    private formBuilder: FormBuilder
  ) { }

  usuarios = {
    tipoUsuario: "",
    nombre: "",
    telefono: "",
    correo: "",
  };
  envios = {
    asunto: "",
    mensaje: "",
  };

  resultadosUsuarios: any = [];
  ensayoUsuarios: any = [];
  aux: any = [];
  enviarCorreo: any = [];
 
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
  dias = false;
  boxtres = false;
  semana = false;
  boxtresI = false;
  lunes = false;
  martes = false;
  miercoles = false;
  jueves = false;
  viernes = false;
  sabado = false;
  estadoDias = false;
  todo = false;
  periodicidad:string;
  quedia = [];
  fechaEspera: Date;
  fecha = new Date();
  dia = this.fecha.getDate();
  mes = this.fecha.getMonth() + 1;
  year = this.fecha.getFullYear();
  completa = `${this.year}-${this.mes}-${this.dia}`;
  ensayo = this.fecha.toLocaleDateString();
  ahora = Date.parse(this.ensayo);

  
  usarioLocalStote = JSON.parse(localStorage.getItem("usario"));
  usuarioid = parseInt(this.usarioLocalStote.usuarioid);
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

  elegitTodos() {
    this.authService.getUsuarios(this.usuarios).subscribe((res: any) => {
      this.ensayoUsuarios = res.forEach((item) => {
        item.checked = false;
        console.log("item", item);
        this.aux.push(item);
      });
      console.log("resultados", this.aux);
    });
  }

  todosCorreos(event) {
    const eve = event.target.checked;
    this.aux.forEach((check) => {
      check.checked = eve;
      if (check.checked === false) {
        this.enviarCorreo.pop();
      }
    });
  }


  BoxUno() {
    if (this.estadoi != this.checkUno) {
      this.checkDos = false;
      this.checkTres = false;
      this.checkCua = false;
      this.estadoi = false;
    } else if (this.checkUno === this.estadoi) {
      this.checkDos = true;
      this.checkTres = true;
      this.checkCua = true;
      this.estadoi = true;
    }
  }

  BoxDos() {
    if (this.estadoii != this.checkDos) {
      this.checkUno = false;
      this.checkTres = false;
      this.checkCua = false;
      this.estadoii = false;
      this.mostrarFecha = false;
    } else if (this.estadoii === this.checkDos) {
      this.checkUno = true;
      this.checkTres = true;
      this.checkCua = true;
      this.estadoii = true;
      this.mostrarFecha = true;
    }
  }

  BoxTres() {
    if (this.estadoiii != this.checkTres) {
      this.checkUno = false;
      this.checkDos = false;
      this.checkCua = false;
      this.estadoiii = false;
      this.mostrarPeriodico = false;
    } else if (this.estadoiii === this.checkTres) {
      this.checkUno = true;
      this.checkDos = true;
      this.checkCua = true;
      this.estadoiii = true;
      this.mostrarPeriodico = true;
    }
  }

  BoxCuatro() {
    if (this.estadoiv != this.checkCua) {
      this.checkUno = false;
      this.checkDos = false;
      this.checkTres = false;
      this.estadoiv = false;
      this.cantidadIndicadores = false;
    } else if (this.estadoiv === this.checkCua) {
      this.checkUno = true;
      this.checkDos = true;
      this.checkTres = true;
      this.estadoiv = true;
      this.cantidadIndicadores = true;
    }
  }
  casillaBoxTres() {
    if (this.boxtres !== this.semana) {
      this.dias = false;
      this.boxtres = false;
    } else if (this.boxtres === this.semana) {
      this.dias = true;
      this.boxtres = true;
    }
  }
  diasElectos() {
    if (this.lunes.valueOf() == true) {
      this.quedia.push("lunes");
      this.lunes = false;
    }
    if (this.martes.valueOf() == true) {
      this.quedia.push("martes");
      this.martes = false;
    }
    if (this.miercoles.valueOf() == true) {
      this.quedia.push("miercoles");
      this.miercoles = false;
    }
    if (this.jueves.valueOf() == true) {
      this.quedia.push("jueves");
      this.jueves = false;
    }
    if (this.viernes.valueOf() == true) {
      this.quedia.push("viernes");
      this.viernes = false;
    }
    if (this.sabado.valueOf() == true) {
      this.quedia.push("sabado");
      this.sabado = false;
    }
  }
  boxtresDias() {
    if (this.boxtresI !== this.dias) {
      this.semana = false;
      this.boxtresI = false;
    } else if (this.boxtresI === this.dias) {
      this.semana = true;
      this.boxtresI = true;
    }
  }

  enviar(){
    console.log("nombre usuario", this.usuarioid)
    const hola=this.aux.filter(hola=>hola.checked===true);
    hola.forEach((m)=>{
      m.asunto = this.envios.asunto;
      m.mensaje = this.envios.mensaje;
      this.enviarCorreo.push(
        {
          correo: m.correo,
          asunto: m.asunto,
          mensaje: m.mensaje,
        }
      );
      });
   
    for(let i=0; i<this.enviarCorreo.length;i++){
     var form=new FormData();
     form.append("asunto",this.enviarCorreo[i].asunto)
     form.append("mensaje",this.enviarCorreo[i].mensaje)
     form.append("correo",this.enviarCorreo[i].correo)
     form.append("periodicidad",this.periodicidad)
     form.append("fechaEnvio",this.ensayo)
     form.append("usuario",this.usuarioid.toString())
      this.authService.enviarCorreo(form).subscribe((res:any)=>{
        return res;

      });
    }
       this.authService.enviarCorreo(form).subscribe((res:any)=>{
          return res;
        }); 
      this.limpiar();
  }
  
  Guardar(){
  if(this.estadoi===true){
    console.log("enviar de inmediato")
    this.periodicidad="No";
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
    }
    if (this.estadoii === true) {
      console.log("enviar con fecha");
      var f1 = Date.parse(this.fechaEspera.toString());
      var f = Date.parse(this.completa);
      if (f1 < f) {
        console.log("La fecha digitada es anterior a hoy");
      } else if (f1 === f) {
        console.log("La fecha digitada es hoy, selecciona enviar inmediatamente")
      } else if (f1 > f) {
        console.log("Correo programado exitosamente")
        this.enviar();
        // if(this.fechaEspera.toString()==this.completa){
        //        console.log("enviar correo") 
        // }
      }
    }
    if (this.estadoiii === true) {
      console.log("enviar varias veces")
      console.log("dias", this.lunes)
    }
    if (this.estadoiv === true) {
      console.log("enviar cierta fecha")
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


  
  limpiar(){
    console.log("Enviar a ", this.enviarCorreo)
    this.aux.forEach((item) => {
      item.checked=false;
    });    
    // for (let index = 0; index < this.enviarCorreo.length; index++) {
    //   this.enviarCorreo.splice(this.enviarCorreo[index]);
    //   console.log("eliminando")
    // }
    console.log("Enviar a ", this.enviarCorreo)
  }

  alerta(mensaje: any) {
    Swal.fire(mensaje);
  }
}

