import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-gestor-noti",
  templateUrl: "./gestor-noti.component.html",
  styleUrls: ["./gestor-noti.component.scss"],
})
export class GestorNotiComponent implements OnInit {
  constructor(private authService: AuthService, public router: Router) {}

  resultadosNotificaciones: any = [];
  crearNotificacion = true
  eliminarNotificacionBtn = true
  usuarioLocalStote = JSON.parse(localStorage.getItem("usario"));
  notificacion = {
    asunto: "",
    creador: "",
    fechaCreacion: "",
    periodicidad: "",
    FechaEnvio: "",
  };
  ngOnInit() {
    if (
      this.usuarioLocalStote.notificacionesCrear == false &&
      this.usuarioLocalStote.notificacionesVer == false
    ) {
      return this.router.navigate(["private"]);
    }

    if (
      this.usuarioLocalStote.notificacionesCrear == false
    ) {
      this.crearNotificacion = false
    }

    if (
      this.usuarioLocalStote.notificacionesEliminar == false
    ) {
      this.eliminarNotificacionBtn = false
    }


    this.authService.enviarCorreos().subscribe((res: any) => {});
    this.authService.enviarCorreosIndicadores().subscribe((res: any) => {});

    this.traer();
  }

  eliminarNotificacion(id) {
    let idNotificacion = {
      id: id,
    };
    Swal.fire({
      title: "Esta seguro de eliminar esta notificación",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.authService
          .EliminarNotificacion(idNotificacion)
          .subscribe((res: any) => {
            if (res.resul == "ok") {
              Swal.fire("Eliminado con exito");
              this.traer();
            } else {
              Swal.fire("No se pudo eliminar");
            }
          });
      } else if (result.isDenied) {
        Swal.fire("Se cancelo la petición");
      }
    });
  }

  traer() {
    this.authService
      .getNotificacion(this.notificacion)
      .subscribe((res: any) => {
        this.resultadosNotificaciones = res.map((item) => {
          return item;
        });
        this.resultadosNotificaciones = this.resultadosNotificaciones.sort();
        this.resultadosNotificaciones = this.resultadosNotificaciones.reverse();
      });
  }
}
