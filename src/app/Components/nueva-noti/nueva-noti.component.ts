import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import Swal from "sweetalert2";
import { ActivatedRoute, Router } from "@angular/router";
import { CargandoService } from "src/app/services/cargando.service";
@Component({
  selector: "app-nueva-noti",
  templateUrl: "./nueva-noti.component.html",
  styleUrls: ["./nueva-noti.component.scss"],
})
export class NuevaNotiComponent implements OnInit {
  constructor(
    private authService: AuthService,
    public router: Router,
    private formBuilder: FormBuilder,
    public cargandoService: CargandoService
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
  faltantes: any = [];

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
  indicadoresFalta = 0;
  fechaCaducidad: Date;
  caducidad: string;
  quedia: any = [];
  fechaEspera: Date;
  fecha = new Date();
  dia = this.fecha.getDate();
  mes = this.fecha.getMonth() + 1;
  year = this.fecha.getFullYear();
  completa = `${this.year}-${this.mes}-${this.dia}`;
  ensayo = this.fecha.toLocaleDateString();
  fechaConvertida: string;
  usuarioLocalStote = JSON.parse(localStorage.getItem("usario"));
  usuarioid = parseInt(this.usuarioLocalStote.usuarioid);

  ngOnInit() {
    if (this.usuarioLocalStote.notificacionesCrear == false) {
      return this.router.navigate(["gestor-noti"]);
    }
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

  diasElectos(evento) {
    let e = evento.target;
    if (e.value === "1") {
      if (this.lunes.valueOf() == false) {
        for (let i = 0; i < this.quedia.length; i++) {
          if (this.quedia[i].dia === "lunes") {
            this.quedia.splice(i, 1);
          }
        }
      } else if (this.lunes.valueOf() == true) {
        this.quedia.push({ dia: "lunes" });
      }
    }

    if (e.value === "2") {
      if (this.martes.valueOf() == false) {
        for (let i = 0; i < this.quedia.length; i++) {
          if (this.quedia[i].dia === "martes") {
            this.quedia.splice(i, 1);
          }
        }
      } else if (this.martes.valueOf() == true) {
        this.quedia.push({ dia: "martes" });
      }
    }

    if (e.value === "3") {
      if (this.miercoles.valueOf() == false) {
        for (let i = 0; i < this.quedia.length; i++) {
          if (this.quedia[i].dia === "miercoles") {
            this.quedia.splice(i, 1);
          }
        }
      } else if (this.miercoles.valueOf() == true) {
        this.quedia.push({ dia: "miercoles" });
      }
    }

    if (e.value === "4") {
      if (this.jueves.valueOf() == false) {
        for (let i = 0; i < this.quedia.length; i++) {
          if (this.quedia[i].dia === "jueves") {
            this.quedia.splice(i, 1);
          }
        }
      } else if (this.jueves.valueOf() == true) {
        this.quedia.push({ dia: "jueves" });
      }
    }

    if (e.value === "5") {
      if (this.viernes.valueOf() == false) {
        for (let i = 0; i < this.quedia.length; i++) {
          if (this.quedia[i].dia === "viernes") {
            this.quedia.splice(i, 1);
          }
        }
      } else if (this.viernes.valueOf() == true) {
        this.quedia.push({ dia: "viernes" });
      }
    }

    if (e.value === "6") {
      if (this.sabado.valueOf() == false) {
        for (let i = 0; i < this.quedia.length; i++) {
          if (this.quedia[i].dia === "sabado") {
            this.quedia.splice(i, 1);
          }
        }
      } else if (this.sabado.valueOf() == true) {
        this.quedia.push({ dia: "sabado" });
      }
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
      let form = new FormData();
      form.append("asunto", this.enviarCorreo[i].asunto);
      form.append("mensaje", this.enviarCorreo[i].mensaje);
      form.append("correo", this.enviarCorreo[i].correo);
      form.append("periodicidad", this.periodicidad);
      form.append("fechaEnvio", this.ensayo);
      form.append("usuario", this.usuarioid.toString());
      this.cargandoService.ventanaCargando();
      this.authService.enviarCorreo(form).subscribe((res: any) => {
        if (i == (this.enviarCorreo.length - 1) && res.a == "ok") {
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
        FechaEnvio: this.fechaConvertida,
        periodicidad: this.periodicidad,
        asunto: m.asunto,
        mensaje: m.mensaje,
        cantidadIndicadores: this.indicadoresFalta,
        caducidadPeriodicidad: this.caducidad,
      });
    });

    this.authService
      .enviarProgramados(this.enviarCorreo)
      .subscribe((res: any) => {
        if (res.resul == "ok") {
          this.alerta("Correo enviado correctamente");
          this.router.navigate(["gestor-noti"]);
        }
        return res;
      });
  }

  indicadoresFaltantes() {
    this.faltantes = [
      {
        usuarioEnvia: this.usuarioid,
        FechaEnvio: this.fechaConvertida,
        periodicidad: this.periodicidad,
        asunto: this.envios.asunto,
        mensaje: this.envios.mensaje,
        cantidadIndicadores: this.indicadoresFalta,
        caducidadPeriodicidad: this.caducidad,
      },
    ];
    this.authService.enviarProgramados(this.faltantes).subscribe((res: any) => {
      if (res.resul == "ok") {
        this.alerta("Correo enviado correctamente");
        this.router.navigate(["gestor-noti"]);
      }
      return res;
    });
  }

  Guardar() {
    const vacio = this.aux.filter((hola) => hola.checked === true);
    if (this.envios.asunto == '') {
      return this.alerta("Debe ingresar asunto");
    } else if (this.envios.mensaje == '') {
      return this.alerta("Debe ingresar mensaje");
    }
    if (this.estadoi === true) {
      this.periodicidad = "0";
      if (vacio.length == 0) {
        return this.alerta("Debe seleccionar destinatarios");
      }
      return this.enviar();
    }
    if (this.estadoii === true) {
      if (vacio.length == 0) {
        return this.alerta("Debe seleccionar destinatarios");
      }
      var f1 = Date.parse(this.fechaEspera.toString());
      var f = Date.parse(this.completa);
      if (f1 < f) {
        return this.alerta("La fecha digitada es anterior a hoy");
      } else if (f1 === f) {
        return this.alerta(
          "La fecha digitada es hoy, selecciona enviar inmediatamente"
        );
      } else if (f1 > f) {
        this.periodicidad = "0";
        this.caducidad = "0";
        this.fechaConvertida = this.fechaEspera.toString();
        // .replace(/^(\d{4})-(\d{2})-(\d{2})$/g, "$2-$3/$1");
        this.indicadoresFalta = 0;
        return this.programado();
      }
    } else
      if (this.estadoiii === true) {
        if (vacio.length == 0) {
          return this.alerta("Debe seleccionar destinatarios");
        }
        if (this.fechaCaducidad == undefined){
          return this.alerta("Debe seleccionar fecha de caducidad");
        }
        this.caducidad = this.fechaCaducidad.toString();
        // .replace(/^(\d{4})-(\d{2})-(\d{2})$/g, "$2-$3/$1");
        this.indicadoresFalta = 0;
        if (this.quedia.length == 0){
          return this.alerta("Debe seleccionar días de la semana");
        }
        for (let i = 0; i < this.quedia.length; i++) {
          var hola = this.quedia[i];
          this.periodicidad = hola.dia;
          this.fechaConvertida = hola.dia;
          return this.programado();
        }
      } else
        if (this.estadoiv === true) {
          this.fechaConvertida = this.fechaEspera.toString();
          // .replace(/^(\d{4})-(\d{2})-(\d{2})$/g, "$2-$3/$1");
          this.periodicidad = "0";
          this.caducidad = "0";
          return this.indicadoresFaltantes();
          //this.programado();
        }
        else {
          return this.alerta("Debe seleccionar configuración");
        }
  }

  limpiar() {
    this.aux.forEach((item) => {
      item.checked = false;
    });
    // for (let index = 0; index < this.enviarCorreo.length; index++) {
    //   this.enviarCorreo.splice(this.enviarCorreo[index]);
    // }
  }
  alerta(mensaje: any) {
    Swal.fire(mensaje);
  }
}
