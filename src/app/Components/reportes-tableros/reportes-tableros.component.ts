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

  resultadosTabla = [];

  getReportes(){
    this.reportesService.ConsultaReportes().subscribe((res: any) => {
      res.map((item) => {
        
        this.resultadosTabla.push(item);
      })
    console.log("Resultados: ", this.resultadosTabla);
  });  
  }

}
