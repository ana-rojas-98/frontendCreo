import { Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ReportesService } from "./../../services/reportes.service";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";
import { CargandoService } from "src/app/services/cargando.service";

@Component({
  selector: "app-reportes-nuevo-tablero",
  templateUrl: "./reportes-nuevo-tablero.component.html",
  styleUrls: ["./reportes-nuevo-tablero.component.scss"],
})
export class ReportesNuevoTableroComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private reportesService: ReportesService,
    public router: Router,
    public cargandoService: CargandoService
  ) {}

  resultadosUsuario = [];
  resultadosCategoria: {};
  resultadoEstandar: {};
  resultadosSubCategoria: {};
  resultadoIndicadores: [];
  resultadosTabla: any = [];
  estado = [];
  indicadorUsar: any = [];
  usuarioLocalStote = JSON.parse(localStorage.getItem("usario"));

  Indicador = {
    IdArchivo: 0,
    Usar: false,
  };

  Estandar = {
    estandar: "",
  };

  Categoria = {
    categoria1: "",
    NombreCategoria: "",
  };

  SubCategoria = {
    subcategoria1: "",
    nombreSubcategoria: "",
  };

  ngOnInit() {
    if (
      this.usuarioLocalStote.reportesCrear == false &&
      this.usuarioLocalStote.reportesVer == false &&
      this.usuarioLocalStote.reportesEditar == false &&
      this.usuarioLocalStote.reportesEliminar == false
    ) {
      return this.router.navigate(["reportes"]);
    }

    if (this.usuarioLocalStote.reportesCrear == false) {
      return this.router.navigate(["reportes-tableros"]);
    }

    this.getCategoria(0);
    this.getStandares(0);
    this.getSubCategoria(0);
    this.getindIcadores(0);
    this.resultadosTabla = this.resultadosTabla.sort();
    this.resultadosTabla = this.resultadosTabla.reverse();
  }

  continuar() {
    this.router.navigate(["/nuevo-tablero", this.indicadorUsar.toString()]);
    //
  }

  getEstandarFilter() {
    if (this.Estandar.estandar == "") {
      this.getindIcadores(0);
      this.getCategoria(0);
      return true;
    }
    let dato = parseInt(this.Estandar.estandar);
    this.getCategoria(dato);
    this.resultadosTabla = this.estado.filter((item) => {
      return item.idEstandar == dato;
    });
  }

  getCategoriaFilter() {
    if (this.Categoria.categoria1 == "") {
      this.getEstandarFilter();
      this.getSubCategoria(0);
      return true;
    }

    let dato = parseInt(this.Categoria.categoria1);
    this.getSubCategoria(dato);

    this.resultadosTabla = this.estado.filter((item) => {
      return item.idCategoria == dato;
    });
  }

  geSubtCategoriaFilter() {
    if (this.SubCategoria.subcategoria1 == "") {
      this.getCategoriaFilter();
      //this.getindIcadores(0);
    }

    let dato = parseInt(this.SubCategoria.subcategoria1);

    this.resultadosTabla = this.estado.filter((item) => {
      return item.idSubCategoria == dato;
    });
  }

  getStandares(dato) {
    if (dato == 0) {
      this.authService.getStandares("").subscribe((res: any) => {
        this.resultadoEstandar = res.map((item) => {
          return item;
        });
      });
      return true;
    }
  }

  getCategoria(dato) {
    if (dato == 0) {
      this.authService.getCategoria("").subscribe((res: any) => {
        this.resultadosCategoria = res.map((item) => {
          return item;
        });
      });
      return true;
    }
    this.authService.getCategoria("").subscribe((res: any) => {
      this.resultadosCategoria = res.filter((item) => {
        return item.idEstandar == dato;
      });
    });
  }

  getSubCategoria(dato) {
    if (dato == 0) {
      this.authService.getSubCategoria("").subscribe((res: any) => {
        this.resultadosSubCategoria = res.map((item) => {
          return item;
        });
      });
      return true;
    }

    this.authService.getSubCategoria("").subscribe((res: any) => {
      this.resultadosSubCategoria = res.filter((item) => {
        return item.idCategoria == dato;
      });
    });
  }
  getindIcadores(dato) {
    this.cargandoService.ventanaCargando();
    if (dato == 0) {
      if (
        this.usuarioLocalStote.typeuser != "3" ||
        this.usuarioLocalStote.indicadorReportes == "todos"
      ) {
        this.reportesService
          .ConsultarIndicadoresAsignados()
          .subscribe((res: any) => {
            this.resultadosTabla = res.map((item) => {
              this.estado = res;
              this.resultadoIndicadores = res;
              return item;
            });
            this.resultadosTabla = this.resultadosTabla.sort();
            this.resultadosTabla = this.resultadosTabla.reverse();
            if (this.resultadosTabla) {
              Swal.close();
            }
          });
      }

      if (
        this.usuarioLocalStote.typeuser == "3" &&
        this.usuarioLocalStote.indicadorReportes != "todos"
      ) {
        let id = {
          id: this.usuarioLocalStote.usuarioid,
        };
        this.reportesService.IndicadoresAsignados(id).subscribe((res: any) => {
          this.resultadosTabla = res.map((item) => {
            this.estado = res;
            this.resultadoIndicadores = res;
            return item;
          });
          if (this.resultadosTabla) {
            Swal.close();
          }
        });
      }
      return true;
    }
  }

  updateIndicado(idIndicador, usar) {
    if (usar == true) {
      this.indicadorUsar.push(idIndicador);
    }

    if (usar == false) {
      this.indicadorUsar = this.indicadorUsar.filter(
        (item) => item != idIndicador
      );
    }
    //   this.Indicador.IdArchivo = idIndicador;
    //   this.Indicador.Usar = usar;
    //   this.reportesService.UpdateAchivos(this.Indicador).subscribe((res: any) => {
    //     return res;
    //   });

    this.reportesService.reportesUsar.emit(this.indicadorUsar);
  }
}
