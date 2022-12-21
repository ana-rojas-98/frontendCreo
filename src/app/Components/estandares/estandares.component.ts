import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbAlert } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { CargandoService } from "src/app/services/cargando.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-estandares",
  templateUrl: "./estandares.component.html",
  styleUrls: ["./estandares.component.scss"],
})
export class EstandaresComponent implements OnInit {
  private _success = new Subject<string>();
  successMessage = "";
  @ViewChild("selfClosingAlert", { static: false }) selfClosingAlert: NgbAlert;

  public changeSuccessMessage(i: number) {
    if (i == 1) {
      this._success.next("¡Se guardó existosamente!");
    }
    if (i == 2) {
      this._success.next("¡Error!, el estándar ya existe");
    }
    if (i == 3) {
      this._success.next("¡Error!, debe ingresar el nombre del estándar");
    }
  }

  usarioLocalStote = JSON.parse(localStorage.getItem("usario"));
  Usuarioid = this.usarioLocalStote.usuarioid;

  Estandar = {
    NombreEstandar: "",
    IdUsuario: this.Usuarioid,
  };
  constructor(
    private authService: AuthService,
    private router: Router,
    public cargandoService: CargandoService
  ) { }

  ngOnInit() {
    this.authService.enviarCorreos().subscribe((res: any) => { });
    this.authService.enviarCorreosIndicadores().subscribe((res: any) => { });

    let usarioLocalStote = JSON.parse(localStorage.getItem("usario"));
    if (usarioLocalStote.typeuser == "3") {
      this.router.navigate(["private"]);
      return true;
    }
    if (usarioLocalStote.indicadorCrear == false) {
      this.router.navigate(["private"]);
      return true;
    }
    this._success.subscribe((message) => (this.successMessage = message));
  }
  SetEstandar() {
    if (this.Estandar.NombreEstandar == "") {
      this.changeSuccessMessage(3);
    } else {
      this.cargandoService.ventanaCargando();
      this.authService.crear_estandar(this.Estandar).subscribe((res: any) => {
        if (res.result == "se guardo exitosamente") {
          this.alerta("Estándar creado exitosamente");
          this.router.navigate(["categorias/" + res.id]);
        } else {
          this.changeSuccessMessage(2);
        }
      });
    }
  }

  alerta(mensaje: any) {
    Swal.fire(mensaje);
  }
}
