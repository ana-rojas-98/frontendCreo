import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ReportesService } from "./../../services/reportes.service";

@Component({
  selector: "app-reportes-tableros",
  templateUrl: "./reportes-tableros.component.html",
  styleUrls: ["./reportes-tableros.component.scss"],
})
export class ReportesTablerosComponent implements OnInit {
  constructor(
    private reportesService: ReportesService,
    public router: Router
  ) {}
  btnCrearReporte = true;
  btnEliminarReporte = true;
  btnVerReportes = true;
  btnEditarReporte = true;
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

    if (
      this.usuarioLocalStote.reportesCrear == false
    ) {
      this.btnCrearReporte = false;
    }
    if (
      this.usuarioLocalStote.reportesEliminar == false
    ) {
      this.btnEliminarReporte = false;
    }

    if (
      this.usuarioLocalStote.reportesVer == false
    ) {
      this.btnVerReportes = false;
    }

    if (
      this.usuarioLocalStote.reportesEditar == false
    ) {
      this.btnEditarReporte = false;
    }

    this.getReportes();
  }

  Reporte = {
    id: 0,
  };

  resultadosTabla = [];

  getReportes() {
    this.reportesService.ConsultaReportes().subscribe((res: any) => {
      res.map((item) => {
        this.resultadosTabla.push(item);
      })
    });
  }

  eliminar(id) {
    this.Reporte.id = id;
    let a = confirm("Seguro quiere eliminar el reporte?");
    if (a == true) {
      this.reportesService
        .EliminarReporte(this.Reporte)
        .subscribe((res: any) => {
          if (res.result == "Guardado") {
            alert("Eliminado con exito");
            location.reload();
          }
        });
    }
  }
}
