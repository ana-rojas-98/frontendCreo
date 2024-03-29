import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CargandoService } from "src/app/services/cargando.service";
import Swal from "sweetalert2";
import { ReportesService } from "./../../services/reportes.service";

@Component({
  selector: "app-reportes-tableros",
  templateUrl: "./reportes-tableros.component.html",
  styleUrls: ["./reportes-tableros.component.scss"],
})
export class ReportesTablerosComponent implements OnInit {
  constructor(
    private reportesService: ReportesService,
    public router: Router,
    public cargandoService: CargandoService
  ) { }
  btnCrearReporte = true;
  btnEliminarReporte = true;
  btnVerReporte = true;
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

    if (this.usuarioLocalStote.reportesCrear == false) {
      this.btnCrearReporte = false;
    }
    if (this.usuarioLocalStote.reportesEliminar == false) {
      this.btnEliminarReporte = false;
    }

    if (this.usuarioLocalStote.reportesVer == false) {
      this.btnVerReporte = false;
    }

    if (this.usuarioLocalStote.reportesEditar == false) {
      this.btnEditarReporte = false;
    }

    this.getReportes();
  }

  Reporte = {
    id: 0,
    idUsuarioModifica: this.usuarioLocalStote.usuarioid,
  };

  resultadosTabla = [];

  getReportes() {
    this.cargandoService.ventanaCargando();
    this.reportesService.ConsultaReportes().subscribe((res: any) => {
      res.map((item) => {
        if (
          this.usuarioLocalStote.typeuser == "3" &&
          this.usuarioLocalStote.usuarioid == item.idUsuarioCrea
        ) {
          this.resultadosTabla.push(item);
        } else if (this.usuarioLocalStote.typeuser != "3") {
          this.resultadosTabla.push(item);
        }
      });
      if (this.resultadosTabla) {
        Swal.close();
      }
    });
  }

  eliminar(id) {
    this.Reporte.id = id;
    Swal.fire({
      title: "¿Seguro quiere eliminar el reporte?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.cargandoService.ventanaCargando();
        this.reportesService
          .EliminarReporte(this.Reporte)
          .subscribe((res: any) => {
            if (res.result == "Guardado") {
              Swal.fire("Eliminado con exito");
              location.reload();
            }
          });
      } else if (result.isDenied) {
      }
    });
  }
  
  copiar(id){
    this.Reporte.id = id;
    this.cargandoService.ventanaCargando();
    this.reportesService.DuplicarTablero(this.Reporte).subscribe((res: any) => {
      if (res.result == "Guardado"){
        Swal.fire("Duplicado correctamente");
        location.reload();
      }
    });
  }
}
