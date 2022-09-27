import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-crear-usuario",
  templateUrl: "./crear-usuario.component.html",
  styleUrls: ["./crear-usuario.component.scss"],
})
export class CrearUsuarioComponent implements OnInit {
  constructor() {}



  administrarIndicadores ={
    Crear:false,
    Ver: false,
    Editar: false,
    Eliminar: false
  }

  administrarPermisos={
    Crear:false,
    Ver: false,
    Editar: false,
    Eliminar: false
  }
  visorEventos ={
    Crear:false,
    Ver: false,
    Editar: false,
    Eliminar: false
  }

  gestorNotificaciones ={
    Crear:false,
    Ver: false,
    Editar: false,
    Eliminar: false
  }

  reportes ={
    Crear:false,
    Ver: false,
    Editar: false,
    Eliminar: false
  }

  configuracion ={
    Crear:false,
    Ver: false,
    Editar: false,
    Eliminar: false
  }

  NuevoUsuario = {
    Fullname: "",
    Email: "",
    Pass: "",
    Typeuser: "",
    Telefono: "",
    Estado: "",
    administrarIndicadores: this.administrarIndicadores,
    administrarPermisos: this.administrarIndicadores,
    visorEventos: this.administrarIndicadores,
    gestorNotificaciones: this.administrarIndicadores,
    reportes: this.administrarIndicadores,
    configuracion: this.administrarIndicadores,
  };

  asignarIndicadores(){
    console.log(this.NuevoUsuario)
  }

  ngOnInit() {}
}
