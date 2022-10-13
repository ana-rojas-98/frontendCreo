import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-eliminar-categoria",
  templateUrl: "./eliminar-categoria.component.html",
  styleUrls: ["./eliminar-categoria.component.scss"],
})
export class EliminarCategoriaComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

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

  SubCategoria = {
    subcategoria1: "",
    nombreSubcategoria: "",
  };

  resultados = {};
  resultadosCategoria = {};
  resultadosSubCategoria = {};
  estandarFil = "";
  categoriaFil = "";

  estandar() {
    this.estandarFil = this.Estandar.estandar;
    this.getCategoria(this.estandarFil);
  }

  categoria() {
    this.categoriaFil = this.Categoria.categoria1;
  }

  ngOnInit() {
    this.getStandares();
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

  alerta(mensaje: any) {
    Swal.fire(mensaje);
  }
}
