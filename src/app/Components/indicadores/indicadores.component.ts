import { Component, OnInit } from "@angular/core";
import { ReportesService } from "./../../services/reportes.service";
import { AuthService } from "src/app/services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { isNull } from "@angular/compiler/src/output/output_ast";
import { IndicadoresService } from "src/app/services/indicadores.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-indicadores",
  templateUrl: "./indicadores.component.html",
  styleUrls: ["./indicadores.component.scss"],
})
export class IndicadoresComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private reportesService: ReportesService,
    private indicadoresservice: IndicadoresService
  ) { }

  usuario = false;
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
  usuarioLocalStote = JSON.parse(localStorage.getItem("usario"));
  ngOnInit() {
    this.usuarioLocalStote;
    this.getindIcadores();
    this.getCategoria();
    this.getStandares();
    this.getSubCategoria();
    this.getIndicadoresAsignados();
    var htmltable = document.getElementById('exportContent');
    htmltable.style.display = "none";
  }

  getIndicadoresAsignados() {
    let id = {
      id: 5,
    };
    this.indicadoresservice
      .getIndicadoresAsignados(id)
      .subscribe((res: any) => {
        this.resultados = res.map((item) => {
          return item;
        });
      });
  }

  getStandares() {
    this.authService.getStandares("").subscribe((res: any) => {
      this.resultados = res.map((item) => {
        return item;
      });
    });

    // if(this.usuarioLocalStote.typeuser == "3"){
    //   this.authService.getStandares("").subscribe((res: any) => {
    //     this.resultados = res.map((item) => {
    //       return item;
    //     });
    //   });
    // }
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
    if (this.usuarioLocalStote.typeuser != "3") {
      this.reportesService
        .ConsultarIndicadoresAsignados()
        .subscribe((res: any) => {
          this.resultadosTabla = res.map((item) => {
            return item;
          });
          this.resultadosTabla = this.resultadosTabla.sort();
          this.resultadosTabla = this.resultadosTabla.reverse();
    console.log(this.resultadosTabla)

        });
        
    }
    if (this.usuarioLocalStote.typeuser == "3") {
      this.usuario = true;
      let id = {
        id: this.usuarioLocalStote.usuarioid,
      };
      this.reportesService.IndicadoresAsignados(id).subscribe((res: any) => {
        this.resultadosTabla = res.map((item) => {
          return item;
        });
    console.log(this.resultadosTabla)

      });
    }
  }

  estandar() {
    this.getCategoriaFilter(this.Estandar.value);
    this.getSubCategoriaFilter(this.Estandar.value, this.Categoria.value);
    if (this.Estandar.value != "") {
      this.getIndicadoresFilter();
    } else {
      this.getCategoria();
    }
    if (
      this.Estandar.value == "" &&
      this.Categoria.value == "" &&
      this.Subcategoria.value == ""
    ) {
      this.getindIcadores();
      this.getCategoria();
      this.getStandares();
      this.getSubCategoria();
    }
  }

  categoria() {
    this.getSubCategoriaFilter(this.Estandar.value, this.Categoria.value);
    if (this.Categoria.value != "") {
      this.getIndicadoresFilter();
    } else {
      this.estandar();
      this.getSubCategoria();
    }
    if (
      this.Estandar.value == "" &&
      this.Categoria.value == "" &&
      this.Subcategoria.value == ""
    ) {
      this.getindIcadores();
      this.getCategoria();
      this.getStandares();
      this.getSubCategoria();
    }
  }

  subcategoria() {
    if (this.Subcategoria.value != "") {
      this.getIndicadoresFilter();
    } else {
      this.categoria();
    }
    if (
      this.Estandar.value == "" &&
      this.Categoria.value == "" &&
      this.Subcategoria.value == ""
    ) {
      this.getindIcadores();
      this.getCategoria();
      this.getStandares();
      this.getSubCategoria();
    }
  }

  getCategoriaFilter(estandar) {
    this.authService.getCategoria(this.Categoria).subscribe((res: any) => {
      this.resultadosCategoria = res.filter(
        (item) => item.idEstandar == estandar
      );
    });
  }

  getSubCategoriaFilter(estandar, categoria) {
    this.authService
      .getSubCategoria(this.Subcategoria)
      .subscribe((res: any) => {
        this.resultadosSubCategoria = res.filter(
          (item) => item.idCategoria == categoria || item.idEstandar == estandar
        );
      });
  }

  getIndicadoresFilter() {
    if (this.usuarioLocalStote.typeuser != "3") {
      this.reportesService
        .ConsultarIndicadoresAsignados()
        .subscribe((res: any) => {
          if (this.Subcategoria.value != "") {
            this.resultadosTabla = res.filter(
              (item) => item.idSubCategoria == this.Subcategoria.value
            );
          } else {
            this.resultadosTabla = res.filter(
              (item) =>
                item.idCategoria == this.Categoria.value ||
                item.idEstandar == this.Estandar.value ||
                item.idSubCategoria == this.Subcategoria.value
            );
          }
          this.resultadosTabla = this.resultadosTabla.sort();
          this.resultadosTabla = this.resultadosTabla.reverse();
        });
    }

    if (this.usuarioLocalStote.typeuser == "3") {
      let id = {
        id: this.usuarioLocalStote.usuarioid,
      };
      this.reportesService.IndicadoresAsignados(id).subscribe((res: any) => {
        if (this.Subcategoria.value != "") {
          this.resultadosTabla = res.filter(
            (item) => item.idSubCategoria == this.Subcategoria.value
          );
        } else {
          this.resultadosTabla = res.filter(
            (item) =>
              item.idCategoria == this.Categoria.value ||
              item.idEstandar == this.Estandar.value ||
              item.idSubCategoria == this.Subcategoria.value
          );
        }
        this.resultadosTabla = this.resultadosTabla.sort();
        this.resultadosTabla = this.resultadosTabla.reverse();
      });
    }
  }

  alert(mensaje) {
    Swal.fire(mensaje);
  }

  descargarArchivo(id, url) {
    this.indicadoresservice.descarga(id).subscribe((res) => {
      let nombreArchivo = res.headers.get("content-disposition");
      //?.split(';')[1].split('=')[1];
      let tipo: Blob = res.body as Blob;
      let a = document.createElement("a");
      a.download = url;
      a.href = window.URL.createObjectURL(tipo);
      a.click();
    });
  }

  DescargarTodosAdjuntos() {
    this.indicadoresservice.DescargarTodosAdjuntos().subscribe((res) => {
      let nombreArchivo = res.headers.get("content-disposition");
      //?.split(';')[1].split('=')[1];
      let tipo: Blob = res.body as Blob;
      let a = document.createElement("a");
      a.download = "TodosAdjuntos";
      a.href = window.URL.createObjectURL(tipo);
      a.click();
    });
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
    this.idArchivo.idArchivo = id;
    this.indicadoresservice.VerDiligenciarIndicador(this.idArchivo).subscribe((res: any) => {
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
          for (let h = 0; h < this.filtrados.length; h++) {
            this.Ordenado.push(this.filtrados[h]);
            this.html += this.filtrados[h].html;
          }
        }
      }
      document.getElementById("prueba").innerHTML = this.html;
      var htmltable = document.getElementById('exportContent');
      var html2 = htmltable.outerHTML;
      window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html2));
      location.reload();
    });
  }

  MasivoWord(id) {
    this.idArchivo.idArchivo = id;
    this.indicadoresservice.VerDiligenciarIndicador(this.idArchivo).subscribe((res: any) => {
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
          for (let h = 0; h < this.filtrados.length; h++) {
            this.Ordenado.push(this.filtrados[h]);
            this.html += this.filtrados[h].html;
          }
        }
      }
      document.getElementById("prueba").innerHTML = this.html;
      this.ExportToDoc('archivo');
    });

  }

  MasivoPDF(id) {
    this.idArchivo.idArchivo = id;
    this.indicadoresservice.VerDiligenciarIndicador(this.idArchivo).subscribe((res: any) => {
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
          for (let h = 0; h < this.filtrados.length; h++) {
            this.Ordenado.push(this.filtrados[h]);
            this.html += this.filtrados[h].html;
          }
        }
      }
      document.getElementById("prueba").innerHTML = this.html;
      var sTable = document.getElementById('exportContent').innerHTML;
      // CREATE A WINDOW OBJECT.
      var win = window.open('', '', 'height=700,width=700');
      win.document.write('<html><head>');  // <title> FOR PDF HEADER.       // ADD STYLE INSIDE THE HEAD TAG.
      win.document.write('</head>');
      win.document.write('<body>');
      win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
      win.document.write('</body></html>');
      win.document.close(); 	// CLOSE THE CURRENT WINDOW.
      win.print();    // PRINT THE CONTENTS.
      location.reload();
    });
  }

  ExportToDoc(filename = '') {
    var HtmlHead = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";

    var EndHtml = "</body></html>";

    var dochtml = document.getElementById("exportContent").innerHTML;
    //complete html
    var html = HtmlHead + dochtml + EndHtml;

    //specify the type
    var blob = new Blob(['ufeff', html], {
      type: 'application/msword'
    });

    // Specify link url
    var url = URL.createObjectURL(blob);

    // Specify file name
    filename = filename ? filename + '.doc' : 'document.doc';

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
