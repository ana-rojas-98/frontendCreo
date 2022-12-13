import { IndicadoresService } from "./../../services/indicadores.service";
import { Component, OnInit } from "@angular/core";
import { ReportesService } from "./../../services/reportes.service";
import * as $ from "jquery";
import Swal from "sweetalert2";
import { ActivatedRoute, Router } from "@angular/router";
import Chart from "chart.js/auto";
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";

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
    public router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = "static";
    config.keyboard = false;
  }

  //cadenas de html

  idSelec = 1;
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

  ngOnInit() {
    if (this.usuarioLocalStote.reportesCrear == false) {
      return this.router.navigate(["reportes"]);
    }

    $(".open").on("click", function () {
      $(".overlay, .modal").addClass("active");
    });

    $(".close, .overlay").on("click", function () {
      $(".overlay, .modal").removeClass("active");
    });

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
  contadoModel = 0;
  agregarFila(content) {
    if (this.NombreReporte == "") {
      return alert("Ingrese titulo del tablero antes de continuar");
    }
    if (this.contadoModel == 0) {
      this.contenModal = content;
      this.contadoModel++;
    }

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
              this.enviar.forEach((element) => {
                if (element.idElement == this.hijosdeHijos[k].toString()) {
                  element.guardar = false;
                }
              });
              myParent.removeChild(child);
              this.hijosdeHijos[k] = "";
            }
          }
          this.enviar.forEach((element) => {
            if (
              element.idElement == this.hijos[parseInt(idRow)][h].toString()
            ) {
              element.guardar = false;
            }
          });
          let child = document.getElementById(a);
          myParent.removeChild(child);
        }
        this.hijos[parseInt(idRow)].splice(
          0,
          this.hijos[parseInt(idRow)].length
        );
      }
      let child = document.getElementById(button.getAttribute("id") + "-");
      this.enviar.forEach((element) => {
        if (
          element.idElement == button.getAttribute("id") + "-" ||
          element.idElement == button.getAttribute("id")
        ) {
          element.guardar = false;
        }
      });
      myParent.removeChild(child);
      myParent.removeChild(button);
      this.enviar = this.enviar.filter((element) => element.guardar == true);
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
      this.valorSelactNumeos = parseInt(selectList.value);
      if (this.hijos[parseInt(idRow)] != undefined) {
        for (let h = 0; h < this.hijos[parseInt(idRow)].length; h++) {
          let a = this.hijos[parseInt(idRow)][h].toString();
          for (let k = 0; k < this.hijosdeHijos.length; k++) {
            if (this.hijosdeHijos[k].includes(a)) {
              let child = document.getElementById(
                this.hijosdeHijos[k].toString()
              );
              this.enviar.forEach((element) => {
                if (element.idElement == this.hijosdeHijos[k].toString()) {
                  element.guardar = false;
                }
              });
              myParent.removeChild(child);
              this.hijosdeHijos[k] = "";
            }
          }
          let child = document.getElementById(a);
          this.enviar.forEach((element) => {
            if (
              element.idElement == this.hijos[parseInt(idRow)][h].toString()
            ) {
              element.guardar = false;
            }
          });
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
      this.hijos[parseInt(idRow)] = this.auxhijos;
      this.auxhijos = [];
      this.enviar = this.enviar.filter((element) => element.guardar == true);
    });
    this.addData(selectList, this.idSelec, 0, "select1");
    this.addData(button, this.idSelec, 0, "button");
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
      selectOpciones.style.cssText =
        "width:100%; height:40px; grid-column: " +
        (idCol * numero - numero + 1) +
        " / " +
        idCol * numero +
        " ;grid-row:" +
        (parseInt(idRow) + 1) +
        ";";
    }

    myParent.appendChild(selectOpciones);

    for (let i = 0; i < opciones.length; i++) {
      var option = document.createElement("option");
      option.value = opciones[i];
      option.text = opciones[i];
      selectOpciones.appendChild(option);
    }

    this.addData(selectOpciones, parseInt(idRow) / 3, idCol, "select2");

    selectOpciones.addEventListener("change", () => {
      let input = document.createElement("textarea");
      let diagramaBarras = document.createElement("div");
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
        input.style.cssText =
          "width:100%; height:100px; grid-column: " +
          (idCol * numero - numero + 1) +
          " / " +
          idCol * numero +
          " ;grid-row:" +
          (parseInt(idRow) + 2) +
          ";";
      }

      if (selectOpciones.value == "Texto/numero") {
        input.id = parseInt(idRow) / 3 + "-" + idCol + "-i";
        this.hijosdeHijos.push(parseInt(idRow) / 3 + "-" + idCol + "-i");
        this.selecManulRespuestas("texto", input.id);
        myParent.appendChild(input);
        this.addData(input, parseInt(idRow) / 3, idCol, "input");
      }

      if (selectOpciones.value == "Diagrama de barras") {
        diagramaBarras.id = (
          parseInt(idRow) / 3 +
          "-" +
          idCol +
          "-bar"
        ).toString();
        let valor = 0;
        this.divVariables = true;
        this.myParentGrafica = myParent;
        this.idRowGrafica = idRow;
        this.idColGrafica = idCol;
        this.tipoGrafica = "bar";
        this.modalService.open(this.contenModal);
      }

      if (selectOpciones.value == "Diagrama de torta") {
        diagramaBarras.id = (
          parseInt(idRow) / 3 +
          "-" +
          idCol +
          "-pie"
        ).toString();
        let valor = 0;

        this.divVariables = false;
        this.myParentGrafica = myParent;
        this.idRowGrafica = idRow;
        this.idColGrafica = idCol;
        this.tipoGrafica = "pie";
        this.columnasplaceholder = "Ingrese el nombre de la variabales ";
        this.modalService.open(this.contenModal);
      }

      if (selectOpciones.value == "Diagrama de puntos") {
        diagramaBarras.id = (
          parseInt(idRow) / 3 +
          "-" +
          idCol +
          "-line"
        ).toString();
        let valor = 0;

        this.divVariables = true;
        this.myParentGrafica = myParent;
        this.idRowGrafica = idRow;
        this.idColGrafica = idCol;
        this.tipoGrafica = "line";
        this.modalService.open(this.contenModal);
      }
      this.enviar = this.enviar.filter((element) => element.guardar == true);
    });
  }

  selecManulRespuestas(funcion, id) {
    Swal.fire({
      title: "¿Como desea ingresar el valor?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "De las respuestas",
      denyButtonText: `Manual`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.selecRespuestasAnteriores(funcion, id);
      } else if (result.isDenied) {
        if (funcion != "texto") {
          this.datosManual(funcion);
        } else {
          Swal.close();
        }
      }
    });
  }

  async selecRespuestasAnteriores(funcion, id2) {
    const resultado = await Swal.fire({
      title: "Seleccione una respuesta",
      input: "select",
      inputOptions: this.arrayIndicadores,
      inputPlaceholder: "Seleccione una respuesta",
      showCancelButton: true,
      inputValidator: (id) => {
        return new Promise((resolve) => {
          let varInput: any;
          varInput = document.getElementById(id2);
          if (funcion == "texto") {
            varInput.value = this.arrayId[id];
          }
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

  agregarData(funcion, id?) {
    this.selecManulRespuestas(funcion, id);
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
    if (this.coloresInput == "") {
      this.auxColoresInput = 0;
      this.inputColorVisible = true;
    }
    if (this.columnasInput == "") {
      this.auxColumnaInput = 0;
    }
  }

  AgregarGrafica() {
    if (this.tipoGrafica == "pie") {
      if (
        this.dataInput == "" ||
        this.columnasInput == "" ||
        this.coloresInput == ""
      ) {
        Swal.fire("Debes completar todos los datos");
        return true;
      }
    } else {
      if (
        this.dataInput == "" ||
        this.nombreVariable == "" ||
        this.columnasInput == "" ||
        this.coloresInput == ""
      ) {
        Swal.fire("Debes completar todos los datos");
        return true;
      }
    }

    this.botonGraficar = true;
    this.arrayData = this.dataInput.split("~");
    this.arrayColumnas = this.columnasInput.split("~");
    this.arrayColores = this.coloresInput.split("~");
    this.coloresVisualizar = this.coloresInput.split("~");
    if (this.arrayData.length > this.arrayColumnas.length) {
      Swal.fire("No puedes tener mas valores que columnas");
      return true;
    }
    let grafica = {
      label: this.nombreVariable,
      data: this.arrayData,
      backgroundColor: this.arrayColores,
      //borderColor: this.colors,
      borderColor: this.coloresInput,
      borderWidth: 1.5,
    };
    this.dataVisualizar = this.dataInput;
    this.columnasVisualizar = this.columnasInput;
    this.data.push(grafica);
    this.dataInput = "";
    //this.columnasInput = "";
    this.mostrarBotonMenosColumnas = false;
    this.coloresInput = "";
    this.nombreVariable = "";
    this.auxDataInput = 0;
    //this.auxColumnaInput = 0;
    this.auxColoresInput = 0;
  }

  coloresFuncion() {
    if (
      (this.tipoGrafica == "bar" || this.tipoGrafica == "line") &&
      this.coloresInput != ""
    ) {
      Swal.fire("Solo puedes asignar un color para esta variable");
      return true;
    }

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

  cargarGrafica() {
    this.grafica(
      this.myParentGrafica,
      this.idRowGrafica,
      this.idColGrafica,
      JSON.stringify(this.data),
      this.arrayColumnas,
      this.tipoGrafica
    );
    this.data = [];
    this.arrayColumnas = [];
    this.dataVisualizar = "";
    this.coloresVisualizar = [];
    this.columnasVisualizar = "";
    this.columnasInput = "";
    this.coloresInput = "";
    this.nombreVariable = "";
    this.nombreGrafica = "";
    this.botonGraficar = false;
    this.mostrarBotonMenosColumnas = true;
    this.modalService.dismissAll();
  }

  grafica(myParent, idRow, idCol, data, columnas, type) {
    data = JSON.parse(data);
    this.hijosdeHijos.push(
      parseInt(idRow) / 3 + "-" + idCol + "-" + type.toString()
    );
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
    this.addData(ctx, parseInt(idRow) / 3, idCol, type.toString(), "","", this.nombreGrafica, JSON.stringify(data), columnas.toString());
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

  cerrarModal() {
    this.data = [];
    this.dataInput = "";
    this.columnasInput = "";
    this.coloresInput = "";
    this.nombreVariable = "";
    this.nombreGrafica = "";
    this.auxDataInput = 0;
    this.auxColumnaInput = 0;
    this.auxColoresInput = 0;
    this.dataVisualizar = "";
    this.coloresVisualizar = [];
    this.columnasVisualizar = "";
    this.botonGraficar = false;
    this.mostrarBotonMenosColumnas = true;
    this.modalService.dismissAll();
  }

  guardar() {
    if (this.NombreReporte == "") {
      alert("Debe ingresar nombre del reporte");
    } else if (this.enviar[0] == undefined || this.enviar[0] == null) {
      alert("Debe ingresar alguna fila");
    } else {
      this.enviar.forEach((element) => {
        let a: any;
        a = document.getElementById(element.idElement.toString());
        element.valor = a.value;
      });
      this.enviar[0].nombreReporte = this.NombreReporte;
      this.reportesService.GuardarReporte(this.enviar).subscribe((res: any) => {
        if ((res.result = "Guardado")) {
          alert("Guardado con éxito");
          this.router.navigate(["reportes-tableros"]);
        }
        return res;
      });
    }
  }

  finalizar(){
    if (this.NombreReporte == "") {
      alert("Debe ingresar nombre del reporte")
    }
    else if (this.enviar[this.enviar.length - 1] == undefined || this.enviar[this.enviar.length - 1] == null) {
      alert("Debe ingresar alguna fila")
    }
    else {
      let con = confirm("¿Desea finalizar el reporte?")
      if (con == true)
      {
        this.enviar.forEach(element => {
          let a: any;
          a = document.getElementById(element.idElement.toString());
          element.valor = a.value;
        });
        this.enviar[this.enviar.length - 1].nombreReporte = this.NombreReporte;
        this.reportesService.FinalizarNuevoReporte(this.enviar).subscribe((res: any) => {
          if (res.result = "Guardado") {
            alert("Guardado con éxito");
            this.router.navigate(["reportes-tableros"]);
          }
          return res;
        });
      }
    }
  }
  NombreReporte = "";

  addData(
    item,
    idRow,
    idCol,
    tipo,
    valor?,
    texto?,
    titulo_grafica?,
    datos?,
    columnas?
  ) {
    this.enviar.push({
      item: item,
      columnas: columnas,
      datos: datos,
      html: item.innerHTML.toString(),
      idcol: idCol,
      idElement: item.id,
      idReporte: 0,
      idRow: idRow,
      tipo: tipo,
      tituloGrafica: titulo_grafica,
      texto: texto,
      valor: valor,
      finalizado: item.html,
      idUsuarioCrea: this.usuarioLocalStote.usuarioid,
      idUsuarioModifica: this.usuarioLocalStote.usuarioid,
      indicadores: this.idSelecionados.toString(),
      nombreReporte: this.NombreReporte,
      guardar: true,
    });
  }
}
