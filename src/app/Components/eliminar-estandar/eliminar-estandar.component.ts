import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NgbAlert } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { CargandoService } from "src/app/services/cargando.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-eliminar-estandar",
  templateUrl: "./eliminar-estandar.component.html",
  styleUrls: ["./eliminar-estandar.component.scss"],
})
export class EliminarEstandarComponent implements OnInit {

  usarioLocalStote = JSON.parse(localStorage.getItem("usario"));
  Usuarioid = this.usarioLocalStote.usuarioid

  Estandar = {
    IdEstandar: "",
    IdUsuario: this.Usuarioid,
    NombreCategoria: "",
  };
  constructor(private authService: AuthService, private router: Router,
    public cargandoService: CargandoService) { }

  resultados = {};

  private _success = new Subject<string>();
  successMessage = "";
  @ViewChild("selfClosingAlert", { static: false }) selfClosingAlert: NgbAlert;


  ngOnInit() {
    this.authService.enviarCorreos().subscribe((res: any) => {});
    this.authService.enviarCorreosIndicadores().subscribe((res: any) => {});

    let usarioLocalStote = JSON.parse(localStorage.getItem("usario"));
    if (usarioLocalStote.typeuser == "3") {
      this.router.navigate(["private"]);
      return true;
    }
    if (usarioLocalStote.indicadorEliminar == false) {
      this.router.navigate(["private"]);
      return true;
    }
    this.getStandares();
    this._success.subscribe((message) => (this.successMessage = message));
  }

  getStandares() {
    this.authService.getStandares(this.Estandar).subscribe((res: any) => {
      this.resultados = res.map((item) => {
        return item;
      });
    });
  }

  deleteEstandar() {
    if (this.Estandar.IdEstandar == '') {
      this.changeSuccessMessage(2);
    }
    else {
      this.cargandoService.ventanaCargando();
      this.authService.deleteEstandar(this.Estandar).subscribe((res: any) => {
        if (res.resul == "Estandar eliminado correctamente") {
          this.router.navigate(["administrar-indicadores"]);
          this.alerta(res.resul);
        } else {
          this.alerta("No se pudo eliminar el estandar");
        }
      });
    }
  }

  alerta(mensaje: any) {
    Swal.fire(mensaje);
  }

  public changeSuccessMessage(i: number) {
    if (i == 1) {
      this._success.next("¡Se eliminó existosamente!");
    }
    if (i == 2) {
      this._success.next("¡Error!, debe seleccionar el estándar");
    }
  }
}
