import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { timeStamp } from "console";
import { IndicadoresService } from "src/app/services/indicadores.service";
import Swal from "sweetalert2";


@Component({
  selector: "app-diligenciar-indicador",
  templateUrl: "./diligenciar-indicador.component.html",
  styleUrls: ["./diligenciar-indicador.component.scss"],
})
export class DiligenciarIndicadorComponent implements OnInit {
  constructor(private route: ActivatedRoute, public router: Router, private indicadoresservice: IndicadoresService) { }
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

  }

  filtrarInfo() {
    this.uniqueYears = [...new Set(this.anioArray)];
    this.uniquePeriod = [...new Set(this.preciodicidadesArray)];
  }

  VerDiligenciarIndicador() {
    this.indicadoresservice.VerDiligenciarIndicador(this.idArchivo).subscribe((res: any) => {
      this.resultadosTabla = res.map((item) => {
        this.anioArray.push(item.anio);
        this.preciodicidadesArray.push(item.periodicidad);
        return item;
      });
      this.nombreArchivo = this.resultadosTabla[0].valor;
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



  fnGuardar() {
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
    if (this.Anio == "" || this.Anio == null || this.Periodo == "" || this.Periodo == null){
      this.alert("Debe seleccionar año y periodo antes de guardar");
    }
    else{
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
      if (this.Anio == "" || this.Anio == null || this.Periodo == "" || this.Periodo == null){
        this.alert("Debe seleccionar año y periodo antes de guardar");
      }
      else{
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
  }

  archivoCapt(event) {
    this.archivoCapturado = event.target.files[0];
    this.archivos = this.archivoCapturado;
  }

  alert(mensaje) {
    Swal.fire(mensaje);
  }
}
function getFileExtension(filename) {
  /*TODO*/
}
