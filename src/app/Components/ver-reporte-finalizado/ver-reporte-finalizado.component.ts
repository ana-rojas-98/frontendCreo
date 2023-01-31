import { IndicadoresService } from "./../../services/indicadores.service";
import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from "@angular/core";
import { ReportesService } from "./../../services/reportes.service";
import * as $ from "jquery";
import { ActivatedRoute, Router } from "@angular/router";
import Chart from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: "app-ver-reporte-finalizado",
  templateUrl: "./ver-reporte-finalizado.component.html",
  styleUrls: ["./ver-reporte-finalizado.component.scss"],
})
export class VerReporteFinalizadoComponent implements OnInit {
  @ViewChild("content", {
    read: TemplateRef,
    static: false,
  })
  template!: TemplateRef<any>;
  PDF() {
    let DATA: any = document.getElementById('content1');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('archivo.pdf');
    });
  }



  constructor(
    private reportesService: ReportesService,
    private indicadoresService: IndicadoresService,
    private route: ActivatedRoute,
    public router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = "static";
    config.keyboard = false;
  }

  idSelec = 1;
  valorSelactNumeos;
  configuracion = [];
  hijos = [];
  hijosdeHijos = [];
  auxhijos = [];
  dataInput = "";
  contadorId = 0;
  nombreGrafica = "";
  arrayData = [];
  arrayColumnas = [];
  arrayColores = [];
  data = [];
  myParentGrafica: any;
  idRowGrafica;
  idColGrafica;
  nombreVariable = "";
  tipoGrafica = "";
  columnasplaceholder = "Columnas";
  contenModal: any;
  botonGraficar = false;
  inputColorVisible = true;
  divVariables = true;
  mostrarBotonMenosColumnas = true;
  dataVisualizar = "";
  columnasVisualizar = "";
  coloresVisualizar = [];

  enviar: any = [];

  usuarioLocalStote = JSON.parse(localStorage.getItem("usario"));

  Reporte = {
    id: 0,
  };

  ngOnInit() {
    if (this.usuarioLocalStote.reportesVer == false) {
      this.router.navigate(["reportes"]);
    }
    $(".open").on("click", function () {
      $(".overlay, .modal").addClass("active");
    });

    $(".close, .overlay").on("click", function () {
      $(".overlay, .modal").removeClass("active");
    });

    let id = this.route.snapshot.paramMap.get("id");
    this.Reporte.id = parseInt(id);
    this.getReportesDetail(this.Reporte);
    this.configuracion.push(["Posicion", "Cantidad"]);
    this.hijos.push(["Posicion", "Cantidad"]);
    this.hijosdeHijos.push(["Posicion", "Cantidad"]);
  }

  resultadosTabla: any;

  getReportesDetail(id) {
    let myParent = document.getElementById("contenedor");
    this.reportesService.ConsultaReportesDetail(id).subscribe((res: any) => {
      this.resultadosTabla = res.map((item) => {
        if (this.usuarioLocalStote.typeuser == '3' && item.idUsuarioCrea != this.usuarioLocalStote.usuarioid) {
          return this.router.navigate(["reportes-tableros"]);

        }
        this.NombreReporte = item.nombreReporte;
        if (item.tipo == "button") {
        } else {
          if (item.tipo == "select1") {
            let a: any;
            this.valorSelactNumeos = item.valor;
            this.configuracion[parseInt(item.idRow)] = [
              parseInt(item.idRow) * 4,
              this.valorSelactNumeos,
            ];
            for (
              let i = 1;
              i <= this.configuracion[parseInt(item.idRow)][1];
              i++
            ) {
              this.auxhijos.push(item.idRow + "-" + i.toString());
            }
            this.hijos[parseInt(item.idRow)] = this.auxhijos;
            this.auxhijos = [];
            this.enviar = this.enviar.filter(
              (element) => element.guardar == true
            );
          } else if (item.tipo == "select2") {
          } else if (item.tipo == "input") {
            let input = document.createElement("div");
            input.id = item.idElement;
            item.idRow *= 4;

            if (this.valorSelactNumeos == "1") {
              input.style.cssText =
                "width:100%; height:100px; margin: auto; grid-column: 1/12;grid-row:" +
                (parseInt(item.idRow) + 2) +
                ";";
            }

            if (this.valorSelactNumeos != "1") {
              let numero = 12 / this.configuracion[parseInt(item.idRow) / 4][1];
              input.style.cssText =
                "width:100%; height:100px; margin: auto; grid-column: " +
                (item.idCol * numero - numero + 1) +
                " / " +
                item.idCol * numero +
                " ;grid-row:" +
                (parseInt(item.idRow) + 2) +
                ";";
            }
            this.hijosdeHijos.push(
              parseInt(item.idRow) / 4 + "-" + item.idCol + "-i"
            );
            let contenido = document.createTextNode(item.valor.toString());
            input.appendChild(contenido);
            myParent.appendChild(input);
          } else if (item.tipo == "bar") {
            this.nombreGrafica = item.tituloGrafica;
            this.grafica(
              myParent,
              item.idRow * 4,
              item.idCol,
              item.datos,
              item.columnas.split(","),
              item.tipo
            );
          } else if (item.tipo == "pie") {
            this.nombreGrafica = item.tituloGrafica;
            this.grafica(
              myParent,
              item.idRow * 4,
              item.idCol,
              item.datos,
              item.columnas.split(","),
              item.tipo
            );
          } else if (item.tipo == "line") {
            this.nombreGrafica = item.tituloGrafica;
            this.grafica(
              myParent,
              item.idRow * 4,
              item.idCol,
              item.datos,
              item.columnas.split(","),
              item.tipo
            );
          }
          else if (item.tipo == "Table") {
            let items = item.valor.split("-");
            let items2 = item.texto.split("|");
            this.CrearTabla(myParent, items[1], items[0], item.idRow, item.idCol);
            let contador = 0;
            for (let i = 0; i < parseInt(items[1]); i++) {
              for (let j = 0; j < parseInt(items[0]); j++) {
                let a = document.getElementById((parseInt(item.idRow) / 4 + "-" + item.idCol + "-Table-" + i + "-" + j).toString());
                a.appendChild(document.createTextNode(items2[contador]));
                contador++;
              }
            }
          }
        }
        return item;
      });
    });
  }

  CrearTabla(Parent, Filas, Columnas, idRow, idCol) {
    let numero = 12 / this.configuracion[parseInt(idRow) / 4][1];
    let exist = document.getElementById((parseInt(idRow) / 4 + "-" + idCol + "-Table").toString());
    if (exist != undefined) {
      Parent.removeChild(exist);
    }
    let tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.id = parseInt(idRow) / 4 + "-" + idCol + "-Table";

    tbl.style.border = '1px solid black';
    if (this.valorSelactNumeos == "1") {
      tbl.style.cssText = "margin: auto;width:100%; height:100px; table-layout: fixed; grid-column: 1/12;grid-row:" + (parseInt(idRow) + 3) + ";";
    }
    else {
      tbl.style.cssText = "margin: auto;width:100%; height:100px; table-layout: fixed; grid-column:" + (idCol * numero - numero + 1) +
        " / " + (idCol * numero) + ";grid-row:" + (parseInt(idRow) + 3) + ";";
    }
    for (let i = 0; i < Filas; i++) {
      const tr = tbl.insertRow();
      tr.id = (parseInt(idRow) / 4 + "-" + idCol + "-Table-" + i).toString();
      for (let j = 0; j < Columnas; j++) {
        const td = tr.insertCell();
        td.id = (parseInt(idRow) / 4 + "-" + idCol + "-Table-" + i + "-" + j).toString();
        td.style.cssText = "word-wrap:break-word";
        td.style.border = '1px solid black';
      }
    }
    Parent.appendChild(tbl);
  }

  grafica(myParent, idRow, idCol, data, columnas, type) {
    data = JSON.parse(data);
    this.hijosdeHijos.push(
      parseInt(idRow) / 4 + "-" + idCol + "-" + type.toString()
    );
    this.contadorId++;
    let ctx = document.createElement("canvas");

    if (this.valorSelactNumeos == "1") {
      ctx.style.cssText =
        "margin: auto; width:100%; height:100%; grid-column: 1/12;grid-row:" +
        (parseInt(idRow) + 2) +
        ";";
    }

    if (this.valorSelactNumeos != "1") {
      let numero = 12 / this.configuracion[parseInt(idRow) / 4][1];
      ctx.style.cssText =
        "margin: auto; width:100%; height:100%; grid-column: " +
        (idCol * numero - numero + 1) +
        " / " +
        idCol * numero +
        " ;grid-row:" +
        (parseInt(idRow) + 2) +
        ";";
    }
    ctx.id = parseInt(idRow) / 4 + "-" + idCol + "-" + type.toString();
    myParent.appendChild(ctx);
    new Chart(ctx, {
      type: type.toString(),
      data: {
        labels: columnas,
        datasets: data,
      },
      plugins: [ChartDataLabels],
      options: {

        plugins: {
          title: {
            display: true,
            text: this.nombreGrafica,
          },
          datalabels: {
            backgroundColor: function (context) {
              return context.dataset.backgroundColor;
            },
            anchor: "end",
            color: 'black',
            borderColor: 'white',
            borderRadius: 50,
            borderWidth: 1,
            labels: {
              title: {
                font: {
                  weight: 'regular',
                }
              },
              value: {
                color: 'black'
              }
            }
          },
        },
        responsive: false,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
          x: {
            beginAtZero: true,
          },
        },
        borderColor: this.arrayColores,
        tension: 3,
      },
    });
  }

  NombreReporte = "";
}
