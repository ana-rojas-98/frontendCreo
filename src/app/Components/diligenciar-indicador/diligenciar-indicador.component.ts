import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { timeStamp } from "console";
import { IndicadoresService } from "src/app/services/indicadores.service";
import { ReportesService } from "src/app/services/reportes.service";
import Swal from "sweetalert2";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-diligenciar-indicador",
  templateUrl: "./diligenciar-indicador.component.html",
  styleUrls: ["./diligenciar-indicador.component.scss"],
})
export class DiligenciarIndicadorComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    public router: Router,
    private indicadoresservice: IndicadoresService,
    private reportesService: ReportesService
  ) {}
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
  excel = false;
  word = false;
  pdf = false;
  el: any;
  usuarioLocalStote = JSON.parse(localStorage.getItem("usario"));

  Anio: "";
  Periodo = "";

  idArchivo = {
    idArchivo: 1,
  };

  nombreArchivo = "";
  idDeArchivo = "";

  archivos: File = null;
  archivoCapturado: File;

  resultadosIndicador: any = [];
  resultados: any = [];

  Valores = {
    idFormato: 0,
    idFila: 0,
    valor: "",
    html: "",
    idArchivo: 0,
    periodicidad: "",
    anio: 0,
  };

  usarioLocalStote = {
    usuarioid: 1,
  };

  ngOnInit() {
    this.authService.enviarCorreos().subscribe((res: any) => {});
    this.authService.enviarCorreosIndicadores().subscribe((res: any) => {});

    this.usuarioLocalStote;
    this.consultarIndicador();
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.accionVerModificar = this.route.snapshot.paramMap.get("accion");

    if (
      this.accionVerModificar != "ver" &&
      this.accionVerModificar != "editar"
    ) {
      this.router.navigate(["/indicadores"]);
    }

    if (this.accionVerModificar == "ver") {
      this.ver = true;
      document.getElementById("Guardar").style.display = "none";
      document.getElementById("Finalizar").style.display = "none";
    }

    if (this.accionVerModificar == "editar") {
      this.modificar = true;
    }

    this.idArchivo.idArchivo = this.id;
    this.VerDiligenciarIndicador();
    //this.getIndicadoresFilter();
  }

  consultarIndicador() {
    if (this.usuarioLocalStote.typeuser == "3") {
      let id = {
        id: this.usuarioLocalStote.usuarioid,
      };
      this.reportesService.IndicadoresAsignados(id).subscribe((res: any) => {
        console.log("res: ", res);
        res.map((item) => {
          if (item.idIndicador == this.id) {
            if (
              item.diligenciar == false &&
              this.accionVerModificar == "editar" &&
              this.modificar == true
            ) {
              this.router.navigate(["/indicadores"]);
              return true;
            }
            if (
              item.ver == false &&
              this.accionVerModificar == "ver" &&
              this.ver == true
            ) {
              this.router.navigate(["/indicadores"]);
              return true;
            }
            this.excel = item.excel;
            this.word = item.word;
            this.pdf = item.pdf;
            this.resultados = true;
          }
        });
        if (this.resultados != true) {
          this.router.navigate(["private"]);
        }
      });
    } else {
      this.excel = true;
      this.word = true;
      this.pdf = true;
    }
  }

  filtrarInfo() {
    this.uniqueYears = [...new Set(this.anioArray)];
    this.uniquePeriod = [...new Set(this.preciodicidadesArray)];
    this.Anio = this.uniqueYears[this.uniqueYears.length - 1];
    this.Periodo = this.uniquePeriod[this.uniquePeriod.length - 1];
    this.ChangeAnio();
  }

  VerDiligenciarIndicador() {
    this.indicadoresservice
      .VerDiligenciarIndicador(this.idArchivo)
      .subscribe((res: any) => {
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
    if (this.Anio != "") {
      if (this.Periodo != "") {
        this.resultadosHTML = this.resultadosTabla.filter(
          (an) => an.anio == this.Anio
        );
        this.resultadosHTML = this.resultadosHTML.filter(
          (pe) => pe.periodicidad == this.Periodo
        );
        this.resultadosHTML.forEach(
          (item) => (
            (this.prueba += item.html), this.Respuestas.push(item.valor)
          )
        );
      } else {
        this.prueba = "No se encuentra resultados";
      }
    } else {
      this.prueba = "No se encuentra resultados";
    }
    document.getElementById("prueba").innerHTML = this.prueba;

    this.AsignarChange();
  }

  ChangeAnio() {
    this.prueba = "";
    this.Respuestas = [];
    if (this.Anio != "") {
      if (this.Periodo != "") {
        this.resultadosHTML = this.resultadosTabla.filter(
          (an) => an.anio == this.Anio
        );
        this.resultadosHTML = this.resultadosHTML.filter(
          (pe) => pe.periodicidad == this.Periodo
        );
        let i = 2;
        this.resultadosHTML.forEach(
          (item) => (
            (this.prueba += item.html), this.Respuestas.push(item.valor)
          )
        );
      } else {
        this.prueba = "No se encuentra resultados";
      }
    } else {
      this.prueba = "No se encuentra resultados";
    }
    document.getElementById("prueba").innerHTML = this.prueba;
    let contents = document.getElementById("prueba").innerHTML;
    document.getElementById("prueba").innerHTML = contents;
    this.AsignarChange();
  }

  getIndicadoresFilter() {
    this.reportesService
      .ConsultarIndicadoresAsignados()
      .subscribe((res: any) => {
        this.resultadosIndicador = res.filter(
          (item) => item.idIndicador == this.id
        );
      });
    this.nombreArchivo = this.resultadosIndicador[0].indicador;
  }

  fnGuardar() {
    if (
      this.Anio == "" ||
      this.Anio == null ||
      this.Periodo == "" ||
      this.Periodo == null
    ) {
      this.alert("Debe seleccionar año y periodo antes de guardar");
    } else {
      this.resultadosHTML = this.resultadosTabla.filter(
        (an) => an.anio == this.Anio
      );
      this.resultadosHTML = this.resultadosHTML.filter(
        (pe) => pe.periodicidad == this.Periodo
      );
      let i = 0;
      var contents;
      let contenidos = [];
      this.usarioLocalStote = JSON.parse(localStorage.getItem("usario"));
      this.resultadosHTML.shift();
      this.resultadosHTML.map(
        (item) => (
          console.log("Fila", item.idFila - 1),
          (contents = document.getElementById((item.idFila - 1).toString())),
          (item.valor = contents.value),
          (item.Usuarioid = this.usarioLocalStote.usuarioid),
          contenidos.push(item),
          i++
        )
      );
      this.indicadoresservice
        .GuardarRespuestasIndicador(contenidos)
        .subscribe((res: any) => {
          if (res.resul == "Se guardo con exito") {
            this.alert("Respuestas guardadas");
          }
          return res;
        });
    }
  }

  fnFinalizar() {
    let a = confirm("¿Está seguro que ya finalizó este indicador?");
    if (a == true) {
      if (
        this.Anio == "" ||
        this.Anio == null ||
        this.Periodo == "" ||
        this.Periodo == null
      ) {
        this.alert("Debe seleccionar año y periodo antes de guardar");
      } else {
        this.resultadosHTML = this.resultadosTabla.filter(
          (an) => an.anio == this.Anio
        );
        this.resultadosHTML = this.resultadosHTML.filter(
          (pe) => pe.periodicidad == this.Periodo
        );
        let i = 0;
        var contents;
        let contenidos = [];
        this.usarioLocalStote = JSON.parse(localStorage.getItem("usario"));
        this.resultadosHTML.shift();
        this.resultadosHTML.map(
          (item) => (
            (contents = document.getElementById((item.idFila - 1).toString())),
            (item.valor = contents.value),
            (item.Usuarioid = this.usarioLocalStote.usuarioid),
            contenidos.push(item),
            i++
          )
        );
        this.indicadoresservice
          .FinalizarIndicador(contenidos)
          .subscribe((res: any) => {
            if (res.resul == "Se guardo con exito") {
              this.alert("Respuestas guardadas");
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

  formulados = [];

  AsignarChange() {
    this.resultadosHTML = this.resultadosTabla.filter(
      (an) => an.anio == this.Anio
    );
    this.resultadosHTML = this.resultadosHTML.filter(
      (pe) => pe.periodicidad == this.Periodo
    );
    let i = 0;
    var contents;
    let contenidos = [];
    this.resultadosHTML.map((item) => {
      if (item.idFila == 1) {
      } else {
        console.log("Fila", item.idFila - 1);
        contents = document.getElementById((item.idFila - 1).toString());
        item.valor = contents.value;
        contenidos.push(item);
        if (item.entrada == "input" && item.numerop == "si") {
          let a = document.getElementById((item.idFila - 1).toString());
          a.addEventListener("change", () => {
            this.formulados = this.resultadosHTML.filter(
              (an) => an.formulap == "si"
            );
            this.formulados.forEach((item2) => {
              let operacion = item2.formula;
              //-------------------------------------------------------------------------------------------------------------

              let band = 0;
              let carac = "";
              let array = [];
              for (let i = 0; i < operacion.length; i++) {
                if ((band = 0)) {
                  carac = "";
                } else {
                  if (
                    operacion[i] == "+" ||
                    operacion[i] == "-" ||
                    operacion[i] == "/" ||
                    operacion[i] == "*"
                  ) {
                    array.push(carac);
                    band = 1;
                    carac = "";
                    array.push(operacion[i]);
                  } else {
                    carac += operacion[i];
                  }
                }
              }
              array.push(carac);

              let continuar = 0;
              for (var c = 0; c < array.length; c++) {
                if (item.idFila == array[c]) {
                  console.log("Id Fila: ", item.idFila);
                  console.log("Array[c]: ", array[c]);
                  continuar = 1;
                  console.log(array);
                }
              }

              //--------------------------------------------------------------------------------
              if (continuar == 1) {
                let bandera = 0;
                var var1;
                var var2;
                var var3;
                var var4;
                let array2 = [];
                for (let i = 0; i < array.length; i++) {
                  var1 = document.getElementById((array[i + 1] - 1).toString());
                  console.log((array[i] - 1).toString());
                  var2 = document.getElementById((array[i - 1] - 1).toString());
                  var3 = document.getElementById((array[i] - 1).toString());
                  if (array[i] == "*") {
                    if (bandera == 1) {
                      array2.push(array2[array2.length - 1] * var1.value);
                      array2.splice(array2.length - 2, 1);
                    } else {
                      array2.pop();
                      array2.push(var2.value * var1.value);
                    }
                    bandera = 1;
                    i += 1;
                  } else if (array[i] == "/") {
                    if (bandera == 1) {
                      array2.push(array2[array2.length - 1] / var1.value);
                      array2.splice(array2.length - 2, 1);
                    } else {
                      array2.pop();
                      array2.push(var2.value / var1.value);
                    }
                    bandera = 1;
                    i += 1;
                  } else {
                    bandera = 0;
                    if (array[i] == "+" || array[i] == "-") {
                      array2.push(array[i]);
                    } else {
                      array2.push(var3.value);
                    }
                  }
                }
                console.log("Array2: ", array2);
                //-------------------------------------------------------------------------------------------------------------------------
                let bandera2 = 0;
                let array3 = [];
                for (let i = 0; i < array2.length; i++) {
                  if (array2[i] == "+") {
                    if (bandera2 == 1) {
                      array3.push(
                        parseFloat(array3[array3.length - 1]) +
                          parseFloat(array2[i + 1])
                      );
                      array3.splice(array3.length - 2, 1);
                    } else {
                      array3.pop();
                      array3.push(
                        parseFloat(array2[i - 1]) + parseFloat(array2[i + 1])
                      );
                    }
                    bandera2 = 1;
                    i += 1;
                  } else if (array2[i] == "-") {
                    if (bandera2 == 1) {
                      array3.push(array3[array3.length - 1] - array2[i + 1]);
                      array3.splice(array3.length - 2, 1);
                    } else {
                      array3.pop();
                      array3.push(array2[i - 1] - array2[i + 1]);
                    }
                    bandera2 = 1;
                    i += 1;
                  } else {
                    bandera2 = 0;
                    array3.push(array2[i]);
                  }
                }
                //---------------------------------------------------------------------------------------------------------
                var4 = document.getElementById((item2.idFila - 1).toString());
                var4.value = array3;
              }
            });
          });
          if (item.formulap == "si") {
            a.addEventListener("focus", () => {
              this.formulados = this.resultadosHTML.filter(
                (an) => an.formulap == "si"
              );
              this.formulados.forEach((item2) => {
                let valor = 0;
                let operacion = item2.formula;
                //-------------------------------------------------------------------------------------------------------------

                let band = 0;
                let carac = "";
                let array = [];
                for (let i = 0; i < operacion.length; i++) {
                  if ((band = 0)) {
                    carac = "";
                  } else {
                    if (
                      operacion[i] == "+" ||
                      operacion[i] == "-" ||
                      operacion[i] == "/" ||
                      operacion[i] == "*"
                    ) {
                      array.push(carac);
                      band = 1;
                      carac = "";
                      array.push(operacion[i]);
                    } else {
                      carac += operacion[i];
                    }
                  }
                }
                array.push(carac);

                let continuar = 0;
                for (var c = 0; c < array.length; c++) {
                  if (item.idFila == array[c]) {
                    console.log("Id Fila: ", item.idFila);
                    console.log("Array[c]: ", array[c]);
                    continuar = 1;
                  }
                }

                //--------------------------------------------------------------------------------
                if (continuar == 1) {
                  let bandera = 0;
                  var var1;
                  var var2;
                  var var3;
                  var var4;
                  let array2 = [];
                  for (let i = 0; i < array.length; i++) {
                    var1 = document.getElementById(
                      (array[i + 1] - 1).toString()
                    );
                    var2 = document.getElementById(
                      (array[i - 1] - 1).toString()
                    );
                    var3 = document.getElementById((array[i] - 1).toString());
                    if (array[i] == "*") {
                      if (bandera == 1) {
                        array2.push(array2[array2.length - 1] * var1.value);
                        array2.splice(array2.length - 2, 1);
                      } else {
                        array2.pop();
                        array2.push(var2.value * var1.value);
                      }
                      bandera = 1;
                      i += 1;
                    } else if (array[i] == "/") {
                      if (bandera == 1) {
                        array2.push(array2[array2.length - 1] / var1.value);
                        array2.splice(array2.length - 2, 1);
                      } else {
                        array2.pop();
                        array2.push(var2.value / var1.value);
                      }
                      bandera = 1;
                      i += 1;
                    } else {
                      bandera = 0;
                      if (array[i] == "+" || array[i] == "-") {
                        array2.push(array[i]);
                      } else {
                        array2.push(var3.value);
                      }
                    }
                  }
                  //-------------------------------------------------------------------------------------------------------------------------
                  let bandera2 = 0;
                  let array3 = [];
                  for (let i = 0; i < array2.length; i++) {
                    if (array2[i] == "+") {
                      if (bandera2 == 1) {
                        array3.push(
                          parseFloat(array3[array3.length - 1]) +
                            parseFloat(array2[i + 1])
                        );
                        array3.splice(array3.length - 2, 1);
                      } else {
                        array3.pop();
                        array3.push(
                          parseFloat(array2[i - 1]) + parseFloat(array2[i + 1])
                        );
                      }
                      bandera2 = 1;
                      i += 1;
                    } else if (array2[i] == "-") {
                      if (bandera2 == 1) {
                        array3.push(array3[array3.length - 1] - array2[i + 1]);
                        array3.splice(array3.length - 2, 1);
                      } else {
                        array3.pop();
                        array3.push(array2[i - 1] - array2[i + 1]);
                      }
                      bandera2 = 1;
                      i += 1;
                    } else {
                      bandera2 = 0;
                      array3.push(array2[i]);
                    }
                  }
                  //---------------------------------------------------------------------------------------------------------
                  var4 = document.getElementById((item2.idFila - 1).toString());
                  var4.value = array3;
                }
              });
            });
          }
        }
      }

      i++;
    });
  }

  DescargarPDF() {
    // let DATA: any = document.getElementById("exportContent");
    // html2canvas(DATA).then((canvas) => {
    //   let fileWidth = 210;
    //   let fileHeight = (canvas.height * fileWidth) / canvas.width;
    //   const FILEURI = canvas.toDataURL("image/png");
    //   let PDF = new jsPDF("p", "mm", "a4");
    //   let position = 0;
    //   PDF.addImage(FILEURI, "PNG", 0, position, fileWidth, fileHeight);
    //   PDF.save("Indicadores.pdf");
    // });
    this.createPDF();
  }

  DescargarEx() {
    this.ExportToExcel();
  }

  DescargarWd() {
    this.ExportToDoc("archivo");
  }

  ExportToExcel() {
    var htmltable = document.getElementById("exportContent");
    var html = htmltable.outerHTML;
    window.open("data:application/vnd.ms-excel," + encodeURIComponent(html));
  }

  ExportToDoc(filename = "") {
    var HtmlHead =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";

    var EndHtml = "</body></html>";

    var dochtml = document.getElementById("exportContent").innerHTML;
    //complete html
    var html = HtmlHead + dochtml + EndHtml;

    //specify the type
    var blob = new Blob(["ufeff", html], {
      type: "application/msword",
    });

    // Specify link url
    var url = URL.createObjectURL(blob);

    // Specify file name
    filename = filename ? filename + ".doc" : "document.doc";

    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);
    const nav = window.navigator as any;
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

  createPDF() {
    var sTable = document.getElementById("exportContent").innerHTML;
    // CREATE A WINDOW OBJECT.
    var win = window.open("", "", "height=700,width=700");
    win.document.write("<html><head>"); // <title> FOR PDF HEADER.       // ADD STYLE INSIDE THE HEAD TAG.
    win.document.write("</head>");
    win.document.write("<body>");
    win.document.write(sTable); // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write("</body></html>");
    win.document.close(); // CLOSE THE CURRENT WINDOW.
    win.print(); // PRINT THE CONTENTS.
  }
}
