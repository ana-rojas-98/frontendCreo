import { Component, OnInit } from "@angular/core";
import { ReportesService } from "./../../services/reportes.service";
import { AuthService } from "src/app/services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-indicadores",
  templateUrl: "./indicadores.component.html",
  styleUrls: ["./indicadores.component.scss"],
})
export class IndicadoresComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private reportesService: ReportesService,
    
  ) {}

  resultadosTabla = [];
  

  ngOnInit() {
    
    this.getindIcadores();
  }

  getindIcadores() {
    this.reportesService
      .ConsultarIndicadoresAsignados()
      .subscribe((res: any) => {
        this.resultadosTabla = res.map((item) => {
          return item;
        });
      });
  }
}
