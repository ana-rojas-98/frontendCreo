import Swal from "sweetalert2";
import { Component, OnInit } from "@angular/core";
import { ReportesService } from "./../../services/reportes.service";
import { AuthService } from "src/app/services/auth.service";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import { IndicadoresService } from "src/app/services/indicadores.service";
import { Router } from "@angular/router";
import { CargandoService } from "src/app/services/cargando.service";

@Component({
  selector: "app-reportes-indicadores",
  templateUrl: "./reportes-indicadores.component.html",
  styleUrls: ["./reportes-indicadores.component.scss"],
})
export class ReportesIndicadoresComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private reportesService: ReportesService,
    private indicadoresservice: IndicadoresService,
    public router: Router,
    public cargandoService: CargandoService
  ) { }

  title = "angular-app";
  fileName = "Indicadores.xlsx";

  Estandar = {
    estandar: "",
  };
  Indicador = {
    idIndicador: "",
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

  resultadosUsuario: any = [];
  resultadosCategoria: any = [];
  resultadoEstandar: any = [];
  resultadosSubCategoria: any = [];
  resultadoIndicadores: any = [];
  resultadosTabla: any = [];
  estado: any = [];
  variable: any = [
    {
      nombre: "1",
      nombre1: "1",
      nombre2: "1",
    },
  ];

  usuarioLocalStote = JSON.parse(localStorage.getItem("usario"));
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
      return this.router.navigate(["reportes"]);
    }

    this.GetUsuarios(0);
    this.getCategoria(0);
    this.getStandares(0);
    this.getSubCategoria(0);
    this.getindIcadores(0);
  }
  createPDF() {
    var sTable = document.getElementById("tableIndicadores").innerHTML;
    // CREATE A WINDOW OBJECT.
    var win = window.open("", "", "height=700,width=700");
    win.document.write("<html><head>"); // <title> FOR PDF HEADER.       // ADD STYLE INSIDE THE HEAD TAG.
    win.document.write("</head>");
    win.document.write("<body>");
    win.document.write(sTable); // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write("</body></html>");
    win.document.close(); // CLOSE THE CURRENT WINDOW.
    win.print(); // PRINT THE CONTENTS.
  }

  downloadExcel() {
    {
      /* pass here the table id */
      let element = document.getElementById("tableIndicadores");
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      /* save to file */
      XLSX.writeFile(wb, this.fileName);
    }
  }

  getUsuarioFilter() {
    let dato = parseInt(this.Usuario.usuario);
    if (this.Usuario.usuario == "") {
      this.getindIcadores(0);
      return true;
    }

    if (
      this.usuarioLocalStote.typeuser == "3" &&
      this.usuarioLocalStote.indicadorReportes == "asignados"
    ) {
      let id = {
        id: this.usuarioLocalStote.usuarioid,
      };
      this.reportesService.IndicadoresAsignados(id).subscribe((res: any) => {
        this.resultadosTabla = res.filter((item) => {
          return item.iidUsuarioModifica == dato;
        });
      });
      if (this.resultadosTabla) {
        Swal.close();
      }
      return true;
    }

    this.reportesService
      .ConsultarIndicadoresAsignados()
      .subscribe((res: any) => {
        this.resultadosTabla = res.filter((item) => {
          return item.iidUsuarioModifica == dato;
        });
        this.estado = this.resultadosTabla;
      });
  }

  getEstandarFilter() {
    if (this.Estandar.estandar == "") {
      this.getUsuarioFilter();
      return true;
    }
    let dato = parseInt(this.Estandar.estandar);
    this.getCategoria(dato);

    if (
      this.usuarioLocalStote.typeuser == "3" &&
      this.usuarioLocalStote.indicadorReportes == "asignados"
    ) {
      let id = {
        id: this.usuarioLocalStote.usuarioid,
      };
      this.reportesService.IndicadoresAsignados(id).subscribe((res: any) => {
        this.resultadosTabla = res.filter((item) => {
          return item.idEstandar == dato;
        });
      });
      if (this.resultadosTabla) {
        Swal.close();
      }
      return true;
    }

    this.resultadosTabla = this.estado.filter((item) => {
      return item.idEstandar == dato;
    });
    this.resultadosTabla = this.resultadosTabla.sort();
    this.resultadosTabla = this.resultadosTabla.reverse();
  }

  getCategoriaFilter() {
    if (this.Categoria.categoria1 == "") {
      this.getEstandarFilter();
      this.getSubCategoria(0);
      return true;
    }

    let dato = parseInt(this.Categoria.categoria1);
    this.getSubCategoria(dato);

    if (
      this.usuarioLocalStote.typeuser == "3" &&
      this.usuarioLocalStote.indicadorReportes == "asignados"
    ) {
      let id = {
        id: this.usuarioLocalStote.usuarioid,
      };
      this.reportesService.IndicadoresAsignados(id).subscribe((res: any) => {
        this.resultadosTabla = res.filter((item) => {
          return item.idCategoria == dato;
        });
      });
      if (this.resultadosTabla) {
        Swal.close();
      }
      return true;
    }

    this.resultadosTabla = this.estado.filter((item) => {
      return item.idCategoria == dato;
    });
  }

  geSubtCategoriaFilter() {
    if (this.SubCategoria.subcategoria1 == "") {
      this.getCategoriaFilter();
      this.getindIcadores(0);
      return true;
    }

    let dato = parseInt(this.SubCategoria.subcategoria1);
    this.getindIcadores(dato);

    if (
      this.usuarioLocalStote.typeuser == "3" &&
      this.usuarioLocalStote.indicadorReportes == "asignados"
    ) {
      let id = {
        id: this.usuarioLocalStote.usuarioid,
      };
      this.reportesService.IndicadoresAsignados(id).subscribe((res: any) => {
        this.resultadosTabla = res.filter((item) => {
          return item.idSubCategoria == dato;
        });
      });
      if (this.resultadosTabla) {
        Swal.close();
      }
      return true;
    }

    this.resultadosTabla = this.estado.filter((item) => {
      return item.idSubCategoria == dato;
    });
  }

  getIndicadorFilter() {
    if (this.Indicador.idIndicador == "") {
      this.geSubtCategoriaFilter();
      return true;
    }

    if (
      this.usuarioLocalStote.typeuser == "3" &&
      this.usuarioLocalStote.indicadorReportes == "asignados"
    ) {
      let id = {
        id: this.usuarioLocalStote.usuarioid,
      };
      this.reportesService.IndicadoresAsignados(id).subscribe((res: any) => {
        this.resultadosTabla = res.filter((item) => {
          return item.idIndicador == parseInt(this.Indicador.idIndicador);
        });
      });
      if (this.resultadosTabla) {
        Swal.close();
      }
      return true;
    }

    this.resultadosTabla = this.estado.filter((item) => {
      return item.idIndicador == parseInt(this.Indicador.idIndicador);
    });
  }

  GetUsuarios(dato) {
    if (dato == 0) {
      this.reportesService.GetUsuarios().subscribe((res: any) => {
        this.resultadosUsuario = res.map((item) => {
          return item;
        });
      });
    }
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

  contadorCargando = 0;
  getindIcadores(dato) {
    if (this.contadorCargando == 0) {
      this.cargandoService.ventanaCargando();
      this.contadorCargando++;
    }
    if (
      this.usuarioLocalStote.typeuser != "3" ||
      this.usuarioLocalStote.indicadorReportes == "todos"
    ) {
      if (dato == 0) {
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
        return true;
      }
    }
    if (this.usuarioLocalStote.typeuser == "3") {
      let id = {
        id: this.usuarioLocalStote.usuarioid,
      };
      this.reportesService.IndicadoresAsignados(id).subscribe((res: any) => {
        this.resultadoIndicadores = res;
        this.resultadosTabla = res.map((item) => {
          return item;
        });
      });
      if (this.resultadosTabla) {
        Swal.close();
      }
      return true;
    }
  }

  DescargarTodosAdjuntos() {
    this.indicadoresservice.DescargarTodosAdjuntos(this.usuarioLocalStote.usuarioid).subscribe((res) => {
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
