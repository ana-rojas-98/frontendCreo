import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router, ActivatedRoute, RouterLinkActive } from "@angular/router";


@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  constructor(private authService: AuthService, public router: Router) {}
  usuarioLocalStote = JSON.parse(localStorage.getItem("usario"));

  visorEventos = true;
  indicadores = true;
  reportes = true;
  administrarIndicadores = true;
  administrarUsuarios = true;
  notificaciones = true;
  configuraciones = true;
  licenciar = true;

  Usuarioid = this.usuarioLocalStote.usuarioid;

  Usuario = {
    IdUsuario: this.Usuarioid,
  };

  ngOnInit() {
    if (this.usuarioLocalStote.usuarioid != 1) {
      this.licenciar = false;
    }
    if (
      this.usuarioLocalStote.permisosCrear == false &&
      this.usuarioLocalStote.permisosVer == false &&
      this.usuarioLocalStote.permisosEditar == false &&
      this.usuarioLocalStote.permisosEliminar == false
    ) {
      this.administrarUsuarios = false;
    }
    if (
      this.usuarioLocalStote.notificacionesCrear == false &&
      this.usuarioLocalStote.notificacionesVer == false &&
      this.usuarioLocalStote.notificacionesEditar == false &&
      this.usuarioLocalStote.notificacionesEliminar == false
    ) {
      this.notificaciones = false;
    }
    if (
      this.usuarioLocalStote.indicadorCrear == false &&
      this.usuarioLocalStote.indicadorVer == false &&
      this.usuarioLocalStote.indicadorEditar == false &&
      this.usuarioLocalStote.indicadorEliminar == false
    ) {
      this.administrarIndicadores = false;
    }
    if (this.usuarioLocalStote.typeuser == "3") {
      this.visorEventos = false;
      this.indicadores = true;
      this.reportes = true;
      this.administrarIndicadores = false;
      this.administrarUsuarios = false;
      this.notificaciones = false;
      this.configuraciones = false;
      this.licenciar = false;
    }
    if (this.usuarioLocalStote.visorEventosVer == false) {
      this.visorEventos = false;
    }
    if (this.usuarioLocalStote.configuracionEditar == false) {
      this.configuraciones = false;
    }
  }
  CerrarSesion() {
    this.authService.CerrarSesion(this.Usuario).subscribe((res: any) => {
      this.authService.fnDestroySessionData(function (res_clean_session) {
        if (res_clean_session) {
        }
      });
    });
  }
}

