import { Component, OnInit } from "@angular/core";
import { ReportesService } from "./../../services/reportes.service";
import { AuthService } from "src/app/services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { isNull } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-indicadores",
  templateUrl: "./indicadores.component.html",
  styleUrls: ["./indicadores.component.scss"],
})
export class IndicadoresComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private reportesService: ReportesService,

  ) { }
  Estandar = new FormControl("");
  Categoria = new FormControl("");
  Subcategoria = new FormControl("");
  Periodicidad = new FormControl("");

  resultados = {};
  resultadosCategoria = {};
  resultadosSubCategoria = {};
  resultadosTabla = {};

  Registros = [];
  EstandarOpciones = [];
  CategoriaOpciones = [];
  SubcategoriaOpciones = [];

  ngOnInit() {
    this.getindIcadores();
    this.getCategoria();
    this.getStandares();
    this.getSubCategoria();
  }

  getStandares() {
    this.authService.getStandares("").subscribe((res: any) => {
      this.resultados = res.map((item) => {
        return item;
      });
    });
  }

  getCategoria() {
    this.authService.getCategoria("").subscribe((res: any) => {
      this.resultadosCategoria = res.map((item) => {
        return item;
      });
    });
  }

  getSubCategoria() {
    this.authService.getSubCategoria("").subscribe((res: any) => {
      this.resultadosSubCategoria = res.map((item) => {
        return item;
      });
    });
  }

  getindIcadores() {
    this.reportesService.ConsultarIndicadoresAsignados().subscribe((res: any) => {
      this.resultadosTabla = res.map((item) => {
        return item;
      });
    });
  }

  estandar() {
    this.getCategoriaFilter(this.Estandar.value);
    this.getSubCategoriaFilter(this.Categoria.value);
    if (this.Estandar.value != "") {
      this.getIndicadoresFilter();
    }
    else {
      this.categoria();
      this.subcategoria();
    }
    if (this.Estandar.value == "" && this.Categoria.value == "" && this.Subcategoria.value == "") {
      this.getindIcadores();
      this.getCategoria();
      this.getStandares();
      this.getSubCategoria();
    }
  }

  categoria() {
    this.getSubCategoriaFilter(this.Categoria.value);
    if (this.Categoria.value != "") {
      this.getIndicadoresFilter();
    }
    else {
      this.subcategoria();
    }
    if (this.Estandar.value == "" && this.Categoria.value == "" && this.Subcategoria.value == "") {
      this.getindIcadores();
      this.getCategoria();
      this.getStandares();
      this.getSubCategoria();
    }
  }

  subcategoria() {
    if (this.Subcategoria.value != "") {
      this.getIndicadoresFilter();
    }
    if (this.Estandar.value == "" && this.Categoria.value == "" && this.Subcategoria.value == "") {
      this.getindIcadores();
      this.getCategoria();
      this.getStandares();
      this.getSubCategoria();
    }
  }

  getCategoriaFilter(estandar) {
    this.authService.getCategoria(this.Categoria).subscribe((res: any) => {
      this.resultadosCategoria = res.filter(
        (item) => item.idEstandar == estandar
      );
    });
  }

  getSubCategoriaFilter(categoria) {
    this.authService.getSubCategoria(this.Subcategoria).subscribe((res: any) => {
      this.resultadosSubCategoria = res.filter(
        (item) => item.idCategoria == categoria
      );
    });
  }

  getIndicadoresFilter() {
    this.reportesService
      .ConsultarIndicadoresAsignados()
      .subscribe((res: any) => {
        this.resultadosTabla = res.filter(
          (item) => (item.idCategoria == this.Categoria.value || item.idEstandar == this.Estandar.value || item.idSubCategoria == this.Subcategoria.value)
        );
      });
  }
}
