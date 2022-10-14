import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-eliminar-estandar",
  templateUrl: "./eliminar-estandar.component.html",
  styleUrls: ["./eliminar-estandar.component.scss"],
})
export class EliminarEstandarComponent implements OnInit {
  Estandar = {
    IdEstandar: "",
  };
  constructor(private authService: AuthService, private router: Router) {}


  resultados = {}

  ngOnInit() {
    this.getStandares()
  }

  getStandares() {
    this.authService.getStandares(this.Estandar).subscribe((res: any) => {
      this.resultados = res.map((item) => {
        return item;
      });
    });
  }

  deleteEstandar(){
    console.log("hola: ", this.Estandar)
    this.authService.deleteEstandar(this.Estandar).subscribe((res: any) => {
      if (res.resul == "Estandar eliminado correctamente") {
        this.router.navigate(['administrar-indicadores'])
        this.alerta(res.resul);
      } else {
         this.alerta("No se pudo eliminar el estandar")
      }
    });
  }

  alerta(mensaje: any) {
    Swal.fire(mensaje);
  }

}
