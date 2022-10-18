import Swal from "sweetalert2";
import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
    private serviceAdministaraUsuario: AdministrarUsuariosService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  UsuarioRegistrado = {};
  UsuarioIdModificar = "";
  mostaraGuardar = true;
  readonly = false;
  disabledEmail = false;
  modificar = false;
  readonlyTabla = false;
  prueba = {};
  auxTypeUsuario = "";
  usarioLocalStote = "";
  readonlyAdministrador = false;
  readonlySuperAdministrador = false;
  aux = 1;
  selectEstado = false;
  mostaraAsignarIndicadorModificar = false;
  mostaraAsinnarIndicadorCrear = true;
  idUsuarioIndicadores = 0;
  titulo = "Crear usuario"

  permisoAdministrarIndicadores = {
    Crear: false,
    Ver: false,
    Editar: false,
    Eliminat: false,
  };

  permisoAdministrarPermisos = {
    Crear: false,
    Ver: false,
    Editar: false,
    Eliminat: false,
  };
  permisoVisorEventos = {
    Crear: false,
    Ver: false,
    Editar: false,
    Eliminat: false,
  };

  permisoGestorNotificaciones = {
    Crear: false,
    Ver: false,
    Editar: false,
    Eliminat: false,
  };

  permisoReportes = {
    Crear: false,
    Ver: false,
    Editar: false,
    Eliminat: false,
  };

  permisoConfiguracion = {
    Crear: false,
    Ver: false,
    Editar: false,
    Eliminat: false,
  };

  administrarIndicadores = {
    Crear: false,
    Ver: false,
    Editar: false,
    Eliminat: false,
  };

  administrarPermisos = {
    Crear: false,
    Ver: false,
    Editar: false,
    Eliminat: false,
  };
  visorEventos = {
    Crear: false,
    Ver: false,
    Editar: false,
    Eliminat: false,
  };

  gestorNotificaciones = {
    Crear: false,
    Ver: false,
    Editar: false,
    Eliminat: false,
  };

  reportes = {
    Crear: false,
    Ver: false,
    Editar: false,
    Eliminat: false,
  };

  configuracion = {
    Crear: false,
    Ver: false,
    Editar: false,
    Eliminat: false,
  };

  NuevoUsuario = {
    usuarioId: 0,
    Fullname: "",
    Email: "",
    Pass: "12345",
    Typeuser: "",
    Telefono: "",
    Estado: "1",
    IdUsuarioRegistro: localStorage.getItem("idUsuario"),
    administrarIndicadores: this.administrarIndicadores,
    administrarPermisos: this.administrarPermisos,
    visorEventos: this.visorEventos,
    gestorNotificaciones: this.gestorNotificaciones,
    reportes: this.reportes,
    configuracion: this.configuracion,
  };

  usarioConsultarApi = {
    Usuarioid: 1,
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
        this.prueba = res;
        this.datosCargadosUsuario(res);
        return res;
      });
  }

  datosCargadosUsuario(res) {
    if (this.aux == 1 && this.modificar == true && res.typeuser == "3") {
      this.aux = 2;
      this.NuevoUsuario.usuarioId = res.usuarioid;
      this.NuevoUsuario.Fullname = res.nombre;
      this.NuevoUsuario.Email = res.correo;
      this.NuevoUsuario.Telefono = res.telefono;
      this.reportes.Crear = res.reportesCrear;
      this.reportes.Ver = res.reportesVer;
      this.reportes.Editar = res.reportesEditar;
      this.reportes.Eliminat = res.reportesEliminar;

      this.administrarIndicadores.Crear = false;
      this.administrarIndicadores.Ver = false;
      this.administrarIndicadores.Editar = false;
      this.administrarIndicadores.Eliminat = false;

      this.administrarPermisos.Crear = false;
      this.administrarPermisos.Ver = false;
      this.administrarPermisos.Editar = false;
      this.administrarPermisos.Eliminat = res.permisosEliminar;

      this.visorEventos.Ver = false;

      this.gestorNotificaciones.Crear = false;
      this.gestorNotificaciones.Ver = false;
      this.gestorNotificaciones.Editar = false;
      this.gestorNotificaciones.Eliminat = false;

      this.configuracion.Editar = false;
      if (this.auxTypeUsuario == "") {
        this.NuevoUsuario.Typeuser = res.typeuser;
      } else {
        this.NuevoUsuario.Typeuser = this.auxTypeUsuario;
      }
      this.permisos("reportes");
      return true;
    } else if (this.auxTypeUsuario == "3") {
      this.NuevoUsuario.usuarioId = res.usuarioid;
      this.NuevoUsuario.Fullname = res.nombre;
      this.NuevoUsuario.Email = res.correo;
      this.NuevoUsuario.Telefono = res.telefono;
      this.reportes.Crear = res.reportesCrear;
      this.reportes.Ver = res.reportesVer;
      this.reportes.Editar = res.reportesEditar;
      this.reportes.Eliminat = res.reportesEliminar;

      this.administrarIndicadores.Crear = false;
      this.administrarIndicadores.Ver = false;
      this.administrarIndicadores.Editar = false;
      this.administrarIndicadores.Eliminat = false;

      this.administrarPermisos.Crear = false;
      this.administrarPermisos.Ver = false;
      this.administrarPermisos.Editar = false;
      this.administrarPermisos.Eliminat = false;

      this.visorEventos.Ver = false;

      this.gestorNotificaciones.Crear = false;
      this.gestorNotificaciones.Ver = false;
      this.gestorNotificaciones.Editar = false;
      this.gestorNotificaciones.Eliminat = false;
      return true;
    }

    this.NuevoUsuario.usuarioId = res.usuarioid;
    this.NuevoUsuario.Fullname = res.nombre;
    this.NuevoUsuario.Email = res.correo;
    this.NuevoUsuario.Telefono = res.telefono;

    if (this.auxTypeUsuario == "") {
      this.NuevoUsuario.Typeuser = res.typeuser;
    } else {
      this.NuevoUsuario.Typeuser = this.auxTypeUsuario;
    }

    this.administrarIndicadores.Crear = res.indicadorCrear;
    this.administrarIndicadores.Ver = res.indicadorVer;
    this.administrarIndicadores.Editar = res.indicadorEditar;
    this.administrarIndicadores.Eliminat = res.indicadorEliminar;

    this.administrarPermisos.Crear = res.permisosCrear;
    this.administrarPermisos.Ver = res.permisosVer;
    this.administrarPermisos.Editar = res.permisosEditar;
    this.administrarPermisos.Eliminat = res.permisosEliminar;

    this.visorEventos.Ver = res.visorEventosVer;

    this.gestorNotificaciones.Crear = res.notificacionesCrear;
    this.gestorNotificaciones.Ver = res.notificacionesVer;
    this.gestorNotificaciones.Editar = res.notificacionesEditar;
    this.gestorNotificaciones.Eliminat = res.notificacionesEliminar;

    this.reportes.Crear = res.reportesCrear;
    this.reportes.Ver = res.reportesVer;
    this.reportes.Editar = res.reportesEditar;
    this.reportes.Eliminat = res.reportesEliminar;

    this.configuracion.Editar = res.configuracionEditar;
  }

  permisoTabala(permiso) {
    this.readonlyTabla = permiso;

    this.administrarIndicadores.Crear = permiso;
    this.administrarIndicadores.Ver = permiso;
    this.administrarIndicadores.Editar = permiso;
    this.administrarIndicadores.Eliminat = permiso;

    this.administrarPermisos.Crear = permiso;
    this.administrarPermisos.Ver = permiso;
    this.administrarPermisos.Editar = permiso;
    this.administrarPermisos.Eliminat = permiso;

    this.visorEventos.Ver = permiso;

    this.gestorNotificaciones.Crear = permiso;
    this.gestorNotificaciones.Ver = permiso;
    this.gestorNotificaciones.Editar = permiso;
    this.gestorNotificaciones.Eliminat = permiso;

    this.reportes.Crear = permiso;
    this.reportes.Ver = permiso;
    this.reportes.Editar = permiso;
    this.reportes.Eliminat = permiso;

    this.configuracion.Editar = permiso;
  }

  permisos(ver) {
    let usarioLocalStote = JSON.parse(localStorage.getItem("usario"));

    if (ver == true) {
      this.permisoAdministrarIndicadores.Crear = true;
      this.permisoAdministrarIndicadores.Ver = true;
      this.permisoAdministrarIndicadores.Editar = true;
      this.permisoAdministrarIndicadores.Eliminat = true;

      this.permisoAdministrarPermisos.Crear = true;
      this.permisoAdministrarPermisos.Ver = true;
      this.permisoAdministrarPermisos.Editar = true;
      this.permisoAdministrarPermisos.Eliminat = true;

      this.permisoVisorEventos.Ver = true;

      this.permisoGestorNotificaciones.Crear = true;
      this.permisoGestorNotificaciones.Ver = true;
      this.permisoGestorNotificaciones.Editar = true;
      this.permisoGestorNotificaciones.Eliminat = true;

      this.permisoReportes.Crear = true;
      this.permisoReportes.Ver = true;
      this.permisoReportes.Editar = true;
      this.permisoReportes.Eliminat = true;

      this.permisoConfiguracion.Editar = true;
      return true;
    }

    if (ver == "reportes") {
      this.permisoAdministrarIndicadores.Crear = false;
      this.permisoAdministrarIndicadores.Ver = false;
      this.permisoAdministrarIndicadores.Editar = false;
      this.permisoAdministrarIndicadores.Eliminat = false;

      this.permisoAdministrarPermisos.Crear = false;
      this.permisoAdministrarPermisos.Ver = false;
      this.permisoAdministrarPermisos.Editar = false;
      this.permisoAdministrarPermisos.Eliminat = false;

      this.permisoVisorEventos.Ver = false;

      this.permisoGestorNotificaciones.Crear = false;
      this.permisoGestorNotificaciones.Ver = false;
      this.permisoGestorNotificaciones.Editar = false;
      this.permisoGestorNotificaciones.Eliminat = false;

      this.permisoReportes.Crear = usarioLocalStote.reportesCrear;
      this.permisoReportes.Ver = usarioLocalStote.reportesVer;
      this.permisoReportes.Editar = usarioLocalStote.reportesEditar;
      this.permisoReportes.Eliminat = usarioLocalStote.reportesEliminar;

      this.permisoConfiguracion.Editar = false;
      return true;
    }

    if (ver == "administrador") {
      this.permisoAdministrarIndicadores.Crear =
        usarioLocalStote.indicadorCrear;
      this.permisoAdministrarIndicadores.Ver = usarioLocalStote.indicadorVer;
      this.permisoAdministrarIndicadores.Editar =
        usarioLocalStote.indicadorEditar;
      this.permisoAdministrarIndicadores.Eliminat =
        usarioLocalStote.indicadorEliminar;

      this.permisoAdministrarPermisos.Crear = usarioLocalStote.permisosCrear;
      this.permisoAdministrarPermisos.Ver = usarioLocalStote.permisosVer;
      this.permisoAdministrarPermisos.Editar = usarioLocalStote.permisosEditar;
      this.permisoAdministrarPermisos.Eliminat =
        usarioLocalStote.permisosEliminar;

      this.permisoVisorEventos.Ver = usarioLocalStote.visorEventosVer;

      this.permisoGestorNotificaciones.Crear =
        usarioLocalStote.notificacionesCrear;
      this.permisoGestorNotificaciones.Ver = usarioLocalStote.notificacionesVer;
      this.permisoGestorNotificaciones.Editar =
        usarioLocalStote.notificacionesEditar;
      this.permisoGestorNotificaciones.Eliminat =
        usarioLocalStote.notificacionesEliminar;

      this.permisoReportes.Crear = usarioLocalStote.reportesCrear;
      this.permisoReportes.Ver = usarioLocalStote.reportesVer;
      this.permisoReportes.Editar = usarioLocalStote.reportesEditar;
      this.permisoReportes.Eliminat = usarioLocalStote.reportesEliminar;

      this.permisoConfiguracion.Editar = usarioLocalStote.configuracionEditar;
      return true;
    }

    this.permisoAdministrarIndicadores.Crear = usarioLocalStote.indicadorCrear;
    this.permisoAdministrarIndicadores.Ver = usarioLocalStote.indicadorVer;
    this.permisoAdministrarIndicadores.Editar =
      usarioLocalStote.indicadorEditar;
    this.permisoAdministrarIndicadores.Eliminat =
      usarioLocalStote.indicadorEliminar;

    this.permisoAdministrarPermisos.Crear = usarioLocalStote.permisosCrear;
    this.permisoAdministrarPermisos.Ver = usarioLocalStote.permisosVer;
    this.permisoAdministrarPermisos.Editar = usarioLocalStote.permisosEditar;
    this.permisoAdministrarPermisos.Eliminat =
      usarioLocalStote.permisosEliminar;

    this.permisoVisorEventos.Ver = usarioLocalStote.visorEventosVer;

    this.permisoGestorNotificaciones.Crear =
      usarioLocalStote.notificacionesCrear;
    this.permisoGestorNotificaciones.Ver = usarioLocalStote.notificacionesVer;
    this.permisoGestorNotificaciones.Editar =
      usarioLocalStote.notificacionesEditar;
    this.permisoGestorNotificaciones.Eliminat =
      usarioLocalStote.notificacionesEliminar;

    this.permisoReportes.Crear = usarioLocalStote.reportesCrear;
    this.permisoReportes.Ver = usarioLocalStote.reportesVer;
    this.permisoReportes.Editar = usarioLocalStote.reportesEditar;
    this.permisoReportes.Eliminat = usarioLocalStote.reportesEliminar;

    this.permisoConfiguracion.Editar = usarioLocalStote.configuracionEditar;
  }

  inputUsuario() {
    if (this.modificar == true) {
      this.getUsuarioModificar(this.usarioConsultarApi);
      this.permisoTabala(false);
      this.permisos("reportes");
      this.auxTypeUsuario = "3";
      return true;
    }
    this.permisoTabala(false);
    this.permisos("reportes");
  }

  inputSuperAdministrador() {
    this.permisoTabala(true);
    this.permisos(true);
  }

  inputAdministrador() {
    this.permisoTabala(false);
    this.permisos("administrador");
    if (this.modificar == true) {
      this.getUsuarioModificar(this.usarioConsultarApi);
    }
    this.auxTypeUsuario = "2";
  }

  ngOnInit() {
    let usarioLocalStote = JSON.parse(localStorage.getItem("usario"));

    if (usarioLocalStote.typeuser == "3") {
      this.readonlyAdministrador = true;
      this.readonlySuperAdministrador = true;
      this.permisos("reportes");
    } else if (usarioLocalStote.typeuser == "2") {
      this.readonlySuperAdministrador = true;
    }
    this.permisos(false);
    let id = "";
    id = this.route.snapshot.paramMap.get("id");
    let usuario = this.route.snapshot.paramMap.get("usuario");
    let idVer = this.route.snapshot.paramMap.get("v");
    console.log("usuario: ", usuario);
    let idp = parseInt(id);
    let usuaarioVer = parseInt(idVer);
    if (id) {
      this.titulo = "Editar usuario"
      this.idUsuarioIndicadores = parseInt(id);
      if (usarioLocalStote.permisosEditar == false) {
        this.router.navigate(["administrar-usuarios"]);
        return true;
      }
      this.selectEstado = true;
      (this.mostaraAsignarIndicadorModificar = true),
        (this.mostaraAsinnarIndicadorCrear = false),
        (this.modificar = true);
      this.disabledEmail = true;
      this.usarioConsultarApi.Usuarioid = idp;
      this.getUsuarioModificar(this.usarioConsultarApi);
      this.permisos(false);
      return true;
    } else if (usuario == "usuario") {
      if (usarioLocalStote.permisosVer == false) {
        this.router.navigate(["administrar-usuarios"]);
        return true;
      }
      (this.mostaraAsignarIndicadorModificar = false),
        (this.mostaraAsinnarIndicadorCrear = false),
        (this.disabledEmail = true);
      this.usarioConsultarApi.Usuarioid = usuaarioVer;
      this.getUsuarioModificar(this.usarioConsultarApi);
      this.mostaraGuardar = false;
      this.readonly = true;
      this.readonlyTabla = true;
      this.permisos(true);
      return true;
    } else if (usarioLocalStote.permisosCrear == false) {
      this.router.navigate(["administrar-usuarios"]);
      return true;
    }
  }

  asignarIndicadores() {
    if (this.modificar == true) {
      this.authService
        .ModificarUsuario(this.NuevoUsuario)
        .subscribe((res: any) => {
          this.UsuarioRegistrado = res;
          if (res.resul == "Registro actualizado correctamente") {
            return this.alert("Registro actualizado correctamente");
          } else if (res.resul == "el usuario no se encuentra registrado") {
            return this.alert("El correo ya se encuentra registrado");
          } else {
            return this.alert("Error al modificar el usuario");
          }
        });
    } else {
      this.authService
        .CrearNuevoUsuario(this.NuevoUsuario)
        .subscribe((res: any) => {
          this.UsuarioRegistrado = res;
          if (res.mensaje == "Usuario registrado correctamente") {
            this.idUsuarioIndicadores = res.usuarioid;
            return this.alert("Registro exitoso");
          } else if (res.mensaje == "El correo ya se encuentra registrado") {
            return this.alert("El correo ya se encuentra registrado");
          } else {
            return this.alert("Error al registrar el usuario");
          }
        });
    }
  }

  enviarUsuarioId() {
    if (this.modificar == false && this.idUsuarioIndicadores == 0) {
      this.alert("Debes crear un usuario antes");
      return true;
    }

    if (this.idUsuarioIndicadores != 0) {
      if (this.NuevoUsuario.Typeuser == "2") {
        this.alert("El usuario es administrador, no requiere asignar indicadores");
        return true;
      }
      if (this.NuevoUsuario.Typeuser == "1") {
        this.alert("El usuario es super administrador, no requiere asignar indicadores");
        return true;
      }
      if (this.NuevoUsuario.Typeuser == "3") {
          if (this.modificar == true) {
            this.router.navigate([
              "asignar-indicadores",
              this.idUsuarioIndicadores,
              "modificar",
            ]);
          } else {
            this.router.navigate([
              "asignar-indicadores",
              this.idUsuarioIndicadores,
              "crear",
            ]);
          }
        }
        }
      }

  alert(mensaje) {
    Swal.fire(mensaje);
  }
}
