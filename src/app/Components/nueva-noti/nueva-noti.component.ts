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
  ) {}

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
  periodicidad: string;
  indicadoresFalta:"";
  fechaCaducidad: Date;
  quedia: any = [];
  fechaEspera: Date;
  fecha = new Date();
  dia = this.fecha.getDate();
  mes = this.fecha.getMonth() + 1;
  year = this.fecha.getFullYear();
  completa = `${this.year}-${this.mes}-${this.dia}`;
  ensayo = this.fecha.toLocaleDateString();
  fechaConvertida: string;

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
        this.aux.push(item);
      });
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
    
     if(this.lunes.valueOf()==false){
      console.log("false")
      this.quedia.slice({"lunes":this.lunes})
     }else if(this.lunes.valueOf()==true){
        console.log("hacer el push")
        this.quedia.push({dia:"lunes"})
        this.lunes=false;
     }
     if(this.martes.valueOf()==false){
      console.log("false")
     }else if(this.martes.valueOf()==true){
        console.log("hacer el push")
        this.quedia.push({dia:"martes"})
        this.martes=false;
     }
     if(this.miercoles.valueOf()==false){
      console.log("false")
     }else if(this.miercoles.valueOf()==true){
        console.log("hacer el push")
        this.quedia.push({dia:"miercoles"})
        this.miercoles=false;
     }
     if(this.jueves.valueOf()==false){
      console.log("false")
     }else if(this.jueves.valueOf()==true){
        console.log("hacer el push")
        this.quedia.push({dia:"jueves"})
        this.jueves=false;
     }
     if(this.viernes.valueOf()==false){
      console.log("false")
     }else if(this.viernes.valueOf()==true){
        console.log("hacer el push")
        this.quedia.push({dia:"viernes"})
        this.viernes=false;
     }
     if(this.sabado.valueOf()==false){
      console.log("false")
     }else if(this.sabado.valueOf()==true){
        console.log("hacer el push")
        this.quedia.push({dia:"sabado"})
        this.sabado=false;
     }
      console.log("lunes",this.lunes)
      console.log("martes",this.martes)
      console.log("miencoles",this.miercoles)
      console.log("jueves",this.jueves)
      console.log("viernes",this.viernes)
      console.log("sabado",this.sabado)
    // var dia;
    // if (this.lunes.valueOf() == true) {
    //   dia= "lunes";
    //   this.quedia.push({dia});
    //   this.lunes= false;
    // }else if(this.lunes.valueOf() == false){
    //   console.log("se volvio false")
    //   console.log("filter",this.quedia.filter((item) => item === "lunes")) 
    //   console.log("despues de filter",this.quedia)
    // }
    // if (this.martes.valueOf() == true) {
    //   dia= "martes";
    //   this.quedia.push({dia});
    //   this.martes = false;
    // }
    // if (this.miercoles.valueOf() == true) {
    //   dia= "miercoles";
    //   this.quedia.push({dia});
    //   this.miercoles = false;
    // }
    // if (this.jueves.valueOf() == true) {
    //   dia= "jueves";
    //   this.quedia.push({dia});
    //   this.jueves = false;
    // }
    // if (this.viernes.valueOf() == true) {
    //   dia= "viernes";
    //   this.quedia.push({dia});
    //   this.viernes = false;
    // }
    // if (this.sabado.valueOf() == true) {
    //   dia= "sabado";
    //   this.quedia.push({dia});
    //   this.sabado = false;
    // }
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

  enviar() {
    const hola = this.aux.filter((hola) => hola.checked === true);
    hola.forEach((m) => {
      m.asunto = this.envios.asunto;
      m.mensaje = this.envios.mensaje;
      this.enviarCorreo.push({
        correo: m.correo,
        asunto: m.asunto,
        mensaje: m.mensaje,
      });
    });

    for (let i = 0; i < this.enviarCorreo.length; i++) {
      var form = new FormData();
      form.append("asunto", this.enviarCorreo[i].asunto);
      form.append("mensaje", this.enviarCorreo[i].mensaje);
      form.append("correo", this.enviarCorreo[i].correo);
      form.append("periodicidad", this.periodicidad);
      form.append("fechaEnvio", this.ensayo);
      form.append("usuario", this.usuarioid.toString());
      this.authService.enviarCorreo(form).subscribe((res: any) => {
        if (res.a == "ok") {
          this.alerta("Correo enviado correctamente");
          this.router.navigate(["gestor-noti"]);
        }
        return res;
      });
    }
    this.limpiar();
  }

  programado() {
    const hola = this.aux.filter((hola) => hola.checked === true);
    hola.forEach((m) => {
      m.asunto = this.envios.asunto;
      m.mensaje = this.envios.mensaje;
      this.enviarCorreo.push({
        usuarioEnvia: this.usuarioid,
        usuarioRecibe: m.usuarioid,
        fechaEnvia: this.fechaConvertida,
        periodicidad: this.periodicidad,
        asunto: m.asunto,
        mensaje: m.mensaje,
        indicadorFaltante: this.indicadoresFalta,
      });
    });
    this.authService.enviarProgramados(hola).subscribe((res: any) => {
      if (res.resul == "ok") {
        this.alerta("Correo enviado correctamente");
        this.router.navigate(["gestor-noti"]);
      }
      return res;
    });
    console.log("array", this.enviarCorreo);
  }

  Guardar() {
    if (this.estadoi === true) {
      console.log("enviar de inmediato");
      this.periodicidad = "0";
      this.enviar();
    }
    if (this.estadoii === true) {
      console.log("enviar con fecha");
      var f1 = Date.parse(this.fechaEspera.toString());
      var f = Date.parse(this.completa);
      if (f1 < f) {
        this.alerta("La fecha digitada es anterior a hoy");
      } else if (f1 === f) {
        this.alerta("La fecha digitada es hoy, selecciona enviar inmediatamente");
      } else if (f1 > f) {
        console.log("Correo programado exitosamente");
        this.periodicidad = "0";
        this.fechaConvertida = this.fechaEspera
          .toString()
          .replace(/^(\d{4})-(\d{2})-(\d{2})$/g, "$2-$3/$1");
        console.log("fecha digitada en replace", this.fechaConvertida);
        this.programado();
        // this.enviar();
      }
    }
    if (this.estadoiii === true) {
      console.log("enviar varias veces");
      console.log("dias", this.quedia);
      // for (let i =0; i<this.quedia.length;i++ ){
      //   var hola= this.quedia[i];
      //   console.log("item", hola)
      // }
    }
    if (this.estadoiv === true) {
      console.log("enviar cierta fecha");
      this.fechaConvertida = this.fechaEspera
      .toString()
      .replace(/^(\d{4})-(\d{2})-(\d{2})$/g, "$2-$3/$1");
      this.periodicidad = "0";
      this.programado();
    }
  }

  limpiar() {
    this.aux.forEach((item) => {
      item.checked = false;
    });
    // for (let index = 0; index < this.enviarCorreo.length; index++) {
    //   this.enviarCorreo.splice(this.enviarCorreo[index]);
    //   console.log("eliminando")
    // }
  }
  alerta(mensaje: any) {
    Swal.fire(mensaje);
  }
}
