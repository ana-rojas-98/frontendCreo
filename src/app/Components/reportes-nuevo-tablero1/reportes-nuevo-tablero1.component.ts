import { IndicadoresService } from "./../../services/indicadores.service";
import { Component, OnInit } from "@angular/core";
import { ReportesService } from "./../../services/reportes.service";
import * as $ from "jquery";
import Swal from "sweetalert2";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-reportes-nuevo-tablero1",
  templateUrl: "./reportes-nuevo-tablero1.component.html",
  styleUrls: ["./reportes-nuevo-tablero1.component.scss"],
})
export class ReportesNuevoTablero1Component implements OnInit {
  constructor(
    private reportesService: ReportesService,
    private indicadoresService: IndicadoresService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  //cadenas de html
  con = 0;
  Select3 = "";
  fila = 0;
  filaInput = 0;
  filaInputaux = 0;
  idInput = 0;
  idSelec = 0;
  col1 = 1;
  col2 = 0;
  indicadores: any = [];
  valorSelactNumeos;
  idSelecionados = [];
  resultadosSeleccionados: any = [];
  arrayId = [];
  arrayIndicadores = [];

  usuarioLocalStote = JSON.parse(localStorage.getItem("usario"));

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("array");
    this.idSelecionados = id.split(",", 2);
    this.getindIcadores();
    this.reportesService.reportesUsar.subscribe((res) => {
      this.indicadores = res;
    });


  }

  getindIcadores() {
    if (this.usuarioLocalStote.typeuser != "3") {
      for (let i = 0; i < this.idSelecionados.length; i++) {
        let idArchivo = {
          idArchivo: parseInt(this.idSelecionados[i]),
        };
        this.indicadoresService
          .VerDiligenciarIndicadorReportes(idArchivo)
          .subscribe((res: any) => {
            res.map((item) => {
              if (item.idFila != 1) {
                this.arrayId.push(item.valor);
                this.arrayIndicadores.push(
                  item.archivo + "-" + item.anio + "-" + item.valor
                );
              }
            });
            this.resultadosSeleccionados = this.resultadosSeleccionados.sort();
            this.resultadosSeleccionados =
              this.resultadosSeleccionados.reverse();
          });
      }

      if (this.usuarioLocalStote.typeuser == "3") {
        let id = {
          id: this.usuarioLocalStote.usuarioid,
        };
        this.reportesService.IndicadoresAsignados(id).subscribe((res: any) => {
          this.resultadosSeleccionados = res.map((item) => {
            console.log("indicadores: ", this.resultadosSeleccionados);
            return item;
          });
        });
      }
    }
  }

  agregarFila() {
    let myParent = document.getElementById("contenedor");

    let selectList = document.createElement("select");

    //Create array of options to be added
    var array = ["Seleccione número de columnas", "1", "2", "3", "4"];

    this.idSelec++;
    selectList.id = this.idSelec.toString();
    selectList.className = "rounded";
    selectList.style.cssText =
      "width:30%; height:40px; grid-column: 1/12; margin-top:20px;";

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
      this.filaInput = 0;
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
      $(".chart-bar").append(this.googleChart);
      $("select").click(function () {
        console.log($(this).attr("id"));
      });
      let input = document.createElement("textarea");
      let diagramaBarras = document.createElement("div");

      if (this.valorSelactNumeos == "1") {
        input.style.cssText = "width:30%; height:100px; grid-column: 1/12";
      }

      if (this.valorSelactNumeos != "1") {
        let numero = 12 / parseInt(this.valorSelactNumeos);

        this.col2 = this.col2 + numero;

        //this.col2 = numero;
        input.style.cssText =
          "width:100%; height:100px; grid-column: " +
          this.col1.toString() +
          " / " +
          this.col2.toString() +
          " ;";

        this.col1 = this.col2 + 1;
      }

      if (selectOpciones.value == "Texto/numero") {
        this.idInput++;
        input.id = "idInput" + this.idInput;

        this.selecManulRespuestas();

        myParent.appendChild(input);
      }

      if (selectOpciones.value == "Diagrama de barras") {
        diagramaBarras.id = "myPieChart";
        myParent.appendChild(diagramaBarras);
        this.guardar();
      }
    });
  }

  selecManulRespuestas() {
    Swal.fire({
      title: "¿Como desea ingresar el valor?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "De las respuestas",
      denyButtonText: `Manual`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.selecRespuestasAnteriores();
      } else if (result.isDenied) {
      }
    });
  }
  respuestas = {
    nombre: {
      SRB: "Serbia",
      UKR: "Ukraine",
      HRV: "Croatia",
    },
  };
  async selecRespuestasAnteriores() {
    const resultado = await Swal.fire({
      title: "Select field validation",
      input: "select",
      inputOptions: this.arrayIndicadores,
      inputPlaceholder: "Select a fruit",
      showCancelButton: true,
      inputValidator: (id) => {
        return new Promise((resolve) => {
          $("#idInput" + this.idInput).val(this.arrayId[id]);
          Swal.close();
        });
      },
    });
    console.log(resultado);
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

  googleChart =
    "<google-chart #chart title=" +
    this.title +
    " type=" +
    this.type +
    " data=" +
    this.data +
    " columnNames=" +
    this.columnNames +
    " options=" +
    this.options +
    " > </google-chart>";

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
