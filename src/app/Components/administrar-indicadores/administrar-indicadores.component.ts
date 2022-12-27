import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { ReportesService } from "./../../services/reportes.service";
import { FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { CargandoService } from "src/app/services/cargando.service";

@Component({
  selector: "app-administrar-indicadores",
  templateUrl: "./administrar-indicadores.component.html",
  styleUrls: ["./administrar-indicadores.component.scss"],
})
export class AdministrarIndicadoresComponent implements OnInit {
  constructor(
    private authService: AuthService,
    public router: Router,
    private reportesService: ReportesService,
    public cargandoService: CargandoService
  ) {}

  estandarId = {
    id: "",
  };

  usarioLocalStote = JSON.parse(localStorage.getItem("usario"));

  indicador = {
    id: 0,
    userId: this.usarioLocalStote.usuarioid,
  };

  SubCategoria = {
    subcategoria1: "",
    nombreSubcategoria: "",
  };

  estandarFil = "";
  categoriaFil = "";
  crear = false;
  ver = false;
  editar = false;
  eliminar = false;
  tablaIndicadores: any = [];
  resultado: any = [];

  Estandar = new FormControl("");
  Categoria = new FormControl("");
  Subcategoria = new FormControl("");
  Periodicidad = new FormControl("");

  resultados: any = [];
  resultadosCategoria: any = [];
  resultadosSubCategoria: any = [];
  resultadosTabla: any = [];

  Registros: any = [];
  EstandarOpciones: any = [];
  CategoriaOpciones: any = [];
  SubcategoriaOpciones: any = [];

  ngOnInit() {
    this.authService.enviarCorreos().subscribe((res: any) => {});
    this.authService.enviarCorreosIndicadores().subscribe((res: any) => {});

    this.usarioLocalStote = JSON.parse(localStorage.getItem("usario"));

    if (this.usarioLocalStote.typeuser == "3") {
      this.router.navigate(["private"]);
      return true;
    }
    if (this.usarioLocalStote.indicadorCrear == true) {
      this.crear = true;
    }
    if (this.usarioLocalStote.indicadorVer == true) {
      this.ver = true;
    }
    if (this.usarioLocalStote.indicadorEditar == true) {
      this.editar = true;
    }
    if (this.usarioLocalStote.indicadorEliminar == true) {
      this.eliminar = true;
    }
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
    this.cargandoService.ventanaCargando();
    this.reportesService
      .ConsultarIndicadoresAsignados()
      .subscribe((res: any) => {
        this.resultadosTabla = res.map((item) => {
          return item;
        });
        this.resultadosTabla = this.resultadosTabla.sort();
        this.resultadosTabla = this.resultadosTabla.reverse();
        if (this.resultadosTabla) {
          Swal.close();
        }
      });
  }

  estandar() {
    this.getCategoriaFilter(this.Estandar.value);
    this.getSubCategoriaFilter(this.Estandar.value, this.Categoria.value);
    if (this.Estandar.value != "") {
      this.getIndicadoresFilter();
    } else {
      this.getCategoria();
    }
    if (
      this.Estandar.value == "" &&
      this.Categoria.value == "" &&
      this.Subcategoria.value == ""
    ) {
      this.getindIcadores();
      this.getCategoria();
      this.getStandares();
      this.getSubCategoria();
    }
  }

  categoria() {
    this.getSubCategoriaFilter(this.Estandar.value, this.Categoria.value);
    if (this.Categoria.value != "") {
      this.getIndicadoresFilter();
    } else {
      this.estandar();
      this.getSubCategoria();
    }
    if (
      this.Estandar.value == "" &&
      this.Categoria.value == "" &&
      this.Subcategoria.value == ""
    ) {
      this.getindIcadores();
      this.getCategoria();
      this.getStandares();
      this.getSubCategoria();
    }
  }

  subcategoria() {
    if (this.Subcategoria.value != "") {
      this.getIndicadoresFilter();
    } else {
      this.categoria();
    }
    if (
      this.Estandar.value == "" &&
      this.Categoria.value == "" &&
      this.Subcategoria.value == ""
    ) {
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

  getSubCategoriaFilter(estandar, categoria) {
    this.authService
      .getSubCategoria(this.Subcategoria)
      .subscribe((res: any) => {
        this.resultadosSubCategoria = res.filter(
          (item) => item.idCategoria == categoria || item.idEstandar == estandar
        );
      });
  }

  getIndicadoresFilter() {
    this.cargandoService.ventanaCargando();
    this.reportesService
      .ConsultarIndicadoresAsignados()
      .subscribe((res: any) => {
        if (this.Categoria.value != "") {
          this.resultadosTabla = res.filter(
            (item) => item.idCategoria == this.Categoria.value
          );
          if (this.resultadosTabla) {
            Swal.close();
          }
          this.resultadosTabla = this.resultadosTabla.sort();
          this.resultadosTabla = this.resultadosTabla.reverse();
          return true;
        }
        if (this.Subcategoria.value != "") {
          this.resultadosTabla = res.filter(
            (item) => item.idSubCategoria == this.Subcategoria.value
          );
        } else {
          this.resultadosTabla = res.filter(
            (item) =>
              item.idCategoria == this.Categoria.value ||
              item.idEstandar == this.Estandar.value ||
              item.idSubCategoria == this.Subcategoria.value
          );
        }
        if (this.resultadosTabla) {
          Swal.close();
        }
        this.resultadosTabla = this.resultadosTabla.sort();
        this.resultadosTabla = this.resultadosTabla.reverse();
      });
  }

  Eliminar(id2) {
    let a = confirm("¿Está seguro que desea borrar el indicador?");
    if (a) {
      this.indicador.id = id2;
      this.cargandoService.ventanaCargando();
      this.authService.Eliminar(this.indicador).subscribe((res: any) => {
        if (res.resul == "ok") {
          this.alerta("Eliminado correctamente");
          this.getindIcadores();
        }
        return res;
      });
    }
  }

  DuplicarIndicador(id2) {
    this.indicador.id = id2;
    this.authService.DuplicarIndicador(this.indicador).subscribe((res: any) => {
      if (res.resul == "ok") {
        this.alerta("Duplicado correctamente");
        this.getindIcadores();
      }
      return res;
    });
  }

  alerta(mensaje: any) {
    Swal.fire(mensaje);
  }
}
