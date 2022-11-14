import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NgbAlert } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-eliminar-categoria",
  templateUrl: "./eliminar-categoria.component.html",
  styleUrls: ["./eliminar-categoria.component.scss"],
})
export class EliminarCategoriaComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }

  Estandar = {
    NombreEstandar: "",
    estandar: "",
  };

  estandarId = {
    id: "",
  };

  usarioLocalStote = JSON.parse(localStorage.getItem("usario"));
  Usuarioid = this.usarioLocalStote.usuarioid;

  Categoria = {
    categoria1: "",
    NombreCategoria: "",
    IdUsuario: this.Usuarioid,
  };

  SubCategoria = {
    subcategoria1: "",
    nombreSubcategoria: "",
  };

  resultados = {};
  resultadosCategoria = {};
  resultadosSubCategoria = {};
  estandarFil = "";
  categoriaFil = "";

  private _success = new Subject<string>();
  successMessage = "";
  @ViewChild("selfClosingAlert", { static: false }) selfClosingAlert: NgbAlert;

  estandar() {
    this.estandarFil = this.Estandar.estandar;
    this.getCategoria(this.estandarFil);
  }

  categoria() {
    this.categoriaFil = this.Categoria.categoria1;
  }

  ngOnInit() {
    let usarioLocalStote = JSON.parse(localStorage.getItem("usario"));
    if (usarioLocalStote.typeuser == "3") {
      this.router.navigate(['private'])
      return true;
    }
    if (usarioLocalStote.indicadorEliminar == false) {
      this.router.navigate(['private'])
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

  getCategoria(estandar) {
    this.authService.getCategoria(this.Categoria).subscribe((res: any) => {
      this.resultadosCategoria = res.filter(
        (item) => item.idEstandar == estandar
      );
    });
  }

  eliminarCategoria() {
    if (this.Estandar.estandar == '') {
      this.changeSuccessMessage(2);
    }
    else {
      if (this.Categoria.categoria1 == '') {
        this.changeSuccessMessage(3);
      }
      else {
        this.resultadosSubCategoria = this.authService
          .eliminarCategoria(this.Categoria)
          .subscribe((res: any) => {
            if (res.codigo == 1) {
              this.router.navigate(['eliminar-estandar'])
              this.alerta(res.resul);
            } else {
              this.alerta("No se pudo eliminar la categoria")
            }
          });
      }
    }

  }

  public changeSuccessMessage(i: number) {
    if (i == 1) {
      this._success.next("¡Se eliminó existosamente!");
    }
    if (i == 2) {
      this._success.next("¡Error!, debe seleccionar el estándar");
    }
    if (i == 3) {
      this._success.next("¡Error!, debe seleccionar la categoría");
    }
  }

  alerta(mensaje: any) {
    Swal.fire(mensaje);
  }
}
