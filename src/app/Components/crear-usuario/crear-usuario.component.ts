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

  UsuarioRegistrado = {};
  UsuarioIdModificar = "";

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

  UsuarioModificarApi = {
    usuarioId:1,
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

  usarioConsultarApi = {
    Usuarioid: this.UsuarioIdModificar,
  };

  Usuarioid = "";

  getUsuarioId() {
    this.serviceAdministaraUsuario.UsuarioIdModificar.subscribe(
      (UsuarioIdModificar) => {
        this.UsuarioIdModificar = UsuarioIdModificar;
        if (this.UsuarioIdModificar != "") {
          this.usarioConsultarApi.Usuarioid = UsuarioIdModificar;
          this.getUsuarioModificar(this.usarioConsultarApi);
        } else {
          console.log("id a modificar: ", this.UsuarioIdModificar);
        }
      }
    );
  }

  getUsuarioModificar(usarioConsultarApi) {
    this.authService
      .getUsuarioModificar(usarioConsultarApi)
      .subscribe((res: any) => {
        this.UsuarioModificarApi.usuarioId = res.usuarioid
        this.NuevoUsuario.Fullname = "res.nombre"
        this.NuevoUsuario.Email = res.correo
        this.NuevoUsuario.Telefono = res.telefono
        this.administrarIndicadores = res.indicadorId
        console.log("api: ", res);
        return res;
      });
  }

  ngOnInit() {
    this.getUsuarioId();
    console.log("full name: ",this.NuevoUsuario.Fullname);
  }

  asignarIndicadores() {
    console.log(this.NuevoUsuario);
    this.authService
      .CrearNuevoUsuario(this.NuevoUsuario)
      .subscribe((res: any) => {
        this.UsuarioRegistrado = res;
        console.log("hola: ", res);
        return res;
      });
  }

  enviarUsuarioId() {
    this.serviceAdministaraUsuario.UsuarioId.emit(this.UsuarioRegistrado);
  }
}
