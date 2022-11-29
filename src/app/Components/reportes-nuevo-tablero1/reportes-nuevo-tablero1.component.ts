import { ReportesService } from "./../../services/reportes.service";
import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";

@Component({
  selector: "app-reportes-nuevo-tablero1",
  templateUrl: "./reportes-nuevo-tablero1.component.html",
  styleUrls: ["./reportes-nuevo-tablero1.component.scss"],
})
export class ReportesNuevoTablero1Component implements OnInit {
  constructor(private ReportesService: ReportesService) {}

  //cadenas de html
  con = 0;
  Select3 = "";
  fila = 0;
  filaInout = 0;
  filaInoutaux = 0;
  idSelec = 0;
  col1 = 1;
  col2 = 0;
  indicadores: any = [];
  valorSelactNumeos;

  ngOnInit() {
    this.ReportesService.reportesUsar.subscribe((res) => {
      this.indicadores = res;
    });
  }

  agregarFila() {
    let myParent = document.getElementById("contenedor");

    let selectList = document.createElement("select");

    //Create array of options to be added
    var array = ["Seleccione una opcion", "1", "2", "3", "4"];

    this.idSelec++;
    selectList.id = this.idSelec.toString();
    selectList.className = "rounded";
    selectList.style.cssText =
      "width:24.5%; height:40px; grid-column: 1/13; margin-top:20px;";

    //selectList.style.height = "40px";
    myParent.appendChild(selectList);

    //Create and append the options
    for (var i = 0; i < array.length; i++) {
      var option = document.createElement("option");
      option.value = array[i];
      option.text = array[i];
      selectList.appendChild(option);
    }

    selectList.addEventListener("change", () => {
      this.col1 = 1;
      this.col2 = 0;
      this.valorSelactNumeos = parseInt(selectList.value);
      this.filaInout = 0;
      for (let i = 1; i <= this.valorSelactNumeos; i++) {
        this.CrearColumna(myParent);
      }
      this.col1 = 1;
      this.col2 = 0;
    });
  }

  CrearColumna(myParent) {
    let cont = 0;
    let selectOpciones;
    var opciones = [
      "Seleccione una opcion",
      "Texto/numero",
      "Diagrama de barras",
      "Diagrama de torta",
      "Diagrama de puntos",
    ];

    selectOpciones = document.createElement("select");

    selectOpciones.id = " selectOpciones" + this.con++;
    selectOpciones.className = "rounded";

    if (this.valorSelactNumeos == "1") {
      selectOpciones.style.cssText =
        "width:100%; height:40px; grid-column: 1/4";
    }

    if (this.valorSelactNumeos != "1") {
      let numero = 12 / parseInt(this.valorSelactNumeos);

      this.col2 = this.col2 + numero;

      //this.col2 = numero;
      selectOpciones.style.cssText =
        "width:100%; height:40px; grid-column: " +
        this.col1.toString() +
        " / " +
        this.col2.toString() +
        " ;";

      this.col1 = this.col2 + 1;
    }

    myParent.appendChild(selectOpciones);

    for (let i = 0; i < opciones.length; i++) {
      var option = document.createElement("option");
      option.value = opciones[i];
      option.text = opciones[i];
      selectOpciones.appendChild(option);
    }

    selectOpciones.addEventListener("change", () => {
      let input = document.createElement("input");
      let diagramaBarras = document.createElement("div");

      if (this.valorSelactNumeos == "1") {
        input.style.cssText = "width:30%; height:40px; grid-column: 1/12";
      }

      if (this.valorSelactNumeos != "1") {
        let numero = 12 / parseInt(this.valorSelactNumeos);

        this.col2 = this.col2 + numero;

        //this.col2 = numero;
        input.style.cssText =
          "width:100%; height:40px; grid-column: " +
          this.col1.toString() +
          " / " +
          this.col2.toString() +
          " ;";

        this.col1 = this.col2 + 1;
      }

      if (selectOpciones.value == "Texto/numero") {
        input.type = "text";

        myParent.appendChild(input);
      }

      if (selectOpciones.value == "Diagrama de barras") {
        diagramaBarras.id = "myPieChart";
        myParent.appendChild(diagramaBarras);
        this.guardar();
      }
    });
  }

  columnNames = ["Browser", "Percentage"];
  title = "googlechart";
  type = "ColumnChart";
  data = [
    ["Name1", 5.0],
    ["Name2", 36.8],
    ["Name3", 42.8],
    ["Name4", 18.5],
    ["Name5", 16.2],
  ];

  options = {
    colors: ["#e0440e", "#e6693e", "#ec8f6e", "#f3b49f", "#f6c7b6"],
    is3D: true,
  };
  width = 500;
  height = 300;

  guardar() {
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      // Define the chart to be drawn.
      var data = new google.visualization.DataTable();
      data.addColumn("string", "Element");
      data.addColumn("number", "Percentage");
      data.addRows([
        ["Nitrogen", 0.78],
        ["Oxygen", 0.21],
        ["Other", 0.01],
      ]);

      // Instantiate and draw the chart.
      var chart = new google.visualization.PieChart(
        document.getElementById("myPieChart")
      );
      chart.draw(data, null);
    }
  }
}
