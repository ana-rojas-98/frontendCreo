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
  ) {}
  usuarioLocalStote = JSON.parse(localStorage.getItem("usario"));
  mostrar = false;
  resultadosTabla: any = [];
  resultados: any = [];
  indicadores: any = [];
  avance: any = [];

  ngOnInit() {
    this.authService.enviarCorreos().subscribe((res: any) => {});
    this.authService.enviarCorreosIndicadores().subscribe((res: any) => {});
<<<<<<< HEAD
    if (this.usuarioLocalStote.typeuser == "1") {
=======

    if (this.usarioLocalStote.typeuser == "1") {
>>>>>>> ceadb6dfea2e5d4e0502d26b5207e9f4031e46c7
      this.mostrar = true;
    } else if (this.usuarioLocalStote.typeuser == "2") {
      this.mostrar = true;
    } else if (this.usuarioLocalStote.typeuser == "3") {
      this.mostrar = false;
    }

    this.pantallaPrin();
  }

  activos = 0;
  inactivos = 0;
  total = 0;
  completados = 0;
  faltantes = 0;
  totales = 0;

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
<<<<<<< HEAD
    console.log("array que trae", this.resultadosTabla);
    if (this.usuarioLocalStote.typeuser == "3") {
=======

    if (this.usarioLocalStote.typeuser == "3") {
>>>>>>> ceadb6dfea2e5d4e0502d26b5207e9f4031e46c7
      let id = {
        id: this.usuarioLocalStote.usuarioid,
      };
      this.reportesService.IndicadoresAsignados(id).subscribe((res: any) => {
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
