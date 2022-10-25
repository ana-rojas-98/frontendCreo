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

  resultadosUsuario: {};
  resultadosCategoria: {};
  resultadoEstandar: {};
  resultadosSubCategoria: {};
  resultadoIndicadores: {};

  ngOnInit() {
    this.GetUsuarios();
    this.getCategoria();
    this.getStandares();
    this.getSubCategoria();
    this.getindIcadores();
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
    this.reportesService.ConsultarIndicadoresAsignados().subscribe((res: any) => {
      this.resultadoIndicadores = res.map((item) => {
        return item;
      });
    });
  }
}
