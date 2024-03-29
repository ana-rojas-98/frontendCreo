import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IndicadoresService } from "src/app/services/indicadores.service";
import { ReportesService } from "src/app/services/reportes.service";
import Swal from "sweetalert2";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-archivos-adjuntos",
  templateUrl: "./archivos-adjuntos.component.html",
  styleUrls: ["./archivos-adjuntos.component.scss"],
})
export class ArchivosAdjuntosComponent implements OnInit {
  usarioLocalStote: any;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    public router: Router,
    private indicadoresservice: IndicadoresService,
    private reportesService: ReportesService
  ) { }

  archivos: File = null;
  archivoCapturado: File;

  resultadosIndicador = {};

  id = 0;
  resultadosTabla = {};

  nombreArchivo = "";

  Adjunto = {
    idArchivo: 0,
  };

  Adjunto2 = {
    idArchivo: 0,
  };

  ngOnInit() {
    this.authService.enviarCorreos().subscribe((res: any) => { });
    this.authService.enviarCorreosIndicadores().subscribe((res: any) => { });

    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.usarioLocalStote = JSON.parse(localStorage.getItem("usario"));
    this.Adjunto.idArchivo = this.id;
    this.getAdjuntos();
    this.getIndicadoresFilter();
  }

  descargarArchivo(id, url) {
    this.indicadoresservice.descarga(id).subscribe((res) => {
      let nombreArchivo = res.headers.get("content-disposition");
      let tipo: Blob = res.body as Blob;
      let a = document.createElement("a");
      a.download = url;
      a.href = window.URL.createObjectURL(tipo);
      a.click();
    });
  }

  getAdjuntos() {
    this.indicadoresservice
      .ObtenerAdjuntos(this.Adjunto)
      .subscribe((res: any) => {
        this.resultadosTabla = res.map((item) => {
          return item;
        });
      });
  }

  alert(mensaje) {
    Swal.fire(mensaje);
  }

  getIndicadoresFilter() {
    if (
      this.usarioLocalStote.typeuser == "3" &&
      this.usarioLocalStote.indicadorReportes == "asignados"
    ) {
      let id = {
        id: this.usarioLocalStote.usuarioid,
      };
      this.reportesService.IndicadoresAsignados(id).subscribe((res: any) => {
        let result = res.filter((item) => {
          return item.idIndicador == this.id;
        });
        if (result.length == 0) {
          this.router.navigate(["private"]);
        }
      });
    }

    this.reportesService
      .ConsultarIndicadoresAsignados()
      .subscribe((res: any) => {
        this.resultadosIndicador = res.filter(
          (item) => item.idIndicador == this.id
        );
        this.nombreArchivo = this.resultadosIndicador[0].indicador;
      });
  }

  archivoCapt(event) {
    this.archivoCapturado = event.target.files[0];
    if (this.archivoCapturado.size <= 10419200) {
      this.archivos = this.archivoCapturado;
      if (this.archivos != null) {
        const formData = new FormData();
        formData.append("Archivo", this.archivos);
        formData.append("Nombre", this.nombreArchivo);
        formData.append("idArchivo", this.id.toString());
        formData.append(
          "Extension",
          this.archivos.name.toString().split(".").pop()
        );
        this.usarioLocalStote = JSON.parse(localStorage.getItem("usario"));
        let Usuarioid = this.usarioLocalStote.usuarioid;
        formData.append("UsuarioID", Usuarioid);
        this.indicadoresservice
          .GuardarAdjunto(formData)
          .subscribe((res: any) => {
            if (res.resul == "Se guardo con exito") {
              this.alert("Archivo adjunto guardado");
              location.reload();
            }
            return res;
          });
      }
    } else {
      Swal.fire("el archivo supera el tamaño permitido");
    }
  }

  EliminarArchivo(id) {
    Swal.fire({
      title: "¿Está seguro que desea borrar el archivo adjunto?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.Adjunto2.idArchivo = id;
        this.indicadoresservice
          .EliminarArchivo(this.Adjunto2)
          .subscribe((res: any) => {
            if (res.resul == "Se guardo con exito") {
              this.alert("Archivo adjunto eliminado");
              location.reload();
            }
            return res;
          });
      } else if (result.isDenied) {
      }
    });
  }

  DescargarTodosAdjuntosIndividual() {
    this.indicadoresservice
      .DescargarTodosAdjuntosIndividual(this.Adjunto.idArchivo)
      .subscribe((res: any) => {
        let nombreArchivo = res.headers.get("content-disposition");
        let tipo: Blob = res.body as Blob;
        let a = document.createElement("a");
        a.download = "TodosAdjuntos";
        a.href = window.URL.createObjectURL(tipo);
        a.click();
      });
  }
}
