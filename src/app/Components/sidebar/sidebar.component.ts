import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  constructor(private authService: AuthService, public router: Router) {}
  usarioLocalStote = JSON.parse(localStorage.getItem("usario"));

  visorEventos = true;
  indicadores = true;
  reportes = true;
  administrarIndicadores = true;
  administrarUsuarios = true;
  notificaciones = true;
  configuraciones = true;
  licenciar = true;

  Usuarioid = this.usarioLocalStote.usuarioid;

  Usuario = {
    IdUsuario: this.Usuarioid,
  };

  ngOnInit() {
    if (this.usarioLocalStote.usauarioid != 1) {
      this.licenciar = false;
    }
    if (
      this.usarioLocalStote.permisosCrear == false &&
      this.usarioLocalStote.permisosVer == false &&
      this.usarioLocalStote.permisosEditar == false &&
      this.usarioLocalStote.permisosEliminar == false
    ) {
      this.administrarUsuarios = false;
    }
    if (
      this.usarioLocalStote.notificacionesCrear == false &&
      this.usarioLocalStote.notificacionesVer == false &&
      this.usarioLocalStote.notificacionesEditar == false &&
      this.usarioLocalStote.notificacionesEliminar == false
    ) {
      this.notificaciones = false;
    }
    if (
      this.usarioLocalStote.indicadorCrear == false &&
      this.usarioLocalStote.indicadorVer == false &&
      this.usarioLocalStote.indicadorEditar == false &&
      this.usarioLocalStote.indicadorEliminar == false
    ) {
      this.administrarIndicadores = false;
    }
    if (this.usarioLocalStote.typeuser == "3") {
      this.visorEventos = false;
      this.indicadores = true;
      this.reportes = true;
      this.administrarIndicadores = false;
      this.administrarUsuarios = false;
      this.notificaciones = false;
      this.configuraciones = false;
      this.licenciar = false;
    }
    if (this.usarioLocalStote.visorEventosVer == false) {
      this.visorEventos = false;
    }
    if (this.usarioLocalStote.configuracionEditar == false) {
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

