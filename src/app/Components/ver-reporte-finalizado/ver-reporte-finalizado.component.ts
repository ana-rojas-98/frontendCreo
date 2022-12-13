import { IndicadoresService } from "./../../services/indicadores.service";
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { ReportesService } from "./../../services/reportes.service";
import * as $ from "jquery";
import Swal from "sweetalert2";
import { ActivatedRoute, Router } from "@angular/router";
import Chart from "chart.js/auto";
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { element } from "protractor";

@Component({
  selector: 'app-ver-reporte-finalizado',
  templateUrl: './ver-reporte-finalizado.component.html',
  styleUrls: ['./ver-reporte-finalizado.component.scss']
})
export class VerReporteFinalizadoComponent implements OnInit {

  @ViewChild('content', {
    read: TemplateRef,
    static: false
  })
  template!: TemplateRef<any>

  constructor(private reportesService: ReportesService,
    private indicadoresService: IndicadoresService,
    private route: ActivatedRoute,
    public router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal) {
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
  }

  ngOnInit() {
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
        this.NombreReporte = item.nombreReporte;
        if (item.tipo == "button") {
        }
        else {
          if (item.tipo == "select1") {
            let a: any;
            this.valorSelactNumeos = item.valor;
            this.configuracion[parseInt(item.idRow)] = [parseInt(item.idRow) * 3, this.valorSelactNumeos];
            for (let i = 1; i <= this.configuracion[parseInt(item.idRow)][1]; i++) {
              this.auxhijos.push(item.idRow + "-" + i.toString());
            }
            this.hijos[parseInt(item.idRow)] = this.auxhijos;
            this.auxhijos = [];
            this.enviar = this.enviar.filter(element => element.guardar == true);
          }
          else if (item.tipo == "select2") {
          }
          else if (item.tipo == "input") {
            let input = document.createElement("div");
            input.id = item.idElement;
            item.idRow *= 3;

            if (this.valorSelactNumeos == "1") {
              input.style.cssText = "width:30%; height:100px; grid-column: 1/12;grid-row:" + (parseInt(item.idRow) + 2) + ";";
            }

            if (this.valorSelactNumeos != "1") {
              let numero = 12 / this.configuracion[parseInt(item.idRow) / 3][1];
              input.style.cssText = "width:100%; height:100px; grid-column: " + (item.idCol * numero - numero + 1) + " / " + item.idCol * numero + " ;grid-row:" + (parseInt(item.idRow) + 2) + ";";
            }
            this.hijosdeHijos.push(parseInt(item.idRow) / 3 + "-" + item.idCol + "-i");
            let contenido = document.createTextNode((item.valor).toString());
            input.appendChild(contenido);
            myParent.appendChild(input);
          }
          else 
          if (item.tipo == "bar") {
            this.nombreGrafica = item.tituloGrafica;
            this.grafica(myParent, item.idRow * 3, item.idCol, item.datos, (item.columnas).split(","), item.tipo);
          }
          else if (item.tipo == "pie") {
            this.nombreGrafica = item.tituloGrafica;
            this.grafica(myParent, item.idRow * 3, item.idCol, item.datos, (item.columnas).split(","), item.tipo);
          }
          else if (item.tipo == "line") {
            this.nombreGrafica = item.tituloGrafica;
            this.grafica(myParent, item.idRow * 3, item.idCol, item.datos, (item.columnas).split(","), item.tipo);
          }
        }
        return item;
      });
    });
  }

  grafica(myParent, idRow, idCol, data, columnas, type) {
    data = JSON.parse(data);
    this.hijosdeHijos.push(parseInt(idRow) / 3 + "-" + idCol + "-" + type.toString());
    this.contadorId++;
    let ctx = document.createElement("canvas");

    if (this.valorSelactNumeos == "1") {
      ctx.style.cssText =
        "margin-top:20px; width:100%; height:100%; grid-column: 1/12;grid-row:" +
        (parseInt(idRow) + 2) +
        ";";
    }

    if (this.valorSelactNumeos != "1") {
      let numero = 12 / this.configuracion[parseInt(idRow) / 3][1];
      ctx.style.cssText =
        "margin-top:20px; width:100%; height:100%; grid-column: " +
        (idCol * numero - numero + 1) +
        " / " +
        idCol * numero +
        " ;grid-row:" +
        (parseInt(idRow) + 2) +
        ";";
    }
    ctx.id = parseInt(idRow) / 3 + "-" + idCol + "-" + type.toString();
    myParent.appendChild(ctx);
    new Chart(ctx, {
      type: type.toString(),
      data: {
        labels: columnas,
        datasets: data,
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: this.nombreGrafica,
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
