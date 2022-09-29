import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { AdministrarUsuariosService } from "src/app/services/administrar-usuarios.service";

@Component({
  selector: "app-crear-usuario",
  templateUrl: "./crear-usuario.component.html",
  styleUrls: ["./crear-usuario.component.scss"],
})
export class CrearUsuarioComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private serviceAdministaraUsuario: AdministrarUsuariosService
  ) {}

  UsuarioIdp ={
    id: 3
  } ;

  administrarIndicadores = {
    Crear: false,
    Ver: false,
    Editar: false,
    Eliminar: false,
  };

  administrarPermisos = {
    Crear: false,
    Ver: false,
    Editar: false,
    Eliminar: false,
  };
  visorEventos = {
    Crear: false,
    Ver: false,
    Editar: false,
    Eliminar: false,
  };

  gestorNotificaciones = {
    Crear: false,
    Ver: false,
    Editar: false,
    Eliminar: false,
  };

  reportes = {
    Crear: false,
    Ver: false,
    Editar: false,
    Eliminar: false,
  };

  configuracion = {
    Crear: false,
    Ver: false,
    Editar: false,
    Eliminar: false,
  };

  NuevoUsuario = {
    Usuarioid: 1,
    Fullname: "",
    Email: "",
    Pass: "12345",
    Typeuser: "",
    Telefono: "",
    Estado: 1,
    IdUsuarioRegistro: localStorage.getItem("idUsuario"),
    administrarIndicadores: this.administrarIndicadores,
    administrarPermisos: this.administrarIndicadores,
    visorEventos: this.administrarIndicadores,
    gestorNotificaciones: this.administrarIndicadores,
    reportes: this.administrarIndicadores,
    configuracion: this.administrarIndicadores,
  };

  Usuarioid = "";

  asignarIndicadores() {
    //console.log(this.NuevoUsuario);
    this.authService
      .CrearNuevoUsuario(this.NuevoUsuario)
      .subscribe((res: any) => {
        this.Usuarioid = res.usuarioid;
        console.log("peticion: ", res);
      });
  }

  enviarUsuarioId(){
    this.serviceAdministaraUsuario.UsuarioId.emit(this.UsuarioIdp)
  }

  ngOnInit() {

  }
}
