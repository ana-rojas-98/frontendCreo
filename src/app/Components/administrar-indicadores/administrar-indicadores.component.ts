import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { ReportesService } from "./../../services/reportes.service";
import { FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { CargandoService } from "src/app/services/cargando.service";
import { IndicadoresService } from "src/app/services/indicadores.service";

@Component({
  selector: "app-administrar-indicadores",
  templateUrl: "./administrar-indicadores.component.html",
  styleUrls: ["./administrar-indicadores.component.scss"],
})
export class AdministrarIndicadoresComponent implements OnInit {
  constructor(
    private authService: AuthService,
    public router: Router,
    private reportesService: ReportesService,
    private indicadoresservice: IndicadoresService,
    public cargandoService: CargandoService
  ) { }

  estandarId = {
    id: "",
  };

  usarioLocalStote = JSON.parse(localStorage.getItem("usario"));

  indicador = {
    id: 0,
    userId: this.usarioLocalStote.usuarioid,
  };

  SubCategoria = {
    subcategoria1: "",
    nombreSubcategoria: "",
  };

  estandarFil = "";
  categoriaFil = "";
  crear = false;
  ver = false;
  editar = false;
  eliminar = false;
  tablaIndicadores: any = [];
  resultado: any = [];

  Estandar = new FormControl("");
  Categoria = new FormControl("");
  Subcategoria = new FormControl("");
  Periodicidad = new FormControl("");

  resultados: any = [];
  resultadosCategoria: any = [];
  resultadosSubCategoria: any = [];
  resultadosTabla: any = [];

  Registros: any = [];
  EstandarOpciones: any = [];
  CategoriaOpciones: any = [];
  SubcategoriaOpciones: any = [];

  ngOnInit() {
    this.authService.enviarCorreos().subscribe((res: any) => { });
    this.authService.enviarCorreosIndicadores().subscribe((res: any) => { });

    this.usarioLocalStote = JSON.parse(localStorage.getItem("usario"));
    document.getElementById("exportContent").style.display = "none";
    if (this.usarioLocalStote.typeuser == "3") {
      this.router.navigate(["private"]);
      return true;
    }
    if (this.usarioLocalStote.indicadorCrear == true) {
      this.crear = true;
    }
    if (this.usarioLocalStote.indicadorVer == true) {
      this.ver = true;
    }
    if (this.usarioLocalStote.indicadorEditar == true) {
      this.editar = true;
    }
    if (this.usarioLocalStote.indicadorEliminar == true) {
      this.eliminar = true;
    }
    this.getindIcadores();
    this.getCategoria();
    this.getStandares();
    this.getSubCategoria();
  }

  getStandares() {
    this.authService.getStandares("").subscribe((res: any) => {
      this.resultados = res.map((item) => {
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
    this.cargandoService.ventanaCargando();
    this.reportesService
      .ConsultarIndicadoresAsignados()
      .subscribe((res: any) => {
        this.resultadosTabla = res.map((item) => {
          return item;
        });
        this.resultadosTabla = this.resultadosTabla.sort();
        this.resultadosTabla = this.resultadosTabla.reverse();
        if (this.resultadosTabla) {
          Swal.close();
        }
      });
  }

  estandar() {
    this.Categoria.setValue("");
    this.Subcategoria.setValue("");
    if (this.Estandar.value != "") {
      this.getCategoriaFilter(this.Estandar.value);

    }
    this.getSubCategoriaFilter(this.Estandar.value, this.Categoria.value);
    if (
      this.Estandar.value == "" &&
      this.Categoria.value == "" &&
      this.Subcategoria.value == ""
    ) {
      return this.traertodo();
    }
  }

  traertodo() {
    this.getindIcadores();
    this.getCategoria();
    this.getStandares();
    this.getSubCategoria();
  }

  categoria() {
    this.Subcategoria.setValue("");
    if (this.Estandar.value == "") {
      this.resultadosCategoria.forEach(element => {
        if (element.categoria1 == this.Categoria.value) {
          return this.Estandar.setValue(element.idEstandar);
        }
      });
    }
    this.getCategoriaFilter(this.Estandar.value);

    this.getSubCategoriaFilter(this.Estandar.value, this.Categoria.value);
    if (
      this.Estandar.value == "" &&
      this.Categoria.value == "" &&
      this.Subcategoria.value == ""
    ) {
      return this.traertodo();
    }
  }

  subcategoria() {
    if (this.Estandar.value == "" || this.Categoria.value == "") {
      this.resultadosSubCategoria.forEach(element => {
        if (element.subcategoria1 == this.Subcategoria.value) {
          this.Estandar.setValue(element.idEstandar);
          this.Categoria.setValue(element.idCategoria);
          this.getCategoriaFilter(this.Estandar.value)
          this.getSubCategoriaFilter(this.Estandar.value, this.Categoria.value)
        }
      });
    }
    if (
      this.Estandar.value == "" &&
      this.Categoria.value == "" &&
      this.Subcategoria.value == ""
    ) {
      return this.traertodo();
    }
  }

  getCategoriaFilter(estandar) {
    this.authService.getCategoria(this.Categoria).subscribe((res: any) => {
      this.resultadosCategoria = res.filter(
        (item) => item.idEstandar == estandar
      );
    });
    return this.getIndicadoresFilter();

  }

  getSubCategoriaFilter(estandar, categoria) {
    if (estandar != "" && categoria == "") {
      this.authService
        .getSubCategoria(this.Subcategoria)
        .subscribe((res: any) => {
          this.resultadosSubCategoria = res.filter(
            (item) => item.idEstandar == estandar
          );
        });
    }
    else if (categoria != "" && estandar == "") {
      this.authService
        .getSubCategoria(this.Subcategoria)
        .subscribe((res: any) => {
          this.resultadosSubCategoria = res.filter(
            (item) => item.idCategoria == categoria
          );
        });
    }
    else {
      this.authService
        .getSubCategoria(this.Subcategoria)
        .subscribe((res: any) => {
          this.resultadosSubCategoria = res.filter(
            (item) => item.idEstandar == estandar && item.idCategoria == categoria
          );
        });
    }
    return this.getIndicadoresFilter();
  }

  getIndicadoresFilter() {
    this.cargandoService.ventanaCargando();
    this.reportesService
      .ConsultarIndicadoresAsignados()
      .subscribe((res: any) => {
        if (this.Subcategoria.value != "") {
          this.resultadosTabla = res.filter(
            (item) => item.idSubCategoria == this.Subcategoria.value
          );
        }
        else if (this.Categoria.value != "") {
          this.resultadosTabla = res.filter(
            (item) => item.idCategoria == this.Categoria.value
          );
        }
        else if (this.Estandar.value != "") {
          this.resultadosTabla = res.filter(
            (item) => item.idEstandar == this.Estandar.value
          );
        }
        if (this.resultadosTabla) {
          Swal.close();
        }
        this.resultadosTabla = this.resultadosTabla.sort();
        this.resultadosTabla = this.resultadosTabla.reverse();
      });
  }

  Eliminar(id2) {
    Swal.fire({
      title: "¿Está seguro que desea borrar el indicador?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.indicador.id = id2;
        this.cargandoService.ventanaCargando();
        this.authService.Eliminar(this.indicador).subscribe((res: any) => {
          if (res.resul == "ok") {
            this.alerta("Eliminado correctamente");
            this.getindIcadores();
          }
          return res;
        });
      } else if (result.isDenied) {
      }
    });
  }

  DuplicarIndicador(id2) {
    this.indicador.id = id2;
    this.authService.DuplicarIndicador(this.indicador).subscribe((res: any) => {
      if (res.resul == "ok") {
        this.alerta("Duplicado correctamente");
        this.getindIcadores();
      }
      return res;
    });
  }

  alerta(mensaje: any) {
    Swal.fire(mensaje);
  }

  idArchivo = {
    idArchivo: 1,
  };

  resultIndicadores = [];
  uniqueYears = [];
  uniquePeriod = [];
  anioArray = [];
  preciodicidadesArray = [];
  filtrados = [];

  Ordenado = [];
  html = "";
  prueba = "";

  filtrarInfo() {
    this.uniqueYears = [...new Set(this.anioArray)];
    this.uniquePeriod = [...new Set(this.preciodicidadesArray)];
  }

  MasivoExcel(id) {
    this.html = "";
    this.idArchivo.idArchivo = id;
    this.indicadoresservice
      .VerDiligenciarIndicador(this.idArchivo)
      .subscribe((res: any) => {
        this.resultIndicadores = res.map((item) => {
          this.anioArray.push(item.anio);
          this.preciodicidadesArray.push(item.periodicidad);
          return item;
        });
        this.filtrarInfo();
        for (let i = 0; i < this.uniqueYears.length; i++) {
          for (let j = 0; j < this.uniquePeriod.length; j++) {
            this.filtrados = this.resultIndicadores.filter(
              (an) => an.anio == this.uniqueYears[i]
            );
            this.filtrados = this.filtrados.filter(
              (pe) => pe.periodicidad == this.uniquePeriod[j]
            );
            this.html += "<table>";
            for (let h = 0; h < this.filtrados.length; h++) {
              this.Ordenado.push(this.filtrados[h]);
              if (this.filtrados[h].idFila == 1) {
                this.html += this.filtrados[h].html;
              }
              else {
                this.html += this.filtrados[h].html1export + this.filtrados[h].valor + this.filtrados[h].html2export;
              }
            }
            this.html += "</table>";
          }
        }
        document.getElementById("prueba").innerHTML = this.html;
        var htmltable = document.getElementById("exportContent");
        var html2 = htmltable.outerHTML;
        window.open(
          "data:application/vnd.ms-excel," + encodeURIComponent(html2)
        );
        location.reload();
      });
  }

  MasivoWord(id) {
    this.html = "";
    this.idArchivo.idArchivo = id;
    this.indicadoresservice
      .VerDiligenciarIndicador(this.idArchivo)
      .subscribe((res: any) => {
        this.resultIndicadores = res.map((item) => {
          this.anioArray.push(item.anio);
          this.preciodicidadesArray.push(item.periodicidad);
          return item;
        });
        this.filtrarInfo();
        for (let i = 0; i < this.uniqueYears.length; i++) {
          for (let j = 0; j < this.uniquePeriod.length; j++) {
            this.filtrados = this.resultIndicadores.filter(
              (an) => an.anio == this.uniqueYears[i]
            );
            this.filtrados = this.filtrados.filter(
              (pe) => pe.periodicidad == this.uniquePeriod[j]
            );
            this.html += "<table>";
            for (let h = 0; h < this.filtrados.length; h++) {
              this.Ordenado.push(this.filtrados[h]);
              if (this.filtrados[h].idFila == 1) {
                this.html += this.filtrados[h].html;
              }
              else {
                this.html += this.filtrados[h].html1export + this.filtrados[h].valor + this.filtrados[h].html2export;
              }
            }
            this.html += "</table>";
          }
        }
        document.getElementById("prueba").innerHTML = this.html;
        this.ExportToDoc("archivo");
      });
  }

  MasivoPDF(id) {
    this.html = "";
    this.idArchivo.idArchivo = id;
    this.indicadoresservice
      .VerDiligenciarIndicador(this.idArchivo)
      .subscribe((res: any) => {
        this.resultIndicadores = res.map((item) => {
          this.anioArray.push(item.anio);
          this.preciodicidadesArray.push(item.periodicidad);
          return item;
        });
        this.filtrarInfo();
        for (let i = 0; i < this.uniqueYears.length; i++) {
          for (let j = 0; j < this.uniquePeriod.length; j++) {
            this.filtrados = this.resultIndicadores.filter(
              (an) => an.anio == this.uniqueYears[i]
            );
            this.filtrados = this.filtrados.filter(
              (pe) => pe.periodicidad == this.uniquePeriod[j]
            );
            this.html += "<table>";
            for (let h = 0; h < this.filtrados.length; h++) {
              this.Ordenado.push(this.filtrados[h]);
              if (this.filtrados[h].idFila == 1) {
                this.html += this.filtrados[h].html;
              }
              else {
                this.html += this.filtrados[h].html1export + this.filtrados[h].valor + this.filtrados[h].html2export;
              }
            }
            this.html += "</table>";
          }
        }
        document.getElementById("prueba").innerHTML = this.html;
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
        location.reload();
      });
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
    location.reload();
  }
}
