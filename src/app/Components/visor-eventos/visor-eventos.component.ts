import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbAlert } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { NgModule } from "@angular/core";
import { ReportesService } from "src/app/services/reportes.service";
import { VisorEventosService } from "src/app/services/visor-eventos.service";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import { FormGroup, FormControl } from "@angular/forms";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-visor-eventos",
  templateUrl: "./visor-eventos.component.html",
  styleUrls: ["./visor-eventos.component.scss"],
})
export class VisorEventosComponent implements OnInit {
  [x: string]: any;

  fechaInicial = "2022-11-16";
  fechaFinal = "2022-11-16";
  resultadosModulos1 = "";
  resultadosModuloss = [];

  constructor(
    private VisorEventosService: VisorEventosService,
    private reportesService: ReportesService,
    public router: Router
  ) {}

  resultadosTabla = [];
  resultadosTabla2 = [];
  resultadosUsuario = [];
  resultadosModulos: any;
  usarioLocalStote = JSON.parse(localStorage.getItem("usario"));

  resultadosModulo = {
    modulo: "",
  };

  fileName = "Visor de eventos.xlsx";

  Usuario = {
    usuario: "",
  };

  ngOnInit() {
    this.fechaInicial = "2022-11-16";
    this.fechaFinal = "2022-11-16";

    if (this.usarioLocalStote.visorEventos = false) {
      this.router.navigate(["private"]);
      return true;
    }

    this.GetEventos();
    this.GetUsuarios(0);
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
      PDF.save("Visor de eventos.pdf");
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

  GetEventos() {
    this.VisorEventosService.GetEventos().subscribe((res: any) => {
      this.resultadosTabla = res.map((item) => {
        this.resultadosModuloss.push(item.modulo);
        return item;
      });
      this.resultadosTabla = this.resultadosTabla.sort();
      this.resultadosTabla = this.resultadosTabla.reverse();
      this.resultadosTabla2 = this.resultadosTabla;
      this.resultadosModulos = new Set(this.resultadosModuloss);
      this.resultadosModulos = [...this.resultadosModulos];
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

  moduloFilter() {
    this.resultadosTabla = this.resultadosTabla2.filter((fecha) => {
      return (
        Date.parse(fecha.fecha2) >= Date.parse(this.fechaInicial) &&
        Date.parse(fecha.fecha2) <= Date.parse(this.fechaFinal)
      );
    });
    if (this.Usuario.usuario == "" && this.resultadosModulo.modulo == "") {
      this.changeFecha();
    } else if (this.Usuario.usuario != "") {
      if (this.resultadosModulo.modulo != "") {
        this.resultadosTabla = this.resultadosTabla.filter(
          (item) =>
            item.modulo == this.resultadosModulo.modulo &&
            item.idusuario == this.Usuario.usuario
        );
      } else {
        this.resultadosTabla = this.resultadosTabla.filter(
          (item) => item.idusuario == this.Usuario.usuario
        );
      }
    } else {
      this.resultadosTabla = this.resultadosTabla.filter(
        (item) => item.modulo == this.resultadosModulo.modulo
      );
    }
  }

  usuarioFilter() {
    this.resultadosTabla = this.resultadosTabla2.filter((fecha) => {
      return (
        Date.parse(fecha.fecha2) >= Date.parse(this.fechaInicial) &&
        Date.parse(fecha.fecha2) <= Date.parse(this.fechaFinal)
      );
    });
    if (this.Usuario.usuario == "" && this.resultadosModulo.modulo == "") {
      this.changeFecha();
    } else if (this.resultadosModulo.modulo != "") {
      if (this.Usuario.usuario != "") {
        this.resultadosTabla = this.resultadosTabla.filter(
          (item) =>
            item.modulo == this.resultadosModulo.modulo &&
            item.idusuario == this.Usuario.usuario
        );
      } else {
        this.resultadosTabla = this.resultadosTabla.filter(
          (item) => item.modulo == this.resultadosModulo.modulo
        );
      }
    } else {
      this.resultadosTabla = this.resultadosTabla.filter(
        (item) => item.idusuario == this.Usuario.usuario
      );
    }
  }

  changeFecha() {
    if (this.fechaFinal < this.fechaInicial) {
      alert("La fecha inicial debe ser mayor a la final");
      this.fechaFinal = this.fechaInicial;
    }
    this.resultadosTabla = this.resultadosTabla2.filter((fecha) => {
      return (
        Date.parse(fecha.fecha2) >= Date.parse(this.fechaInicial) &&
        Date.parse(fecha.fecha2) <= Date.parse(this.fechaFinal)
      );
    });
    if (this.Usuario.usuario != "") {
      this.resultadosTabla = this.resultadosTabla.filter(
        (item) =>
          item.modulo == this.resultadosModulo.modulo &&
          item.idusuario == this.Usuario.usuario
      );
    }
    if (this.resultadosModulo.modulo != "") {
      this.resultadosTabla = this.resultadosTabla.filter(
        (item) =>
          item.modulo == this.resultadosModulo.modulo &&
          item.idusuario == this.Usuario.usuario
      );
    }
  }
}
