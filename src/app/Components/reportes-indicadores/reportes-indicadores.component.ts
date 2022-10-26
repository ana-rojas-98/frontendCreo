import { Component, OnInit } from "@angular/core";
import { ReportesService } from "./../../services/reportes.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-reportes-indicadores",
  templateUrl: "./reportes-indicadores.component.html",
  styleUrls: ["./reportes-indicadores.component.scss"],
})
export class ReportesIndicadoresComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private reportesService: ReportesService
  ) {}

  Estandar = {
    estandar: "",
  };

  Usuario = {
    usuario: "",
  };

  Categoria = {
    categoria1: "",
    NombreCategoria: "",
  };

  SubCategoria = {
    subcategoria1: "",
    nombreSubcategoria: "",
  };

  resultadosUsuario: {};
  resultadosCategoria: {};
  resultadoEstandar: {};
  resultadosSubCategoria: {};
  resultadoIndicadores: [];
  resultadosTabla= [];
  estado = [];

  ngOnInit() {
    this.GetUsuarios();
    this.getCategoria();
    this.getStandares();
    this.getSubCategoria();
    this.getindIcadores();
  }

  getUsuarioFilter() {
    if (this.Usuario.usuario == "") {
      this.getindIcadores();
      return true;
    }

    this.reportesService
      .ConsultarIndicadoresAsignados()
      .subscribe((res: any) => {
        this.resultadosTabla = res.filter((item) => {
          return item.idUsuario == parseInt(this.Usuario.usuario);
        });
        this.estado = this.resultadosTabla;
      });
  }

  getEstandarFilter() {
    if (this.Estandar.estandar == "") {
      this.getUsuarioFilter();
      return true;
    }

    // this.resultadosTabla = this.estado.filter((item) => {
    //   return item.estado == parseInt(this.estadoSelecionado.id);
    // });

  }

  getCategoriaFilter() {
    if (this.Categoria.categoria1 == "") {
      this.getEstandarFilter();
      return true;
    }
    this.getEstandarFilter();
    if (
      this.Usuario.usuario != "" &&
      this.Estandar.estandar != "" &&
      this.Categoria.categoria1 != ""
    ) {
      this.reportesService
        .ConsultarIndicadoresAsignados()
        .subscribe((res: any) => {
          this.resultadosTabla = res.filter((item) => {
            return (
              item.idUsuario == parseInt(this.Usuario.usuario) &&
              item.idEstandar == parseInt(this.Estandar.estandar) &&
              item.idCategoria == parseInt(this.Categoria.categoria1)
            );
          });
        });
    }
  }

  GetUsuarios() {
    this.reportesService.GetUsuarios().subscribe((res: any) => {
      this.resultadosUsuario = res.map((item) => {
        return item;
      });
    });
  }

  getStandares() {
    this.authService.getStandares("").subscribe((res: any) => {
      this.resultadoEstandar = res.map((item) => {
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
    this.reportesService
      .ConsultarIndicadoresAsignados()
      .subscribe((res: any) => {
        this.resultadosTabla = res.map((item) => {
          this.resultadoIndicadores = res;
          return item;
        });
      });
  }
}
