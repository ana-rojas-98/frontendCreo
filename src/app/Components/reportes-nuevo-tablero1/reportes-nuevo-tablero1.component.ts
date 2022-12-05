import { IndicadoresService } from "./../../services/indicadores.service";
import { Component, OnInit } from "@angular/core";
import { ReportesService } from "./../../services/reportes.service";
import * as $ from "jquery";
import Swal from "sweetalert2";
import { ActivatedRoute, Router } from "@angular/router";
import { isNullOrUndefined } from "util";
import Chart from "chart.js/auto";
import { color, getRelativePosition } from "chart.js/helpers";

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
  Select3 = "";
  fila = 0;
  filaInput = 0;
  filaInputaux = 0;
  idInput = 0;
  idSelec = 1;
  col1 = 1;
  col2 = 0;
  indicadores: any = [];
  valorSelactNumeos;
  idSelecionados = [];
  resultadosSeleccionados: any = [];
  arrayId = [];
  arrayIndicadores = [];
  configuracion = [];
  hijos = [];
  hijosdeHijos = [];
  auxhijos = [];
  coloresSelect = "";
  dataInput = "";
  columnasInput = "";
  coloresInput = "";
  auxDataInput = 0;
  auxColumnaInput = 0;
  auxColoresInput = 0;
  contadorId = 0;
  nombreGrafica = "";
  arrayData = [];
  arrayColumnas = [];
  arrayColores = [];
  data = [];

  usuarioLocalStote = JSON.parse(localStorage.getItem("usario"));

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("array");
    this.idSelecionados = id.split(",", 2);
    this.getindIcadores();
    this.reportesService.reportesUsar.subscribe((res) => {
      this.indicadores = res;
    });
    this.configuracion.push(["Posicion", "Cantidad"]);
    this.hijos.push(["Posicion", "Cantidad"]);
    this.hijosdeHijos.push(["Posicion", "Cantidad"]);
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
            return item;
          });
        });
      }
    }
  }

  agregarFila() {
    let myParent = document.getElementById("contenedor");

    let selectList = document.createElement("select");

    let button = document.createElement("button");
    //Create array of options to be added
    var array = ["Seleccione número de columnas", "1", "2", "3", "4"];
    let anterior = document.getElementById(this.idSelec.toString());
    while (anterior != null) {
      if (this.idSelec == 1) {
        this.idSelec++;
        break;
      }
      this.idSelec++;
      anterior = document.getElementById(this.idSelec.toString());
    }
    button.id = this.idSelec.toString();
    selectList.id = this.idSelec.toString() + "-";
    selectList.className = "rounded";
    button.className = "rounded";
    selectList.style.cssText =
      "width:30%; height:40px; grid-column: 1/12; margin-top:20px; grid-row: " +
      this.idSelec * 3;
    button.style.cssText =
      "width:1%;height:30px;font-size: 2em;color: red;align-items: center;background-color: transparent;border-color: transparent;grid-column: 5/12; margin-top:20px; grid-row: " +
      this.idSelec * 3;
    button.textContent = "x";
    //selectList.style.height = "40px";
    myParent.appendChild(selectList);
    myParent.appendChild(button);

    button.addEventListener("click", () => {
      let idRow = button.getAttribute("id");
      if (this.hijos[parseInt(idRow)] != undefined) {
        for (let h = 0; h < this.hijos[parseInt(idRow)].length; h++) {
          let a = this.hijos[parseInt(idRow)][h].toString();
          for (let k = 0; k < this.hijosdeHijos.length; k++) {
            if (this.hijosdeHijos[k].includes(a)) {
              let child = document.getElementById(
                this.hijosdeHijos[k].toString()
              );
              myParent.removeChild(child);
              this.hijosdeHijos[k] = "";
            }
          }
          let child = document.getElementById(a);
          myParent.removeChild(child);
        }
        this.hijos[parseInt(idRow)].splice(
          0,
          this.hijos[parseInt(idRow)].length
        );
      }
      let child = document.getElementById(button.getAttribute("id") + "-");
      myParent.removeChild(child);
      myParent.removeChild(button);
    });

    //Create and append the options
    for (var i = 0; i < array.length; i++) {
      var option = document.createElement("option");
      option.value = array[i];
      option.text = array[i];
      selectList.appendChild(option);
    }
    selectList.addEventListener("change", () => {
      let idRow = selectList.getAttribute("id");
      idRow = idRow.substring(0, 1);
      this.col1 = 1;
      this.col2 = 0;
      this.valorSelactNumeos = parseInt(selectList.value);
      this.filaInput = 0;
      if (this.hijos[parseInt(idRow)] != undefined) {
        for (let h = 0; h < this.hijos[parseInt(idRow)].length; h++) {
          let a = this.hijos[parseInt(idRow)][h].toString();
          for (let k = 0; k < this.hijosdeHijos.length; k++) {
            if (this.hijosdeHijos[k].includes(a)) {
              let child = document.getElementById(
                this.hijosdeHijos[k].toString()
              );
              myParent.removeChild(child);
              this.hijosdeHijos[k] = "";
            }
          }
          let child = document.getElementById(a);
          myParent.removeChild(child);
        }
      }
      this.configuracion[parseInt(idRow)] = [
        parseInt(idRow) * 3,
        this.valorSelactNumeos,
      ];
      for (let i = 1; i <= this.configuracion[parseInt(idRow)][1]; i++) {
        this.auxhijos.push(idRow + "-" + i.toString());
        this.CrearColumna(myParent, parseInt(idRow) * 3, i);
      }
      this.col1 = 1;
      this.col2 = 0;
      this.hijos[parseInt(idRow)] = this.auxhijos;
      this.auxhijos = [];
    });
  }

  CrearColumna(myParent, idRow, idCol) {
    let selectOpciones;
    var opciones = [
      "Seleccione una opcion",
      "Texto/numero",
      "Diagrama de barras",
      "Diagrama de torta",
      "Diagrama de puntos",
    ];

    selectOpciones = document.createElement("select");

    selectOpciones.id = parseInt(idRow) / 3 + "-" + idCol;
    selectOpciones.className = "rounded";

    if (this.valorSelactNumeos == "1") {
      selectOpciones.style.cssText =
        "width:100%; height:40px; grid-column: 1/4;grid-row:" +
        (parseInt(idRow) + 1) +
        ";";
    }

    if (this.valorSelactNumeos != "1") {
      let numero = 12 / this.configuracion[parseInt(idRow) / 3][1];

      this.col2 = this.col2 + numero;

      //this.col2 = numero;
      selectOpciones.style.cssText =
        "width:100%; height:40px; grid-column: " +
        this.col1.toString() +
        " / " +
        this.col2.toString() +
        "; grid-row:" +
        (parseInt(idRow) + 1) +
        ";";

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
      let input = document.createElement("textarea");
      let diagramaBarras = document.createElement("div");
      console.log("Hijos de hijos: ", this.hijosdeHijos);
      for (let k = 0; k < this.hijosdeHijos.length; k++) {
        if (
          this.hijosdeHijos[k].includes(
            (parseInt(idRow) / 3 + "-" + idCol).toString()
          )
        ) {
          let child = document.getElementById(this.hijosdeHijos[k].toString());
          myParent.removeChild(child);
          this.hijosdeHijos[k] = "";
        }
      }

      if (this.valorSelactNumeos == "1") {
        input.style.cssText =
          "width:30%; height:100px; grid-column: 1/12;grid-row:" +
          (parseInt(idRow) + 2) +
          ";";
      }

      if (this.valorSelactNumeos != "1") {
        let numero = 12 / this.configuracion[parseInt(idRow) / 3][1];
        //this.col2 = numero;
        input.style.cssText =
          "width:100%; height:100px; grid-column: " +
          (idCol * numero - numero + 1) +
          " / " +
          idCol * numero +
          " ;grid-row:" +
          (parseInt(idRow) + 2) +
          ";";
        this.col1 = this.col2 + 1;
      }

      if (selectOpciones.value == "Texto/numero") {
        this.idInput++;
        input.id = parseInt(idRow) / 3 + "-" + idCol + "-i";
        this.hijosdeHijos.push(parseInt(idRow) / 3 + "-" + idCol + "-i");
        this.selecManulRespuestas("texto");
        myParent.appendChild(input);
      }

      if (selectOpciones.value == "Diagrama de barras") {
        diagramaBarras.id = (
          parseInt(idRow) / 3 +
          "-" +
          idCol +
          "-db"
        ).toString();
        let valor = 0;
        this.hijosdeHijos.push(parseInt(idRow) / 3 + "-" + idCol + "-db");
        let datosGrafica = document.getElementById("prueba");
        myParent.appendChild(datosGrafica);
        //datosGrafica.id = (valor++).toString();
        //this.grafica(myParent, idRow, idCol);
      }
    });
  }

  selecManulRespuestas(funcion) {
    Swal.fire({
      title: "¿Como desea ingresar el valor?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "De las respuestas",
      denyButtonText: `Manual`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.selecRespuestasAnteriores(funcion);
      } else if (result.isDenied) {
        if (funcion != "texto") {
          this.datosManual(funcion);
        } else {
          Swal.close();
        }
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
  async selecRespuestasAnteriores(funcion) {
    const resultado = await Swal.fire({
      title: "Select field validation",
      input: "select",
      inputOptions: this.arrayIndicadores,
      inputPlaceholder: "Select a fruit",
      showCancelButton: true,
      inputValidator: (id) => {
        return new Promise((resolve) => {
          // $("#idInput" + this.idInput).val(this.arrayId[id]);
          if (this.auxDataInput == 0) {
            if (funcion == "data") {
              this.dataInput = this.arrayId[id];
            }
          }

          if (this.auxColumnaInput == 0) {
            if (funcion == "columnas") {
              this.columnasInput = this.arrayId[id];
            }
          }

          if (this.auxDataInput != 0) {
            if (funcion == "data") {
              this.dataInput = this.dataInput + "~" + this.arrayId[id];
            }
          }

          if (this.auxColumnaInput != 0) {
            if (funcion == "columnas") {
              this.columnasInput = this.columnasInput + "~" + this.arrayId[id];
            }
          }

          if (funcion == "data") {
            this.auxDataInput++;
          }
          if (funcion == "columnas") {
            this.auxColumnaInput++;
          }
          Swal.close();
        });
      },
    });
  }

  async datosManual(funcion) {
    const { value: text } = await Swal.fire({
      input: "text",
      inputLabel: "Message",
      inputPlaceholder: "Digite un valor",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
    });

    if (text) {
      if (this.auxDataInput == 0) {
        if (funcion == "data") {
          this.dataInput = text;
        }
      }

      if (this.auxColoresInput == 0) {
        if (funcion == "colores") {
          this.coloresInput = text;
        }
      }

      if (this.auxColumnaInput == 0) {
        if (funcion == "columnas") {
          this.columnasInput = text;
        }
      }

      if (this.auxDataInput != 0) {
        if (funcion == "data") {
          this.dataInput = this.dataInput + "~" + text;
        }
      }

      if (this.auxColoresInput != 0) {
        if (funcion == "colores") {
          this.coloresInput = this.coloresInput + "~" + text;
        }
      }

      if (this.auxColumnaInput != 0) {
        if (funcion == "columnas") {
          this.columnasInput = this.columnasInput + "~" + text;
        }
      }

      if (funcion == "data") {
        this.auxDataInput++;
      }

      if (funcion == "colores") {
        this.auxColoresInput++;
      }

      if (funcion == "columnas") {
        this.auxColumnaInput++;
      }
      Swal.close();
    }
  }

  agregarData(funcion) {
    this.selecManulRespuestas(funcion);
  }

  quitarData(funcion) {
    let array;
    if (funcion == "data") {
      let datos = this.dataInput.toString();
      array = datos.split("~");
      this.dataInput = "";
    }
    if (funcion == "colores") {
      let datos = this.coloresInput.toString();
      array = datos.split("~");
      this.coloresInput = "";
    }
    if (funcion == "columnas") {
      let datos = this.columnasInput.toString();
      array = datos.split("~");
      this.columnasInput = "";
    }
    for (let item = 0; item < array.length - 1; item++) {
      if (this.dataInput == "") {
        if (funcion == "data") {
          this.dataInput = array[item];
        }
      } else {
        if (funcion == "data") {
          this.dataInput = this.dataInput + "~" + array[item];
        }
      }

      if (this.coloresInput == "") {
        if (funcion == "colores") {
          this.coloresInput = array[item];
        }
      } else {
        if (funcion == "colores") {
          this.coloresInput = this.coloresInput + "~" + array[item];
        }
      }

      if (this.columnasInput == "") {
        if (funcion == "columnas") {
          this.columnasInput = array[item];
        }
      } else {
        if (funcion == "columnas") {
          this.columnasInput = this.columnasInput + "~" + array[item];
        }
      }
    }
    if (this.dataInput == "") {
      this.auxDataInput = 0;
    }
    if (this.columnasInput == "") {
      this.auxColumnaInput = 0;
    }
  }

  AgregarGrafica() {
    this.arrayData = this.dataInput.split("~");
    this.arrayColumnas = this.columnasInput.split("~");
    this.arrayColores = this.coloresInput.split("~");
    let grafica = {
      label: this.nombreGrafica,
      data: this.arrayData,
      backgroundColor: this.arrayColores,
      //borderColor: this.colors,
      borderWidth: 1.5,
    };
    this.data.push(grafica);
  }

  colores = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#FFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#99FF99",
    "#B34D4D",
    "#80B300",
    "#809900",
    "#E6B3B3",
    "#6680B3",
    "#66991A",
    "#FF99E6",
    "#CCFF1A",
    "#FF1A66",
    "#E6331A",
    "#33FFCC",
    "#66994D",
    "#B366CC",
    "#4D8000",
    "#B33300",
    "#CC80CC",
    "#66664D",
    "#991AFF",
    "#E666FF",
    "#4DB3FF",
    "#1AB399",
    "#E666B3",
    "#33991A",
    "#CC9999",
    "#B3B31A",
    "#00E680",
    "#4D8066",
    "#809980",
    "#E6FF80",
    "#1AFF33",
    "#999933",
    "#FF3380",
    "#CCCC00",
    "#66E64D",
    "#4D80CC",
    "#9900B3",
    "#E64D66",
    "#4DB380",
    "#FF4D4D",
    "#99E6E6",
    "#6666FF",
    "#e0440e",
    "#e6693e",
    "#ec8f6e",
    "#f3b49f",
    "#f6c7b6",
    "#e0440e",
  ];

  coloresFuncion() {
    if (this.coloresSelect != "colores") {
      if (this.auxColoresInput == 0) {
        this.coloresInput = this.coloresSelect;
      }

      if (this.auxColoresInput != 0) {
        this.coloresInput = this.coloresInput + "~" + this.coloresSelect;
      }

      this.auxColoresInput++;
    }
  }

  grafica(myParent, idRow, idCol) {
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

      this.col2 = this.col2 + numero;

      //this.col2 = numero;
      ctx.style.cssText =
        "margin-top:20px; width:100%; height:100%; grid-column: " +
        (idCol * numero - numero + 1) +
        " / " +
        idCol * numero +
        " ;grid-row:" +
        (parseInt(idRow) + 2) +
        ";";

      this.col1 = this.col2 + 1;
    }

    ctx.id = (parseInt(idRow) / 3 + "-" + idCol + "-db").toString();
    myParent.appendChild(ctx);
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: this.arrayColumnas,
        datasets: this.data,
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Prueba",
          },
        },
        responsive: false,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
