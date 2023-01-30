import { Component, OnInit } from "@angular/core";
import { ReportesService } from "./../../services/reportes.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-private",
  templateUrl: "./private.component.html",
  styleUrls: ["./private.component.scss"],
})
export class PrivateComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private reportesService: ReportesService
  ) { }
  usuarioLocalStote = JSON.parse(localStorage.getItem("usario"));
  mostrar = false;
  resultadosTabla: any = [];
  resultadosTablaIndicadores: any = [];
  resultados: any = [];
  indicadores: any = [];
  avance: any = [];

  indicadoresResultados = [];

  ngOnInit() {
    this.authService.enviarCorreos().subscribe((res: any) => { });
    this.authService.enviarCorreosIndicadores().subscribe((res: any) => { });
    if (this.usuarioLocalStote.typeuser == "1") {
      this.mostrar = true;
    } else if (this.usuarioLocalStote.typeuser == "2") {
      this.mostrar = true;
    } else if (this.usuarioLocalStote.typeuser == "3") {
      this.mostrar = false;
    }

    this.pantallaPrin();
    this.getReportes();
  }

  activos = 0;
  inactivos = 0;
  total = 0;
  completados = 0;
  faltantes = 0;
  totales = 0;

  getReportes() {
    this.reportesService.ConsultaReportes().subscribe((res: any) => {
      res.map((item) => {
        if (this.usuarioLocalStote.typeuser == '3' && this.usuarioLocalStote.usuarioid == item.idUsuarioCrea) {
          this.resultadosTablaIndicadores.push(item);
        }
        else if (this.usuarioLocalStote.typeuser != '3') {
          this.resultadosTablaIndicadores.push(item);
        }
      })
      this.resultadosTablaIndicadores = this.resultadosTablaIndicadores.filter(item => item.finalizado == true);
      if (this.usuarioLocalStote.indicadorReportes != "todos" && this.usuarioLocalStote.typeuser == 3) {
      this.resultadosTablaIndicadores = this.resultadosTablaIndicadores.filter(item => item.idUsuarioCrea == this.usuarioLocalStote.usuarioid);
      }
    });
  }

  pantallaPrin() {
    this.authService.getUsuarios("").subscribe((res: any) => {
      this.resultados = res.map((item) => {
        this.resultadosTabla.push(item);

        if (item.estado == "1") {
          this.activos++;
        } else if (item.estado == "0") {
          this.inactivos++;
        }
      });

      this.total = this.activos + this.inactivos;
    });
    if (this.usuarioLocalStote.typeuser == "3") {
      let id = {
        id: this.usuarioLocalStote.usuarioid,
      };
      this.reportesService.IndicadoresAsignados(id).subscribe((res: any) => {
        this.indicadores = res.map((item) => {
          this.indicadoresResultados.push(item);
          if (item.avance == 100) {
            this.completados++;
          } else if (item.avance >= 0 && item.avance < 100) {
            this.faltantes++;
          }
        });
        this.totales = this.completados + this.faltantes;
      });
    }

    if (this.usuarioLocalStote.typeuser != "3") {
      this.reportesService
        .ConsultarIndicadoresAsignados()
        .subscribe((res: any) => {
          this.indicadores = res.map((item) => {
            if (item.avance == 100) {
              this.completados++;
            } else if (item.avance >= 0 && item.avance < 100) {
              this.faltantes++;
            }
          });
          this.totales = this.completados + this.faltantes;
        });
    }
  }
}
