import { IndicadoresService } from "./../../services/indicadores.service";
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { ReportesService } from "./../../services/reportes.service";
import * as $ from "jquery";
import Swal from "sweetalert2";
import { ActivatedRoute, Router } from "@angular/router";
import Chart from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { element } from "protractor";
import { sep } from "path";

@Component({
  selector: 'app-editar-reporte',
  templateUrl: './editar-reporte.component.html',
  styleUrls: ['./editar-reporte.component.scss']
})



export class EditarReporteComponent implements OnInit {

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
  botonGraficar = true;
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
    let accion = this.route.snapshot.paramMap.get("accion");
    if (this.usuarioLocalStote.reportesEditar == false && accion == "editar") {
      return this.router.navigate(["reportes"]);
    }
    if (this.usuarioLocalStote.reportesVer == false && accion == "ver") {
      return this.router.navigate(["reportes"]);
    }
    if (accion != "editar" && accion != "ver") {
      return this.router.navigate(["reportes"]);
    }
    if (accion == "ver") {
      document.getElementById("addRow").style.display = "none";
      document.getElementById("saveBtn").style.display = "none";
      document.getElementById("endBtn").style.display = "none";
    }
    this.Reporte.id = parseInt(id);
    this.getReportesDetail(this.Reporte);
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
        this.indicadoresService.VerDiligenciarIndicadorReportes(idArchivo).subscribe((res: any) => {
          res.map((item) => {
            if (item.idFila != 1) {
              this.arrayId.push(item.valor);
              this.arrayIndicadores.push("I: " + item.archivo + "- A: " + item.anio + "- P: " + item.periodicidad + "- V: " + item.valor);
            }
          });
          this.resultadosSeleccionados = this.resultadosSeleccionados.sort();
          this.resultadosSeleccionados = this.resultadosSeleccionados.reverse();
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
          let a = document.getElementById("content");
          this.idSelec = item.idElement;
          this.agregarFila(this.template);
        }
        else {
          if (item.tipo == "select1") {
            this.addData("", this.idSelec, 0, "select1");
            this.addData("", this.idSelec, 0, "button");
            let a: any;
            a = document.getElementById(item.idElement);
            a.value = item.valor;
            this.valorSelactNumeos = a.value;
            this.configuracion[parseInt(item.idRow)] = [parseInt(item.idRow) * 4, this.valorSelactNumeos];
            for (let i = 1; i <= this.configuracion[parseInt(item.idRow)][1]; i++) {
              this.auxhijos.push(item.idRow + "-" + i.toString());
              this.CrearColumna(myParent, parseInt(item.idRow) * 4, i);
            }
            this.hijos[parseInt(item.idRow)] = this.auxhijos;
            this.auxhijos = [];
            this.enviar = this.enviar.filter(element => element.guardar == true);
          }
          else if (item.tipo == "select2") {
            this.addData("", parseInt(item.idRow) / 4, item.idCol, "select2");
            let a: any;
            a = document.getElementById(item.idElement);
            a.value = item.valor;
          }
          else if (item.tipo == "input") {
            let input = document.createElement("textarea");
            input.id = item.idElement;
            item.idRow *= 4;

            if (this.valorSelactNumeos == "1") {
              input.style.cssText = "width:100%; height:100px; grid-column: 1/12;grid-row:" + (parseInt(item.idRow) + 2) + ";";
            }

            if (this.valorSelactNumeos != "1") {
              let numero = 12 / this.configuracion[parseInt(item.idRow) / 4][1];
              input.style.cssText = "width:100%; height:100px; grid-column: " + (item.idCol * numero - numero + 1) + " / " + item.idCol * numero + " ;grid-row:" + (parseInt(item.idRow) + 2) + ";";
            }
            this.hijosdeHijos.push(parseInt(item.idRow) / 4 + "-" + item.idCol + "-i");
            input.value = item.valor;
            myParent.appendChild(input);
            this.addData(input, parseInt(item.idRow) / 4, item.idCol, "input");
          }
          else if (item.tipo == "bar") {
            this.nombreGrafica = item.tituloGrafica;
            this.grafica(myParent, item.idRow * 4, item.idCol, item.datos, (item.columnas).split(","), item.tipo);
          }
          else if (item.tipo == "pie") {
            this.nombreGrafica = item.tituloGrafica;
            this.grafica(myParent, item.idRow * 4, item.idCol, item.datos, (item.columnas).split(","), item.tipo);
          }
          else if (item.tipo == "line") {
            this.nombreGrafica = item.tituloGrafica;
            this.grafica(myParent, item.idRow * 4, item.idCol, item.datos, (item.columnas).split(","), item.tipo);
          }
          else if (item.tipo == "Table") {
            let Sep = (item.valor).split("-");

            let numero = 12 / this.configuracion[parseInt(item.idRow) / 4][1];

            let addColumn = document.createElement("button");
            addColumn.id = parseInt(item.idRow) / 4 + "-" + item.idCol + "-adCols";
            this.hijosdeHijos.push(parseInt(item.idRow) / 4 + "-" + item.idCol + "-adCols");

            let removeColumn = document.createElement("button");
            removeColumn.id = parseInt(item.idRow) / 4 + "-" + item.idCol + "-rmCols";
            this.hijosdeHijos.push(parseInt(item.idRow) / 4 + "-" + item.idCol + "-rmCols");


            let addRow = document.createElement("button");
            addRow.id = parseInt(item.idRow) / 4 + "-" + item.idCol + "-adRows";
            this.hijosdeHijos.push(parseInt(item.idRow) / 4 + "-" + item.idCol + "-adRows");

            let removeRow = document.createElement("button");
            removeRow.id = parseInt(item.idRow) / 4 + "-" + item.idCol + "-rmRows";
            this.hijosdeHijos.push(parseInt(item.idRow) / 4 + "-" + item.idCol + "-rmRows");


            let Columns = document.createElement("input");
            Columns.setAttribute("type", "number");
            Columns.setAttribute("placeholder", "Columnas")
            Columns.id = parseInt(item.idRow) / 4 + "-" + item.idCol + "-TCols";
            Columns.value = Sep[0];
            this.hijosdeHijos.push(parseInt(item.idRow) / 4 + "-" + item.idCol + "-TCols");

            let Rows = document.createElement("input");
            Rows.setAttribute("type", "number");
            Rows.setAttribute("placeholder", "Filas")
            Rows.id = parseInt(item.idRow) / 4 + "-" + item.idCol + "-TRows";
            Rows.value = Sep[1];
            this.hijosdeHijos.push(parseInt(item.idRow) / 4 + "-" + item.idCol + "-TRows");
            if (this.valorSelactNumeos == "1") {
              Columns.style.cssText = "width:70%; height:40px; grid-column: 1/2;grid-row:" + (parseInt(item.idRow) + 2) + ";";
              Rows.style.cssText = "width:70%; height:40px; grid-column: 2/3;grid-row:" + (parseInt(item.idRow) + 2) + ";";
              addColumn.style.cssText = "width:100%; height:20px; grid-column: 1/2;grid-row:" + (parseInt(item.idRow) + 2) + ";";
              removeColumn.style.cssText = "width:100%; height:40px; grid-column: 1/2;grid-row:" + (parseInt(item.idRow) + 2) + ";";
              addColumn.style.backgroundColor = "#008F39";
              removeColumn.style.backgroundColor = "red";
              addRow.style.cssText = "width:100%; height:20px; grid-column: 2/3;grid-row:" + (parseInt(item.idRow) + 2) + ";";
              removeRow.style.cssText = "width:100%; height:40px; grid-column: 2/3;grid-row:" + (parseInt(item.idRow) + 2) + ";";
              addRow.style.backgroundColor = "#008F39";
              removeRow.style.backgroundColor = "red";
            }
            else {
              Columns.style.cssText = "width:70%; height:40px; grid-column:" + (item.idCol * numero - numero + 1) +
                " / " + (item.idCol * numero - numero + 2) + ";grid-row:" + (parseInt(item.idRow) + 2) + ";";
              Rows.style.cssText = "width:70%; height:40px; grid-column: " + (item.idCol * numero - numero + 2) +
                " / " + (item.idCol * numero - numero + 3) + ";grid-row:" + (parseInt(item.idRow) + 2) + ";";
              addColumn.style.cssText = "width:100%; height:20px; grid-column:" + (item.idCol * numero - numero + 1) +
                " / " + (item.idCol * numero - numero + 2) + ";grid-row:" + (parseInt(item.idRow) + 2) + ";";
              removeColumn.style.cssText = "width:100%; height:40px; grid-column:" + (item.idCol * numero - numero + 1) +
                " / " + (item.idCol * numero - numero + 2) + ";grid-row:" + (parseInt(item.idRow) + 2) + ";";
              addColumn.style.backgroundColor = "#008F39";
              removeColumn.style.backgroundColor = "red";
              addRow.style.cssText = "width:100%; height:20px; grid-column:" + (item.idCol * numero - numero + 2) +
                " / " + (item.idCol * numero - numero + 3) + ";grid-row:" + (parseInt(item.idRow) + 2) + ";";
              removeRow.style.cssText = "width:100%; height:40px; grid-column:" + (item.idCol * numero - numero + 2) +
                " / " + (item.idCol * numero - numero + 3) + ";grid-row:" + (parseInt(item.idRow) + 2) + ";";
              addRow.style.backgroundColor = "#008F39";
              removeRow.style.backgroundColor = "red";
            }

            myParent.appendChild(removeColumn);
            myParent.appendChild(addColumn);
            myParent.appendChild(removeRow);
            myParent.appendChild(addRow);
            myParent.appendChild(Columns);
            myParent.appendChild(Rows);

            Columns.addEventListener("change", () => {
              let id = Columns.getAttribute("id");
              let Sep = id.split("-");
              let Filas;
              Filas = document.getElementById(Sep[0] + "-" + Sep[1] + "-TRows")
              if (!this.hijosdeHijos.includes(parseInt(item.idRow) / 4 + "-" + item.idCol + "-Table")) {
                this.hijosdeHijos.push(parseInt(item.idRow) / 4 + "-" + item.idCol + "-Table");
              }
              if (parseInt(Filas.value) > 0 && parseInt(Columns.value) > 0) {
                this.CrearTabla(myParent, Filas.value, Columns.value, item.idRow, item.idCol);
              } else {
                let exist = document.getElementById((parseInt(item.idRow) / 4 + "-" + item.idCol + "-Table").toString());
                if (exist != undefined) {
                  myParent.removeChild(exist);
                  let index = this.hijosdeHijos.indexOf((parseInt(item.idRow) / 4 + "-" + item.idCol + "-Table").toString());
                  this.hijosdeHijos[index] = '';
                }
              }
            })
            Rows.addEventListener("change", () => {
              let id = Rows.getAttribute("id");
              let Sep = id.split("-");
              let Columnas;
              Columnas = document.getElementById(Sep[0] + "-" + Sep[1] + "-TCols")
              if (!this.hijosdeHijos.includes(parseInt(item.idRow) / 4 + "-" + item.idCol + "-Table")) {
                this.hijosdeHijos.push(parseInt(item.idRow) / 4 + "-" + item.idCol + "-Table");
              }
              if (parseInt(Rows.value) > 0 && parseInt(Columnas.value) > 0) {
                this.CrearTabla(myParent, Rows.value, Columnas.value, item.idRow, item.idCol);
              } else {
                let exist = document.getElementById((parseInt(item.idRow) / 4 + "-" + item.idCol + "-Table").toString());
                if (exist != undefined) {
                  myParent.removeChild(exist);
                  let index = this.hijosdeHijos.indexOf((parseInt(item.idRow) / 4 + "-" + item.idCol + "-Table").toString());
                  this.hijosdeHijos[index] = '';
                }
              }
            })
            removeColumn.addEventListener("click", () => {
              let id = addRow.getAttribute("id");
              let Sep = id.split("-");
              let Tabla;
              Tabla = document.getElementById(Sep[0] + "-" + Sep[1] + "-Table");
              let Cols;
              Cols = document.getElementById(Sep[0] + "-" + Sep[1] + "-TCols");
              let Rows;
              Rows = document.getElementById(Sep[0] + "-" + Sep[1] + "-TRows");

              for (let i = 0; i < Rows.value; i++) {
                let tr;
                tr = document.getElementById(Tabla.id + "-" + i);
                tr.deleteCell(parseInt(Cols.value) - 1);
              }
              Cols.value = Cols.value - 1;
            });
            addColumn.addEventListener("click", () => {
              let id = addRow.getAttribute("id");
              let Sep = id.split("-");
              let Tabla;
              Tabla = document.getElementById(Sep[0] + "-" + Sep[1] + "-Table");
              let Cols;
              Cols = document.getElementById(Sep[0] + "-" + Sep[1] + "-TCols");
              let Rows;
              Rows = document.getElementById(Sep[0] + "-" + Sep[1] + "-TRows");

              for (let i = 0; i < Rows.value; i++) {
                let tr;
                tr = document.getElementById(Tabla.id + "-" + i);
                const td = tr.insertCell();
                td.id = (parseInt(item.idRow) / 4 + "-" + item.idCol + "-Table-" + i + "-" + Cols.value).toString();
                td.addEventListener("click", () => {
                  this.selecManulRespuestas("table", td.id);
                });
                td.style.cssText = "word-wrap:break-word; text-align: end;";
                td.style.border = '1px solid black';
              }
              Cols.value = (parseInt(Cols.value) + 1).toString();
            });
            removeRow.addEventListener("click", () => {
              let id = removeRow.getAttribute("id");
              let Sep = id.split("-");
              let Tabla;
              Tabla = document.getElementById(Sep[0] + "-" + Sep[1] + "-Table");
              let Cols;
              Cols = document.getElementById(Sep[0] + "-" + Sep[1] + "-TCols");
              let Rows;
              Rows = document.getElementById(Sep[0] + "-" + Sep[1] + "-TRows");
              Tabla.deleteRow(Rows.value - 1);
              Rows.value = Rows.value - 1;
            });
            addRow.addEventListener("click", () => {
              let id = addRow.getAttribute("id");
              let Sep = id.split("-");
              let Tabla;
              Tabla = document.getElementById(Sep[0] + "-" + Sep[1] + "-Table");
              let Cols;
              Cols = document.getElementById(Sep[0] + "-" + Sep[1] + "-TCols");
              let Rows;
              Rows = document.getElementById(Sep[0] + "-" + Sep[1] + "-TRows");
              const tr = Tabla.insertRow();

              for (let i = 0; i < Cols.value; i++) {
                const td = tr.insertCell();
                td.id = (parseInt(item.idRow) / 4 + "-" + item.idCol + "-Table-" + Rows.value + "-" + i).toString();
                td.addEventListener("click", () => {
                  this.selecManulRespuestas("table", td.id);
                });

                td.style.cssText = "word-wrap:break-word; text-align: end;";

                td.style.border = '1px solid black';

              }
              tr.id = (parseInt(item.idRow) / 4 + "-" + item.idCol + "-Table-" + Rows.value).toString();
              Rows.value = (parseInt(Rows.value) + 1).toString();
            });
            this.hijosdeHijos.push(parseInt(item.idRow) / 4 + "-" + item.idCol + "-Table");

            this.CrearTabla(myParent, Rows.value, Columns.value, item.idRow, item.idCol);
            let items = item.texto.split("|");
            let contador = 0;
            for (let i = 0; i < parseInt(Rows.value); i++) {
              for (let j = 0; j < parseInt(Columns.value); j++) {
                let a = document.getElementById((parseInt(item.idRow) / 4 + "-" + item.idCol + "-Table-" + i + "-" + j).toString());
                a.appendChild(document.createTextNode(items[contador]));
                contador++;
              }
            }
          }
        }
        return item;
      });
      let ids = this.resultadosTabla[0].indicadores;
      this.idSelecionados = ids.split(",", 2);
      this.getindIcadores();
    });
  }

  contadoModel = 0;

  agregarFila(content) {
    if (this.NombreReporte == "") {
      return Swal.fire("Ingrese titulo del tablero antes de continuar")
    }
    if (this.contadoModel >= 0) {
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
      this.idSelec * 4;
    button.style.cssText =
      "width:1%;height:30px;font-size: 1.5rem;color: red;align-items: center;background-color: transparent;border-color: transparent;grid-column: 5/12; margin-top:20px; grid-row: " +
      this.idSelec * 4;
    button.textContent = "Eliminar";

    myParent.appendChild(selectList);
    myParent.appendChild(button);

    button.addEventListener("click", () => {
      let idRow = button.getAttribute("id");
      if (this.hijos[parseInt(idRow)] != undefined) {
        for (let h = 0; h < this.hijos[parseInt(idRow)].length; h++) {
          let a = this.hijos[parseInt(idRow)][h].toString();
          for (let k = 0; k < this.hijosdeHijos.length; k++) {
            if (this.hijosdeHijos[k].includes(a)) {
              let child = document.getElementById(this.hijosdeHijos[k].toString());
              this.enviar.forEach(element => {
                if (element.idElement == this.hijosdeHijos[k].toString()) {
                  element.guardar = false;
                }
              });
              myParent.removeChild(child);
              this.hijosdeHijos[k] = "";
            }
          }
          this.enviar.forEach(element => {
            if (element.idElement == this.hijos[parseInt(idRow)][h].toString()) {
              element.guardar = false;
            }
          });
          let child = document.getElementById(a);
          myParent.removeChild(child);
        }
        this.hijos[parseInt(idRow)].splice(0, this.hijos[parseInt(idRow)].length);
      }
      let child = document.getElementById(button.getAttribute("id") + "-");
      this.enviar.forEach(element => {
        if (element.idElement == button.getAttribute("id") + "-" || element.idElement == button.getAttribute("id")) {
          element.guardar = false;
        }
      });
      myParent.removeChild(child);
      myParent.removeChild(button);
      this.enviar = this.enviar.filter(element => element.guardar == true);
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
              let child = document.getElementById(this.hijosdeHijos[k].toString());
              this.enviar.forEach(element => {
                if (element.idElement == this.hijosdeHijos[k].toString()) {
                  element.guardar = false;
                }
              });
              myParent.removeChild(child);
              this.hijosdeHijos[k] = "";
            }
          }
          let child = document.getElementById(a);
          this.enviar.forEach(element => {
            if (element.idElement == this.hijos[parseInt(idRow)][h].toString()) {
              element.guardar = false;
            }
          });
          myParent.removeChild(child);
        }
      }
      this.configuracion[parseInt(idRow)] = [parseInt(idRow) * 4, this.valorSelactNumeos];
      for (let i = 1; i <= this.configuracion[parseInt(idRow)][1]; i++) {
        this.auxhijos.push(idRow + "-" + i.toString());
        this.CrearColumna(myParent, parseInt(idRow) * 4, i);
      }
      this.hijos[parseInt(idRow)] = this.auxhijos;
      this.auxhijos = [];
      this.enviar = this.enviar.filter(element => element.guardar == true);

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
      "Tabla",
    ];

    selectOpciones = document.createElement("select");

    selectOpciones.id = parseInt(idRow) / 4 + "-" + idCol;
    selectOpciones.className = "rounded";

    if (this.valorSelactNumeos == "1") {
      selectOpciones.style.cssText = "width:100%; height:40px; grid-column: 1/4;grid-row:" + (parseInt(idRow) + 1) + ";";
    }

    if (this.valorSelactNumeos != "1") {
      let numero = 12 / this.configuracion[parseInt(idRow) / 4][1];
      selectOpciones.style.cssText =
        "width:100%; height:40px; grid-column: " + (idCol * numero - numero + 1) + " / " + idCol * numero + " ;grid-row:" + (parseInt(idRow) + 1) + ";";
    }

    myParent.appendChild(selectOpciones);

    for (let i = 0; i < opciones.length; i++) {
      var option = document.createElement("option");
      option.value = opciones[i];
      option.text = opciones[i];
      selectOpciones.appendChild(option);
    }

    this.addData(selectOpciones, parseInt(idRow) / 4, idCol, "select2");

    selectOpciones.addEventListener("change", () => {
      let input = document.createElement("textarea");
      let diagramaBarras = document.createElement("div");
      for (let k = 0; k < this.hijosdeHijos.length; k++) {
        if (this.hijosdeHijos[k].includes((parseInt(idRow) / 4 + "-" + idCol).toString())) {
          let child = document.getElementById(this.hijosdeHijos[k].toString());
          myParent.removeChild(child);
          this.hijosdeHijos[k] = "";
        }
      }

      if (this.valorSelactNumeos == "1") {
        input.style.cssText = "width:100%; height:100px; grid-column: 1/12;grid-row:" + (parseInt(idRow) + 2) + ";";
      }

      if (this.valorSelactNumeos != "1") {
        let numero = 12 / this.configuracion[parseInt(idRow) / 4][1];
        input.style.cssText = "width:100%; height:100px; grid-column: " + (idCol * numero - numero + 1) + " / " + idCol * numero + " ;grid-row:" + (parseInt(idRow) + 2) + ";";
      }

      if (selectOpciones.value == "Texto/numero") {
        input.id = parseInt(idRow) / 4 + "-" + idCol + "-i";
        this.hijosdeHijos.push(parseInt(idRow) / 4 + "-" + idCol + "-i");
        this.selecManulRespuestas("texto", input.id);
        myParent.appendChild(input);
        this.addData(input, parseInt(idRow) / 4, idCol, "input");

      }

      if (selectOpciones.value == "Tabla") {
        let numero = 12 / this.configuracion[parseInt(idRow) / 4][1];

        let addColumn = document.createElement("button");
        addColumn.id = parseInt(idRow) / 4 + "-" + idCol + "-adCols";
        this.hijosdeHijos.push(parseInt(idRow) / 4 + "-" + idCol + "-adCols");

        let removeColumn = document.createElement("button");
        removeColumn.id = parseInt(idRow) / 4 + "-" + idCol + "-rmCols";
        this.hijosdeHijos.push(parseInt(idRow) / 4 + "-" + idCol + "-rmCols");


        let addRow = document.createElement("button");
        addRow.id = parseInt(idRow) / 4 + "-" + idCol + "-adRows";
        this.hijosdeHijos.push(parseInt(idRow) / 4 + "-" + idCol + "-adRows");

        let removeRow = document.createElement("button");
        removeRow.id = parseInt(idRow) / 4 + "-" + idCol + "-rmRows";
        this.hijosdeHijos.push(parseInt(idRow) / 4 + "-" + idCol + "-rmRows");


        let Columns = document.createElement("input");
        Columns.setAttribute("type", "number");
        Columns.setAttribute("placeholder", "Columnas")
        Columns.id = parseInt(idRow) / 4 + "-" + idCol + "-TCols";
        this.hijosdeHijos.push(parseInt(idRow) / 4 + "-" + idCol + "-TCols");

        let Rows = document.createElement("input");
        Rows.setAttribute("type", "number");
        Rows.setAttribute("placeholder", "Filas")
        Rows.id = parseInt(idRow) / 4 + "-" + idCol + "-TRows";
        this.hijosdeHijos.push(parseInt(idRow) / 4 + "-" + idCol + "-TRows");
        if (this.valorSelactNumeos == "1") {
          Columns.style.cssText = "width:70%; height:40px; grid-column: 1/2;grid-row:" + (parseInt(idRow) + 2) + ";";
          Rows.style.cssText = "width:70%; height:40px; grid-column: 2/3;grid-row:" + (parseInt(idRow) + 2) + ";";
          addColumn.style.cssText = "width:100%; height:20px; grid-column: 1/2;grid-row:" + (parseInt(idRow) + 2) + ";";
          removeColumn.style.cssText = "width:100%; height:40px; grid-column: 1/2;grid-row:" + (parseInt(idRow) + 2) + ";";
          addColumn.style.backgroundColor = "#008F39";
          removeColumn.style.backgroundColor = "red";
          addRow.style.cssText = "width:100%; height:20px; grid-column: 2/3;grid-row:" + (parseInt(idRow) + 2) + ";";
          removeRow.style.cssText = "width:100%; height:40px; grid-column: 2/3;grid-row:" + (parseInt(idRow) + 2) + ";";
          addRow.style.backgroundColor = "#008F39";
          removeRow.style.backgroundColor = "red";
        }
        else {
          Columns.style.cssText = "width:70%; height:40px; grid-column:" + (idCol * numero - numero + 1) +
            " / " + (idCol * numero - numero + 2) + ";grid-row:" + (parseInt(idRow) + 2) + ";";
          Rows.style.cssText = "width:70%; height:40px; grid-column: " + (idCol * numero - numero + 2) +
            " / " + (idCol * numero - numero + 3) + ";grid-row:" + (parseInt(idRow) + 2) + ";";
          addColumn.style.cssText = "width:100%; height:20px; grid-column:" + (idCol * numero - numero + 1) +
            " / " + (idCol * numero - numero + 2) + ";grid-row:" + (parseInt(idRow) + 2) + ";";
          removeColumn.style.cssText = "width:100%; height:40px; grid-column:" + (idCol * numero - numero + 1) +
            " / " + (idCol * numero - numero + 2) + ";grid-row:" + (parseInt(idRow) + 2) + ";";
          addColumn.style.backgroundColor = "#008F39";
          removeColumn.style.backgroundColor = "red";
          addRow.style.cssText = "width:100%; height:20px; grid-column:" + (idCol * numero - numero + 2) +
            " / " + (idCol * numero - numero + 3) + ";grid-row:" + (parseInt(idRow) + 2) + ";";
          removeRow.style.cssText = "width:100%; height:40px; grid-column:" + (idCol * numero - numero + 2) +
            " / " + (idCol * numero - numero + 3) + ";grid-row:" + (parseInt(idRow) + 2) + ";";
          addRow.style.backgroundColor = "#008F39";
          removeRow.style.backgroundColor = "red";
        }

        myParent.appendChild(removeColumn);
        myParent.appendChild(addColumn);
        myParent.appendChild(removeRow);
        myParent.appendChild(addRow);
        myParent.appendChild(Columns);
        myParent.appendChild(Rows);

        removeColumn.style.display = "none";
        addColumn.style.display = "none";
        removeRow.style.display = "none";
        addRow.style.display = "none";

        Columns.addEventListener("change", () => {
          let id = Columns.getAttribute("id");
          let Sep = id.split("-");
          let Filas;
          Filas = document.getElementById(Sep[0] + "-" + Sep[1] + "-TRows")
          if (!this.hijosdeHijos.includes(parseInt(idRow) / 4 + "-" + idCol + "-Table")) {
            this.hijosdeHijos.push(parseInt(idRow) / 4 + "-" + idCol + "-Table");
          }
          if (parseInt(Filas.value) > 0 && parseInt(Columns.value) > 0) {
            this.CrearTabla(myParent, Filas.value, Columns.value, idRow, idCol);
          } else {
            let exist = document.getElementById((parseInt(idRow) / 4 + "-" + idCol + "-Table").toString());
            if (exist != undefined) {
              myParent.removeChild(exist);
              let index = this.hijosdeHijos.indexOf((parseInt(idRow) / 4 + "-" + idCol + "-Table").toString());
              this.hijosdeHijos[index] = '';
            }
          }
        })
        Rows.addEventListener("change", () => {
          let id = Rows.getAttribute("id");
          let Sep = id.split("-");
          let Columnas;
          Columnas = document.getElementById(Sep[0] + "-" + Sep[1] + "-TCols")
          if (!this.hijosdeHijos.includes(parseInt(idRow) / 4 + "-" + idCol + "-Table")) {
            this.hijosdeHijos.push(parseInt(idRow) / 4 + "-" + idCol + "-Table");
          }
          if (parseInt(Rows.value) > 0 && parseInt(Columnas.value) > 0) {
            this.CrearTabla(myParent, Rows.value, Columnas.value, idRow, idCol);
          } else {
            let exist = document.getElementById((parseInt(idRow) / 4 + "-" + idCol + "-Table").toString());
            if (exist != undefined) {
              myParent.removeChild(exist);
              let index = this.hijosdeHijos.indexOf((parseInt(idRow) / 4 + "-" + idCol + "-Table").toString());
              this.hijosdeHijos[index] = '';
            }
          }
        })
        removeColumn.addEventListener("click", () => {
          let id = addRow.getAttribute("id");
          let Sep = id.split("-");
          let Tabla;
          Tabla = document.getElementById(Sep[0] + "-" + Sep[1] + "-Table");
          let Cols;
          Cols = document.getElementById(Sep[0] + "-" + Sep[1] + "-TCols");
          let Rows;
          Rows = document.getElementById(Sep[0] + "-" + Sep[1] + "-TRows");

          for (let i = 0; i < Rows.value; i++) {
            let tr;
            tr = document.getElementById(Tabla.id + "-" + i);
            tr.deleteCell(parseInt(Cols.value) - 1);
          }
          Cols.value = Cols.value - 1;
        });
        addColumn.addEventListener("click", () => {
          let id = addRow.getAttribute("id");
          let Sep = id.split("-");
          let Tabla;
          Tabla = document.getElementById(Sep[0] + "-" + Sep[1] + "-Table");
          let Cols;
          Cols = document.getElementById(Sep[0] + "-" + Sep[1] + "-TCols");
          let Rows;
          Rows = document.getElementById(Sep[0] + "-" + Sep[1] + "-TRows");

          for (let i = 0; i < Rows.value; i++) {
            let tr;
            tr = document.getElementById(Tabla.id + "-" + i);
            const td = tr.insertCell();
            td.id = (parseInt(idRow) / 4 + "-" + idCol + "-Table-" + i + "-" + Cols.value).toString();
            td.addEventListener("click", () => {
              this.selecManulRespuestas("table", td.id);
            });
            td.style.cssText = "word-wrap:break-word; text-align: end;";
            td.style.border = '1px solid black';
          }
          Cols.value = (parseInt(Cols.value) + 1).toString();
        });
        removeRow.addEventListener("click", () => {
          let id = removeRow.getAttribute("id");
          let Sep = id.split("-");
          let Tabla;
          Tabla = document.getElementById(Sep[0] + "-" + Sep[1] + "-Table");
          let Cols;
          Cols = document.getElementById(Sep[0] + "-" + Sep[1] + "-TCols");
          let Rows;
          Rows = document.getElementById(Sep[0] + "-" + Sep[1] + "-TRows");
          Tabla.deleteRow(Rows.value - 1);
          Rows.value = Rows.value - 1;
        });
        addRow.addEventListener("click", () => {
          let id = addRow.getAttribute("id");
          let Sep = id.split("-");
          let Tabla;
          Tabla = document.getElementById(Sep[0] + "-" + Sep[1] + "-Table");
          let Cols;
          Cols = document.getElementById(Sep[0] + "-" + Sep[1] + "-TCols");
          let Rows;
          Rows = document.getElementById(Sep[0] + "-" + Sep[1] + "-TRows");
          const tr = Tabla.insertRow();

          for (let i = 0; i < Cols.value; i++) {
            const td = tr.insertCell();
            td.id = (parseInt(idRow) / 4 + "-" + idCol + "-Table-" + Rows.value + "-" + i).toString();
            td.addEventListener("click", () => {
              this.selecManulRespuestas("table", td.id);
            });

            td.style.cssText = "word-wrap:break-word; text-align: end;";

            td.style.border = '1px solid black';

          }
          tr.id = (parseInt(idRow) / 4 + "-" + idCol + "-Table-" + Rows.value).toString();
          Rows.value = (parseInt(Rows.value) + 1).toString();
        });
      }

      if (selectOpciones.value == "Diagrama de barras") {
        diagramaBarras.id = (parseInt(idRow) / 4 + "-" + idCol + "-bar").toString();
        let valor = 0;
        this.divVariables = true;
        this.myParentGrafica = myParent;
        this.idRowGrafica = idRow;
        this.idColGrafica = idCol;
        this.tipoGrafica = "bar";
        this.modalService.open(this.contenModal);
      }

      if (selectOpciones.value == "Diagrama de torta") {
        diagramaBarras.id = (parseInt(idRow) / 4 + "-" + idCol + "-pie").toString();
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
        diagramaBarras.id = (parseInt(idRow) / 4 + "-" + idCol + "-line").toString();
        let valor = 0;

        this.divVariables = true;
        this.myParentGrafica = myParent;
        this.idRowGrafica = idRow;
        this.idColGrafica = idCol;
        this.tipoGrafica = "line";
        this.modalService.open(this.contenModal);
      }
      this.enviar = this.enviar.filter(element => element.guardar == true);

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

    document.getElementById(parseInt(idRow) / 4 + "-" + idCol + "-adRows").style.display = "inline";
    document.getElementById(parseInt(idRow) / 4 + "-" + idCol + "-rmRows").style.display = "inline";
    document.getElementById(parseInt(idRow) / 4 + "-" + idCol + "-adCols").style.display = "inline";
    document.getElementById(parseInt(idRow) / 4 + "-" + idCol + "-rmCols").style.display = "inline";

    tbl.style.border = '1px solid black';
    if (this.valorSelactNumeos == "1") {
      tbl.style.cssText = "width:100%; height:100px; table-layout: fixed; grid-column: 1/12;grid-row:" + (parseInt(idRow) + 3) + ";";
    }
    else {
      tbl.style.cssText = "width:100%; height:100px; table-layout: fixed; grid-column:" + (idCol * numero - numero + 1) +
        " / " + (idCol * numero) + ";grid-row:" + (parseInt(idRow) + 3) + ";";
    }
    for (let i = 0; i < Filas; i++) {
      const tr = tbl.insertRow();
      tr.id = (parseInt(idRow) / 4 + "-" + idCol + "-Table-" + i).toString();
      for (let j = 0; j < Columnas; j++) {
        const td = tr.insertCell();
        td.id = (parseInt(idRow) / 4 + "-" + idCol + "-Table-" + i + "-" + j).toString();
        td.addEventListener("click", () => {
          this.selecManulRespuestas("table", td.id);
        });
        td.style.cssText = "word-wrap:break-word; text-align: end;";

        td.style.border = '1px solid black';
      }
    }
    Parent.appendChild(tbl);
    let contador = 0;
    this.enviar.forEach((element) => {
      if (element.tipo == "Table" && element.idElement == tbl.id) {
        contador++;
      }
    });
    if (contador == 0) {
      this.addData(tbl, idRow, idCol, "Table");
    }
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
          this.datosManual(funcion, id);
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
          if (funcion == "table") {
            if (varInput.lastChild) {
              varInput.removeChild(varInput.lastChild);
            }
            varInput.appendChild(document.createTextNode(this.arrayId[id]));
          }
          Swal.close();
        });
      },
    });
  }

  async datosManual(funcion, id?) {
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

      if (funcion == "table") {
        let a = document.getElementById(id);
        if (a.lastChild) {
          a.removeChild(a.lastChild);
        }
        a.appendChild(document.createTextNode(text));
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

  limpiarData() {
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
    //this.botonGraficar = false;
    //this.mostrarBotonMenosColumnas = true;
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
    // if (this.arrayData.length > this.arrayColumnas.length) {
    //   Swal.fire("No puedes tener mas valores que columnas");
    //   return true;
    // }
    let grafica = {
      label: this.nombreVariable,
      data: this.arrayData,
      backgroundColor: this.arrayColores,
      //borderColor: this.colors,
      borderColor: this.coloresInput,
      borderWidth: 1.5,
      tension: 0.1,
    };
    this.dataVisualizar = this.dataInput;
    this.columnasVisualizar = this.columnasInput;
    this.data.push(grafica);
    // this.dataInput = "";
    // //this.columnasInput = "";
    // this.mostrarBotonMenosColumnas = false;
    // this.coloresInput = "";
    // this.nombreVariable = "";
    // this.auxDataInput = 0;
    // //this.auxColumnaInput = 0;
    // this.auxColoresInput = 0;
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
    // this.data = [];
    // this.arrayColumnas = [];
    // this.dataVisualizar = "";
    // this.coloresVisualizar = [];
    // this.columnasVisualizar = "";
    // this.columnasInput = "";
    // this.coloresInput = "";
    // this.nombreVariable = "";
    // this.nombreGrafica = "";
    // this.botonGraficar = false;
    // this.mostrarBotonMenosColumnas = true;
    this.modalService.dismissAll();
  }

  grafica(myParent, idRow, idCol, data, columnas, type) {
    data = JSON.parse(data);
    this.hijosdeHijos.push(parseInt(idRow) / 4 + "-" + idCol + "-" + type.toString());
    this.contadorId++;
    let ctx = document.createElement("canvas");

    if (this.valorSelactNumeos == "1") {
      ctx.style.cssText =
        "margin-top:20px; width:100%; height:100%; grid-column: 1/12;grid-row:" +
        (parseInt(idRow) + 2) +
        ";";
    }

    if (this.valorSelactNumeos != "1") {
      let numero = 12 / this.configuracion[parseInt(idRow) / 4][1];
      ctx.style.cssText =
        "margin-top:20px; width:100%; height:100%; grid-column: " +
        (idCol * numero - numero + 1) +
        " / " +
        idCol * numero +
        " ;grid-row:" +
        (parseInt(idRow) + 2) +
        ";";
    }
    Chart.register(ChartDataLabels);
    ctx.id = parseInt(idRow) / 4 + "-" + idCol + "-" + type.toString();
    this.addData(ctx, parseInt(idRow) / 4, idCol, type.toString(), "", "", this.nombreGrafica, JSON.stringify(data), columnas.toString());
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

  cerrarModal() {
    // this.data = [];
    // this.dataInput = "";
    // this.columnasInput = "";
    // this.coloresInput = "";
    // this.nombreVariable = "";
    // this.nombreGrafica = "";
    // this.auxDataInput = 0;
    // this.auxColumnaInput = 0;
    // this.auxColoresInput = 0;
    // this.dataVisualizar = "";
    // this.coloresVisualizar = [];
    // this.columnasVisualizar = "";
    // this.botonGraficar = false;
    // this.mostrarBotonMenosColumnas = true;
    this.modalService.dismissAll();
  }

  guardar() {
    this.enviar = this.enviar.filter(element => element.idElement != undefined);
    if (this.NombreReporte == "") {
      Swal.fire("Debe ingresar nombre del reporte")
    }
    else if (this.enviar[0] == undefined || this.enviar[0] == null) {
      Swal.fire("Debe ingresar alguna fila")
    }
    else {
      this.enviar.forEach(element => {
        if (element.tipo == "Table") {
          let id = element.idElement;
          let Sep = id.split("-");
          let Rows;
          Rows = document.getElementById(Sep[0] + "-" + Sep[1] + "-TRows");
          let Cols;
          Cols = document.getElementById(Sep[0] + "-" + Sep[1] + "-TCols");
          element.valor = Cols.value + "-" + Rows.value;
          element.texto = "";
          for (let i = 0; i < Rows.value; i++) {
            for (let j = 0; j < Cols.value; j++) {
              var valor = document.getElementById(Sep[0] + "-" + Sep[1] + "-Table-" + i + "-" + j).firstChild
              if (valor != null || valor != undefined) {
                element.texto += (valor.nodeValue) + "|";
              }
              else {
                element.texto += "|";
              }
            }
          }
        }
        else {
          let a: any;
          a = document.getElementById(element.idElement.toString());
          element.valor = a.value;
        }
      });
      this.enviar[0].nombreReporte = this.NombreReporte;
      this.reportesService.GuardarReporteDetail(this.enviar).subscribe((res: any) => {
        if (res.result = "Guardado") {
          Swal.fire("Guardado con éxito");
          setTimeout(() => {
            this.router.navigate(["reportes-tableros"]);
          }, 1000);
        }
        return res;
      });
    }

  }

  finalizar() {
    this.enviar = this.enviar.filter(element => element.idElement != undefined);
    if (this.NombreReporte == "") {
      Swal.fire("Debe ingresar nombre del reporte")
    }
    else if (this.enviar[0] == undefined || this.enviar[0] == null) {
      Swal.fire("Debe ingresar alguna fila")
    }
    else {
      Swal.fire({
        title: "¿Desea finalizar el reporte?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.enviar.forEach(element => {
            if (element.tipo == "Table") {
              let id = element.idElement;
              let Sep = id.split("-");
              let Rows;
              Rows = document.getElementById(Sep[0] + "-" + Sep[1] + "-TRows");
              let Cols;
              Cols = document.getElementById(Sep[0] + "-" + Sep[1] + "-TCols");
              element.valor = Cols.value + "-" + Rows.value;
              element.texto = "";
              for (let i = 0; i < Rows.value; i++) {
                for (let j = 0; j < Cols.value; j++) {
                  var valor = document.getElementById(Sep[0] + "-" + Sep[1] + "-Table-" + i + "-" + j).firstChild
                  if (valor != null || valor != undefined) {
                    element.texto += (valor.nodeValue) + "|";
                  }
                  else {
                    element.texto += "|";
                  }
                }
              }
            }
            else {
              let a: any;
              a = document.getElementById(element.idElement.toString());
              element.valor = a.value;
            }
          });
          this.enviar[0].nombreReporte = this.NombreReporte;
          this.reportesService.FinalizarReporte(this.enviar).subscribe((res: any) => {
            if (res.result = "Guardado") {
              Swal.fire("Guardado con éxito");
              this.router.navigate(["reportes-tableros"]);
            }
            return res;
          });
        } else if (result.isDenied) {
        }
      });
    }
  }


  NombreReporte = "";

  addData(item, idRow, idCol, tipo, valor?, texto?, titulo_grafica?, datos?, columnas?) {
    this.enviar.push({
      item: item,
      columnas: columnas,
      datos: datos,
      html: (item.innerHTML),
      idcol: parseInt(idCol),
      idElement: item.id,
      idReporte: this.Reporte.id,
      idRow: parseInt(idRow),
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
    })
  }
}
