import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NgbAlert } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-eliminar-subcategoria",
  templateUrl: "./eliminar-subcategoria.component.html",
  styleUrls: ["./eliminar-subcategoria.component.scss"],
})
export class EliminarSubcategoriaComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }

  Estandar = {
    NombreEstandar: "",
    estandar: "",
  };

  estandarId = {
    id: "",
  };

  Categoria = {
    categoria1: "",
    NombreCategoria: "",
  };

  usarioLocalStote = JSON.parse(localStorage.getItem("usario"));
  Usuarioid = this.usarioLocalStote.usuarioid;

  SubCategoria = {
    subcategoria1: "",
    nombreSubcategoria: "",
    IdUsuario: this.Usuarioid,
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
    this.getSubCategoria(0);
  }

  categoria() {
    this.categoriaFil = this.Categoria.categoria1;
    this.getSubCategoria(this.categoriaFil);
  }

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

  getCategoria(estandar) {
    this.authService.getCategoria(this.Categoria).subscribe((res: any) => {
      this.resultadosCategoria = res.filter(
        (item) => item.idEstandar == estandar
      );
    });
  }

  getSubCategoria(categoria) {
    this.authService
      .getSubCategoria(this.SubCategoria)
      .subscribe((res: any) => {
        this.resultadosSubCategoria = res.filter(
          (item) => item.idCategoria == categoria
        );
      });
  }

  eliminarSubcategoria() {
    if (this.Estandar.estandar == '') {
      this.changeSuccessMessage(2);
    }
    else {
      if (this.Categoria.categoria1 == '') {
        this.changeSuccessMessage(3);
      }
      else {
        if (this.SubCategoria.subcategoria1 == '') {
          this.changeSuccessMessage(4);
        }
        else {
          this.resultadosSubCategoria = this.authService
            .eliminarSubcategoria(this.SubCategoria)
            .subscribe((res: any) => {
              if (res.resul == "Subcategoria eliminada correctamente") {
                this.router.navigate(["categorias"]);
                this.alerta("Subcategoría eliminada correctamente");
              } else {
                this.alerta("No se pudo eliminar");
              }
            });
        }
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
    if (i == 4) {
      this._success.next("¡Error!, debe seleccionar la subcategoría");
    }
  }

  alerta(mensaje: any) {
    this.getStandares();
    Swal.fire(mensaje);
  }
}
