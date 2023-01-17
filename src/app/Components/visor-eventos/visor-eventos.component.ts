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
import { CargandoService } from "src/app/services/cargando.service";

@Component({
  selector: "app-visor-eventos",
  templateUrl: "./visor-eventos.component.html",
  styleUrls: ["./visor-eventos.component.scss"],
})
export class VisorEventosComponent implements OnInit {
  [x: string]: any;

  fechaInicial = Date.now().toLocaleString();
  fechaFinal = Date.now().toLocaleString();
  resultadosModulos1 = "";
  resultadosModuloss = [];

  constructor(
    private VisorEventosService: VisorEventosService,
    private reportesService: ReportesService,
    public router: Router,
    public cargandoService: CargandoService
  ) { }

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
    this.fechaInicial;
    this.fechaFinal;
    this.usarioLocalStote = JSON.parse(localStorage.getItem("usario"));
    if (this.usarioLocalStote.visorEventosVer == false) {
      this.router.navigate(["private"]);
      return true;
    }

    this.GetEventos();
    this.GetUsuarios(0);
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

  GetEventos() {
    this.cargandoService.ventanaCargando();
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
      if(this.resultadosTabla){
        Swal.close()
      }
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
      Swal.fire("La fecha inicial debe ser menor a la final");
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
