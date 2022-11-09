import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { timeStamp } from "console";
import { IndicadoresService } from "src/app/services/indicadores.service";
import { ReportesService } from "src/app/services/reportes.service";
import Swal from "sweetalert2";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";


@Component({
  selector: "app-diligenciar-indicador",
  templateUrl: "./diligenciar-indicador.component.html",
  styleUrls: ["./diligenciar-indicador.component.scss"],
})
export class DiligenciarIndicadorComponent implements OnInit {
  constructor(private route: ActivatedRoute, public router: Router, private indicadoresservice: IndicadoresService, private reportesService: ReportesService,) { }
  id = 0;
  accionVerModificar = "";
  modificar = false;
  ver = false;
  resultadosTabla = [];
  anioArray = [];
  preciodicidadesArray = [];
  uniqueYears = [];
  uniquePeriod = [];
  resultadosHTML = [];
  Respuestas = [];
  prueba = "";
  el: any;

  Anio: "";
  Periodo = "";

  idArchivo = {
    idArchivo: 1,
  };

  nombreArchivo = "";
  idDeArchivo = "";

  archivos: File = null;
  archivoCapturado: File;

  resultadosIndicador = {};

  Valores = {
    idFormato: 0,
    idFila: 0,
    valor: "",
    html: "",
    idArchivo: 0,
    periodicidad: "",
    anio: 0,
  };

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.accionVerModificar = this.route.snapshot.paramMap.get("accion");
    if (this.accionVerModificar == "ver") {
      this.ver = true;
      document.getElementById("Guardar").style.display = "none";
      document.getElementById("Finalizar").style.display = "none";
      document.getElementById("Archivo").style.display = "none";
    }
    if (this.accionVerModificar == "editar") {
      this.modificar = true;
    }
    this.idArchivo.idArchivo = this.id;
    this.VerDiligenciarIndicador();
    this.getIndicadoresFilter();
  }

  filtrarInfo() {
    this.uniqueYears = [...new Set(this.anioArray)];
    this.uniquePeriod = [...new Set(this.preciodicidadesArray)];
    this.Anio = this.uniqueYears[this.uniqueYears.length - 1];
    this.Periodo = this.uniquePeriod[this.uniquePeriod.length - 1];
    this.ChangeAnio();
  }

  VerDiligenciarIndicador() {
    this.indicadoresservice.VerDiligenciarIndicador(this.idArchivo).subscribe((res: any) => {
      this.resultadosTabla = res.map((item) => {
        this.anioArray.push(item.anio);
        this.preciodicidadesArray.push(item.periodicidad);
        return item;
      });
      this.idDeArchivo = this.resultadosTabla[0].idArchivo;
      this.filtrarInfo();
    });
  }

  ChangePeriodo() {
    this.prueba = "";
    if (this.Anio != '') {
      if (this.Periodo != '') {
        this.resultadosHTML = this.resultadosTabla.filter(an => an.anio == this.Anio);
        this.resultadosHTML = this.resultadosHTML.filter(pe => pe.periodicidad == this.Periodo);
        this.resultadosHTML.forEach(item => (this.prueba += item.html, this.Respuestas.push(item.valor)));
      }
      else {
        this.prueba = "No se encuentra resultados";
      }
    } else {
      this.prueba = "No se encuentra resultados";
    }
    document.getElementById('prueba').innerHTML = this.prueba;
    console.log(this.prueba);
    console.log('Respuestas', this.Respuestas);
  }

  ChangeAnio() {
    this.prueba = "";
    this.Respuestas = [];
    if (this.Anio != '') {
      if (this.Periodo != '') {
        this.resultadosHTML = this.resultadosTabla.filter(an => an.anio == this.Anio);
        this.resultadosHTML = this.resultadosHTML.filter(pe => pe.periodicidad == this.Periodo);
        let i = 2;
        this.resultadosHTML.forEach(item => (
          this.prueba += item.html,
          this.Respuestas.push(item.valor)
        ));
      }
      else {
        this.prueba = "No se encuentra resultados";
      }
    } else {
      this.prueba = "No se encuentra resultados";
    }
    document.getElementById('prueba').innerHTML = this.prueba;
    let contents = document.getElementById('prueba').innerHTML;
    document.getElementById('prueba').innerHTML = contents;
  }

  getIndicadoresFilter() {
    this.reportesService.ConsultarIndicadoresAsignados().subscribe((res: any) => {
      this.resultadosIndicador = res.filter((item) => (item.idIndicador == this.id));
    });
    this.nombreArchivo = this.resultadosIndicador[0].indicador;
  }

  fnGuardar() {
    this.getIndicadoresFilter();
    if (this.archivos != null) {
      const formData = new FormData();
      formData.append("Archivo", this.archivos);
      formData.append("Nombre", this.nombreArchivo);
      formData.append("idArchivo", this.idDeArchivo);
      formData.append("Extension", this.archivos.name.toString().split('.').pop());
      this.indicadoresservice.GuardarAdjunto(formData).subscribe((res: any) => {
        if (res.resul == "Se guardo con exito") {
          this.alert("Archivo adjunto guardado");
        }
        return res;
      });
    }
    if (this.Anio == "" || this.Anio == null || this.Periodo == "" || this.Periodo == null) {
      this.alert("Debe seleccionar año y periodo antes de guardar");
    }
    else {
      this.resultadosHTML = this.resultadosTabla.filter(an => an.anio == this.Anio);
      this.resultadosHTML = this.resultadosHTML.filter(pe => pe.periodicidad == this.Periodo);
      let i = 0;
      var contents;
      let contenidos = [];
      this.resultadosHTML.map(item => (
        contents = document.getElementById((item.idFila - 1).toString()),
        item.valor = contents.value,
        contenidos.push(item),
        i++
      ));
      this.indicadoresservice.GuardarRespuestasIndicador(contenidos).subscribe((res: any) => {
        if (res.resul == "Se guardo con exito") {
          this.alert("Respuestas guardadas");
          location.reload();
        }
        return res;
      });
    }
  }

  fnFinalizar() {
    this.getIndicadoresFilter();
    let a = confirm("¿Está seguro que ya finalizó este indicador?")
    if (a == true) {
      if (this.archivos != null) {
        const formData = new FormData();
        formData.append("Archivo", this.archivos);
        formData.append("Nombre", this.nombreArchivo);
        formData.append("idArchivo", this.idDeArchivo);
        formData.append("Extension", this.archivos.name.toString().split('.').pop())
        this.indicadoresservice.GuardarAdjunto(formData).subscribe((res: any) => {
          if (res.resul == "Se guardo con exito") {
            this.alert("Archivo adjunto guardado");
          }
          return res;
        });
      }
      if (this.Anio == "" || this.Anio == null || this.Periodo == "" || this.Periodo == null) {
        this.alert("Debe seleccionar año y periodo antes de guardar");
      }
      else {
        this.resultadosHTML = this.resultadosTabla.filter(an => an.anio == this.Anio);
        this.resultadosHTML = this.resultadosHTML.filter(pe => pe.periodicidad == this.Periodo);
        let i = 0;
        var contents;
        let contenidos = [];
        this.resultadosHTML.map(item => (
          contents = document.getElementById((item.idFila - 1).toString()),
          item.valor = contents.value,
          contenidos.push(item),
          i++
        ));
        this.indicadoresservice.FinalizarIndicador(contenidos).subscribe((res: any) => {
          if (res.resul == "Se guardo con exito") {
            this.alert("Respuestas guardadas");
            location.reload();
          }
          return res;
        });
      }
    }
  }

  archivoCapt(event) {
    this.archivoCapturado = event.target.files[0];
    this.archivos = this.archivoCapturado;
  }

  alert(mensaje) {
    Swal.fire(mensaje);
  }

  DescargarPDF() {
    this.alert("Prueba pdf")
    let DATA: any = document.getElementById("exportContent");
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 210;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL("image/png");
      let PDF = new jsPDF("p", "mm", "a4");
      let position = 0;
      PDF.addImage(FILEURI, "PNG", 0, position, fileWidth, fileHeight);
      PDF.save("Indicadores.pdf");
    });
  }

  DescargarEx() {
    this.alert("Prueba excel")
  }

  DescargarWd() {
    Export2Word('exportContent', 'word-content');
  }
}

function getFileExtension(filename) {
  /*TODO*/
}

function Export2Word(element, filename = '') {
  const nav = (window.navigator as any);
  var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word'><head><meta charset='utf-8'></head><body>";
  var postHtml = "</body></html>";
  var html = preHtml + document.getElementById(element).innerHTML + postHtml;

  var blob = new Blob(['\ufeff', html], {
    type: 'application/msword'
  });

  // Specify link url
  var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);

  // Specify file name
  filename = filename ? filename + '.doc' : 'document.doc';

  // Create download link element
  var downloadLink = document.createElement("a");

  document.body.appendChild(downloadLink);

  if (nav.msSaveOrOpenBlob) {
    nav.msSaveOrOpenBlob(blob, filename);
  } else {
    // Create a link to the file
    downloadLink.href = url;

    // Setting the file name
    downloadLink.download = filename;

    //triggering the function
    downloadLink.click();
  }

  document.body.removeChild(downloadLink);
}
