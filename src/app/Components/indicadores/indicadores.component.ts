import { Component, OnInit } from "@angular/core";
import { ReportesService } from "./../../services/reportes.service";
import { AuthService } from "src/app/services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { isNull } from "@angular/compiler/src/output/output_ast";
import { IndicadoresService } from "src/app/services/indicadores.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-indicadores",
  templateUrl: "./indicadores.component.html",
  styleUrls: ["./indicadores.component.scss"],
})
export class IndicadoresComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private reportesService: ReportesService,
    private indicadoresservice: IndicadoresService,

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
        console.log("reportes indicaadores", item)
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

  alert(mensaje) {
    Swal.fire(mensaje);
  }

  descargarArchivo(id, url) {
    this.indicadoresservice.descarga(id).subscribe((res) => {
      let nombreArchivo = res.headers.get("content-disposition");
      //?.split(';')[1].split('=')[1];
      let tipo: Blob = res.body as Blob;
      let a = document.createElement("a");
      a.download = url;
      a.href = window.URL.createObjectURL(tipo);
      a.click();
    });
  }

  DescargarTodosAdjuntos(){
    this.indicadoresservice.DescargarTodosAdjuntos().subscribe((res) => {
      let nombreArchivo = res.headers.get("content-disposition");
      //?.split(';')[1].split('=')[1];
      let tipo: Blob = res.body as Blob;
      let a = document.createElement("a");
      a.download = "TodosAdjuntos";
      a.href = window.URL.createObjectURL(tipo);
      a.click();
    });
  }
}
