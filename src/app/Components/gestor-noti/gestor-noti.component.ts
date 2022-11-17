import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-gestor-noti",
  templateUrl: "./gestor-noti.component.html",
  styleUrls: ["./gestor-noti.component.scss"],
})
export class GestorNotiComponent implements OnInit {
  constructor(private authService: AuthService) {}

  resultadosNotificaciones: any = [];
  notificacion = {
    asunto: "",
    creador: "",
    fechaCreacion: "",
    periodicidad: "",
    FechaEnvio: "",
  };
  ngOnInit() {
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
            }else{
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
