import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbAlert } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { ReportesService } from "src/app/services/reportes.service";
import { VisorEventosService } from "src/app/services/visor-eventos.service";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import { FormGroup, FormControl } from "@angular/forms";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: "app-visor-eventos",
  templateUrl: "./visor-eventos.component.html",
  styleUrls: ["./visor-eventos.component.scss"],
})
export class VisorEventosComponent implements OnInit {
  constructor(
    private VisorEventosService: VisorEventosService,
    public router: Router,
    private reportesService: ReportesService
  ) {}

  resultadosTabla = [];
  resultadosUsuario = [];
  resultadosModulos = [];

  fileName = "Visor de eventos.xlsx";

  Usuario = {
    usuario: "",
  };

  ngOnInit() {
    let usarioLocalStote = JSON.parse(localStorage.getItem("usario"));
    if (usarioLocalStote.visorEventosVer != true) {
      this.router.navigate(["private"])
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
        this.resultadosModulos.push(item.modulo);
        return item;
      });
      this.resultadosTabla = this.resultadosTabla.sort();
      this.resultadosTabla = this.resultadosTabla.reverse();
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
}
