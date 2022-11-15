import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { ReportesService } from "./../../services/reportes.service";
import { FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-administrar-indicadores",
  templateUrl: "./administrar-indicadores.component.html",
  styleUrls: ["./administrar-indicadores.component.scss"],
})
export class AdministrarIndicadoresComponent implements OnInit {
  constructor(
    private authService: AuthService,
    public router: Router,
    private reportesService: ReportesService
  ) { }

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

  indicador = {
    id: 0,
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
  crear = false;
  ver = false;
  editar = false;
  eliminar = false;
  tablaIndicadores = {};
  resultado: any = [];

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
    this.authService.enviarCorreos().subscribe((res: any) => { });
    this.authService.enviarCorreosIndicadores().subscribe((res: any) => { });

    let usarioLocalStote = JSON.parse(localStorage.getItem("usario"));

    if (usarioLocalStote.typeuser == "3") {
      this.router.navigate(["private"]);
      return true;
    }
    if (usarioLocalStote.indicadorCrear == true) {
      this.crear = true;
    }
    if (usarioLocalStote.indicadorVer == true) {
      this.ver = true;
    }
    if (usarioLocalStote.indicadorEditar == true) {
      this.editar = true;
    }
    if (usarioLocalStote.indicadorEliminar == true) {
      this.eliminar = true;
    }
    this.getStandares();
    this.administrarIndicadores();
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
        (item) => item.nombreEstandar == estandar
      );
    });
  }

  getSubCategoria(categoria) {
    this.authService.getSubCategoria("").subscribe((res: any) => {
      this.resultadosSubCategoria = res.filter(
        (item) => item.idCategoria == categoria
      );
    });
  }

  // getIndicadoresFilter() {
  //   this.reportesService
  //     .ConsultarIndicadoresAsignados()
  //     .subscribe((res: any) => {
  //       this.resultado = res.filter(
  //         (item) => (item.idCategoria == this.Categoria.value || item.idEstandar == this.Estandar.value || item.idSubCategoria == this.Subcategoria.value)
  //       );
  //     });
  // }

  administrarIndicadores() {
    this.authService.tablaAdminIndicadores().subscribe((registro: any) => {
      this.tablaIndicadores = registro.map((item) => {
        return item;
      });
    });
  }

  Eliminar(id2) {
    let a = confirm("¿Está seguro que desea borrar el indicador?");
    if (a) {
      this.indicador.id = id2;
      this.authService.Eliminar(this.indicador).subscribe((res: any) => {
        if (res.resul == "ok") {
          this.alerta("Eliminado correctamente");
          this.administrarIndicadores();
        }
        return res;
      });
    }

  }

  DuplicarIndicador(id2) {
    this.indicador.id = id2;
    this.authService.DuplicarIndicador(this.indicador).subscribe((res: any) => {
      if (res.resul == "ok") {
        this.alerta("Eliminado correctamente");
        this.administrarIndicadores();
      }
      return res;
    });
  }

  alerta(mensaje: any) {
    Swal.fire(mensaje);
  }
}
