import { FormControl, FormControlName, FormGroup } from "@angular/forms";
import Swal from "sweetalert2";
import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { AdministrarUsuariosService } from "src/app/services/administrar-usuarios.service";
import { Subject } from "rxjs";
import { NgbAlert } from "@ng-bootstrap/ng-bootstrap";
import { CargandoService } from "src/app/services/cargando.service";

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
    public router: Router,
    public cargandoService: CargandoService
  ) {}

  contrasenaAleatoria = "";
  UsuarioRegistrado = {};
  UsuarioIdModificar = "";
  mostaraGuardar = true;
  readonly = false;
  disabledEmail = false;
  modificar = false;
  readonlyTabla = false;
  prueba = {};
  auxTypeUsuario = "";
  usuarioLocalStote = JSON.parse(localStorage.getItem("usario"));
  readonlyAdministrador = false;
  readonlySuperAdministrador = false;
  readonlyReportes = false;
  aux = 1;
  auxSuper = 0;
  selectEstado = false;
  mostaraAsignarIndicadorModificar = false;
  mostaraAsinnarIndicadorCrear = true;
  idUsuarioIndicadores = 0;
  titulo = "Crear usuario";
  idAeditar;

  permisosReportes = new FormGroup({
    permisosReportes: new FormControl(""),
  });

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
    Reportes: "",
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

  private _success = new Subject<string>();
  successMessage = "";
  @ViewChild("selfClosingAlert", { static: false }) selfClosingAlert: NgbAlert;

  generarClave() {
    const generateRandomString = (num) => {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result1 = " ";
      const charactersLength = characters.length;
      for (let i = 0; i < num; i++) {
        result1 += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }

      return result1;
    };

    const displayRandomString = () => {
      let randomStringContainer = document.getElementById("random_string");
      return (randomStringContainer.innerHTML = generateRandomString(8));
    };

    this.contrasenaAleatoria = generateRandomString(8);
  }

  getUsuarioId() {
    this.serviceAdministaraUsuario.UsuarioIdModificar.subscribe(
      (UsuarioIdModificar) => {
        this.UsuarioIdModificar = UsuarioIdModificar;
        if (this.UsuarioIdModificar != "") {
          this.usarioConsultarApi.Usuarioid = UsuarioIdModificar;
          this.getUsuarioModificar(this.usarioConsultarApi);
        } else {
        }
      }
    );
  }

  getUsuarioModificar(usarioConsultarApi) {
    this.cargandoService.ventanaCargando();
    this.authService
      .getUsuarioModificar(usarioConsultarApi)
      .subscribe((res: any) => {
        if (
          parseInt(this.usuarioLocalStote.typeuser) > parseInt(res.typeuser)
        ) {
          this.router.navigate(["administrar-usuarios"]);
        }
        this.datosCargadosUsuario(res);
        return res;
      });
  }

  datosCargadosUsuario(res) {
    if (res.typeuser == "1" && this.auxSuper == 0) {
      this.auxSuper = 1;
      this.permisoTabala(true);
    }

    this.administrarIndicadores.Reportes = res.indicadorReportes;
    if (this.aux == 1 && this.modificar == true && res.typeuser == "3") {
      this.aux = 2;
      this.readonlyReportes = true;
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

      this.configuracion.Editar = false;
      if (this.auxTypeUsuario == "") {
        this.NuevoUsuario.Typeuser = res.typeuser;
      } else {
        this.NuevoUsuario.Typeuser = this.auxTypeUsuario;
      }
      this.permisos("reportes");
      Swal.close();
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

      this.administrarIndicadores.Reportes = res.indicadorReportes;
      Swal.close();
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

    this.administrarIndicadores.Reportes = res.indicadorReportes;
    Swal.close();
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

      this.permisoReportes.Crear = this.usuarioLocalStote.reportesCrear;
      this.permisoReportes.Ver = this.usuarioLocalStote.reportesVer;
      this.permisoReportes.Editar = this.usuarioLocalStote.reportesEditar;
      this.permisoReportes.Eliminat = this.usuarioLocalStote.reportesEliminar;

      this.permisoConfiguracion.Editar = false;

      return true;
    }

    if (ver == "administrador") {
      this.permisoAdministrarIndicadores.Crear =
        this.usuarioLocalStote.indicadorCrear;
      this.permisoAdministrarIndicadores.Ver =
        this.usuarioLocalStote.indicadorVer;
      this.permisoAdministrarIndicadores.Editar =
        this.usuarioLocalStote.indicadorEditar;
      this.permisoAdministrarIndicadores.Eliminat =
        this.usuarioLocalStote.indicadorEliminar;

      this.permisoAdministrarPermisos.Crear =
        this.usuarioLocalStote.permisosCrear;
      this.permisoAdministrarPermisos.Ver = this.usuarioLocalStote.permisosVer;
      this.permisoAdministrarPermisos.Editar =
        this.usuarioLocalStote.permisosEditar;
      this.permisoAdministrarPermisos.Eliminat =
        this.usuarioLocalStote.permisosEliminar;

      this.permisoVisorEventos.Ver = this.usuarioLocalStote.visorEventosVer;

      this.permisoGestorNotificaciones.Crear =
        this.usuarioLocalStote.notificacionesCrear;
      this.permisoGestorNotificaciones.Ver =
        this.usuarioLocalStote.notificacionesVer;
      this.permisoGestorNotificaciones.Editar =
        this.usuarioLocalStote.notificacionesEditar;
      this.permisoGestorNotificaciones.Eliminat =
        this.usuarioLocalStote.notificacionesEliminar;

      this.permisoReportes.Crear = this.usuarioLocalStote.reportesCrear;
      this.permisoReportes.Ver = this.usuarioLocalStote.reportesVer;
      this.permisoReportes.Editar = this.usuarioLocalStote.reportesEditar;
      this.permisoReportes.Eliminat = this.usuarioLocalStote.reportesEliminar;

      this.permisoConfiguracion.Editar =
        this.usuarioLocalStote.configuracionEditar;

      return true;
    }

    this.permisoAdministrarIndicadores.Crear =
      this.usuarioLocalStote.indicadorCrear;
    this.permisoAdministrarIndicadores.Ver =
      this.usuarioLocalStote.indicadorVer;
    this.permisoAdministrarIndicadores.Editar =
      this.usuarioLocalStote.indicadorEditar;
    this.permisoAdministrarIndicadores.Eliminat =
      this.usuarioLocalStote.indicadorEliminar;

    this.permisoAdministrarPermisos.Crear =
      this.usuarioLocalStote.permisosCrear;
    this.permisoAdministrarPermisos.Ver = this.usuarioLocalStote.permisosVer;
    this.permisoAdministrarPermisos.Editar =
      this.usuarioLocalStote.permisosEditar;
    this.permisoAdministrarPermisos.Eliminat =
      this.usuarioLocalStote.permisosEliminar;

    this.permisoVisorEventos.Ver = this.usuarioLocalStote.visorEventosVer;

    this.permisoGestorNotificaciones.Crear =
      this.usuarioLocalStote.notificacionesCrear;
    this.permisoGestorNotificaciones.Ver =
      this.usuarioLocalStote.notificacionesVer;
    this.permisoGestorNotificaciones.Editar =
      this.usuarioLocalStote.notificacionesEditar;
    this.permisoGestorNotificaciones.Eliminat =
      this.usuarioLocalStote.notificacionesEliminar;

    this.permisoReportes.Crear = this.usuarioLocalStote.reportesCrear;
    this.permisoReportes.Ver = this.usuarioLocalStote.reportesVer;
    this.permisoReportes.Editar = this.usuarioLocalStote.reportesEditar;
    this.permisoReportes.Eliminat = this.usuarioLocalStote.reportesEliminar;

    this.permisoConfiguracion.Editar =
      this.usuarioLocalStote.configuracionEditar;
  }

  inputUsuario() {
    this.administrarIndicadores.Reportes = "asignados";
    this.readonlyReportes = true;
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
    this.readonlyReportes = false;
    this.administrarIndicadores.Reportes = "todos";
    this.permisoTabala(true);
    this.permisos(true);
  }

  inputAdministrador() {
    this.administrarIndicadores.Reportes = "todos";
    this.readonlyReportes = false;
    this.permisoTabala(false);
    this.permisos("administrador");
    if (this.modificar == true) {
      this.getUsuarioModificar(this.usarioConsultarApi);
      this.permisoTabala(false);
    }
    this.auxTypeUsuario = "2";
  }

  ngOnInit() {
    this.authService.enviarCorreos().subscribe((res: any) => {});
    this.authService.enviarCorreosIndicadores().subscribe((res: any) => {});

    this.generarClave();
    let id = "";
    this.usuarioLocalStote = JSON.parse(localStorage.getItem("usario"));
    this._success.subscribe((message) => (this.successMessage = message));
    id = this.route.snapshot.paramMap.get("id");

    let usuarioLogueado = parseInt(this.usuarioLocalStote.typeuser);
    this.idAeditar = parseInt(id);

    if (usuarioLogueado > this.idAeditar) {
      this.alert("No puedes editar a este usuario");
      this.router.navigate(["administrar-usuarios"]);
      return true;
    }

    if (this.usuarioLocalStote.typeuser == "3") {
      this.readonlyAdministrador = true;
      this.readonlySuperAdministrador = true;
      this.permisos("reportes");
    } else if (this.usuarioLocalStote.typeuser == "2") {
      this.readonlySuperAdministrador = true;
    }
    this.permisos(false);

    let usuario = this.route.snapshot.paramMap.get("usuario");
    let idVer = this.route.snapshot.paramMap.get("v");

    let idp = parseInt(id);
    let usuaarioVer = parseInt(idVer);
    if (id) {
      this.titulo = "Editar usuario";

      this.idUsuarioIndicadores = parseInt(id);
      if (this.usuarioLocalStote.permisosEditar == false) {
        this.router.navigate(["private"]);
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
      if (this.usuarioLocalStote.permisosVer == false) {
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
    } else if (this.usuarioLocalStote.permisosCrear == false) {
      this.router.navigate(["administrar-usuarios"]);
      return true;
    }
  }

  asignarIndicadores() {
    if (this.NuevoUsuario.Fullname == "") {
      this.alert("¡Error!, el campo nombre no puede estar vacío");
    } else {
      if (this.NuevoUsuario.Email == "") {
        this.alert("¡Error!, el campo correo electrónico no puede estar vacío");
      } else {
        if (this.NuevoUsuario.Typeuser == "") {
          this.alert("¡Error!, debe seleccionar un tipo de usuario");
        } else {
          if (this.modificar == true) {
            this.cargandoService.ventanaCargando();
            this.authService
              .ModificarUsuario(this.NuevoUsuario)
              .subscribe((res: any) => {
                this.UsuarioRegistrado = res;
                if (res.resul == "Registro actualizado correctamente") {
                  return this.alert("Registro actualizado correctamente");
                } else if (
                  res.resul == "el usuario no se encuentra registrado"
                ) {
                  this.alert("¡Error!, el correo ya se encuentra registrado");
                } else {
                  return this.alert("Error al modificar el usuario");
                }
              });
          } else {
            this.NuevoUsuario.Pass = this.contrasenaAleatoria;
            this.cargandoService.ventanaCargando();
            this.authService
              .CrearNuevoUsuario(this.NuevoUsuario)
              .subscribe((res: any) => {
                this.UsuarioRegistrado = res;
                if (res.mensaje == "Usuario registrado correctamente") {
                  this.idUsuarioIndicadores = res.usuarioid;
                  return this.alert("Registro exitoso");
                } else if (
                  res.resul == "El correo ya se encuentra registrado"
                ) {
                  this.alert("¡Error!, el correo ya se encuentra registrado");
                } else {
                  return this.alert("Error al registrar el usuario");
                }
              });
          }
        }
      }
    }
  }

  public changeSuccessMessage(i: number) {
    if (i == 1) {
      this._success.next("¡Error!, el campo nombre no puede estar vacío");
    }
    if (i == 2) {
      this._success.next(
        "¡Error!, el campo correo electrónico no puede estar vacío"
      );
    }
    if (i == 3) {
      this._success.next("¡Error!, debe seleccionar un tipo de usuario");
    }
    if (i == 4) {
      this._success.next("¡Error!, el correo ya se encuentra registrado");
    }
  }

  enviarUsuarioId() {
    if (this.modificar == false && this.idUsuarioIndicadores == 0) {
      this.alert("Debes crear un usuario antes");
      return true;
    }

    if (this.idUsuarioIndicadores != 0) {
      if (this.NuevoUsuario.Typeuser == "2") {
        this.alert(
          "El usuario es administrador, no requiere asignar indicadores"
        );
        return true;
      }
      if (this.NuevoUsuario.Typeuser == "1") {
        this.alert(
          "El usuario es super administrador, no requiere asignar indicadores"
        );
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
