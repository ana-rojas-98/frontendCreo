import { Component, OnInit } from "@angular/core";
import { ReportesService } from "./../../services/reportes.service";
import { AuthService } from "src/app/services/auth.service";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";

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

  resultadosUsuario = [];
  resultadosCategoria: {};
  resultadoEstandar: {};
  resultadosSubCategoria: {};
  resultadoIndicadores: [];
  resultadosTabla: any = [];
  estado = [];
  variable: any = [
    {
      nombre: "1",
      nombre1: "1",
      nombre2: "1",
    },
  ];

  ngOnInit() {
    this.GetUsuarios(0);
    this.getCategoria(0);
    this.getStandares(0);
    this.getSubCategoria(0);
    this.getindIcadores(0);
  }
  createPDF() {
    let DATA: any = document.getElementById("tableIndicadores");
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL("image/png");
      let PDF = new jsPDF("p", "mm", "a4");
      let position = 0;
      PDF.addImage(FILEURI, "PNG", 0, position, fileWidth, fileHeight);
      PDF.save("Indicadores.pdf");
    });
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
    if (this.Usuario.usuario == "") {
      this.getindIcadores(0);
      return true;
    }

    let dato = parseInt(this.Usuario.usuario);

    this.reportesService
      .ConsultarIndicadoresAsignados()
      .subscribe((res: any) => {
        this.resultadosTabla = res.filter((item) => {
          return item.idUsuario == dato;
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
      this.getindIcadores(0);
      return true;
    }

    let dato = parseInt(this.SubCategoria.subcategoria1);
    this.getindIcadores(dato);

    this.resultadosTabla = this.estado.filter((item) => {
      return item.idSubCategoria == dato;
    });
  }
  
  getIndicadorFilter() {
    if (this.Indicador.idIndicador == "") {
      this.geSubtCategoriaFilter();
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
  getindIcadores(dato) {
    if (dato == 0) {
      this.reportesService
        .ConsultarIndicadoresAsignados()
        .subscribe((res: any) => {
          this.resultadosTabla = res.map((item) => {
            this.estado = res;
            this.resultadoIndicadores = res;
            return item;
          });
        });
      return true;
    }
  }
}
