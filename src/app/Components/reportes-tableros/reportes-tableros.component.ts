import { Component, OnInit } from '@angular/core';
import { ReportesService } from "./../../services/reportes.service";


@Component({
  selector: 'app-reportes-tableros',
  templateUrl: './reportes-tableros.component.html',
  styleUrls: ['./reportes-tableros.component.scss']
})
export class ReportesTablerosComponent implements OnInit {

  constructor(private reportesService: ReportesService) { }

  usarioLocalStote = JSON.parse(localStorage.getItem("usario"));

  ngOnInit() {
    this.getReportes();
  }

  Reporte = {
    id: 0,
  }

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
      this.reportesService.EliminarReporte(this.Reporte).subscribe((res: any) => {
        if (res.result == "Guardado") {
          alert("Eliminado con exito");
          location.reload();
        }
      });
    }
  }

}
