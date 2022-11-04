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
  idSelec = 0;
  indicadores: any = [];
  select =
    "<div class='row'> <div class='col-4'> <select id='selector' class='rounded' style='width:90%; height:40px; margin-bottom:10px;' [(ngModel)]='Select3' (change)='prueba()' > <option style='width:360px; height:100px;' =''>Seleccione una opción</option> <option ='1'>1</option> <option ='2'>2</option> <option ='3'>3</option> <option ='4'>4</option> </select> </div> </div>";

  select2 =
    "<div class='row'> <div class='col-4'> <select id='" +
    this.con.toString() +
    "' class='rounded' style='width:90%; height:40px; margin-bottom:10px;' [(ngModel)]='Select3' (change)='prueba()' > <option style='width:360px; height:100px;' =''>Seleccione una opción</option> <option ='taxto'>Texto/Numero</option> <option ='barras'>Diagrama de barras</option> <option ='torta'>Diagrama de torta</option> <option ='puntos'>Diagrama de puntos</option> </select> </div> <div class='col-4'> <select id='selector' class='rounded' style='width:90%; height:40px; margin-bottom:10px;' [(ngModel)]='Select3' (change)='prueba()' > <option style='width:360px; height:100px;' =''>Seleccione una opción</option> <option ='taxto'>Texto/Numero</option> <option ='barras'>Diagrama de barras</option> <option ='torta'>Diagrama de torta</option> <option ='puntos'>Diagrama de puntos</option> </select> </div>  </div>";

  select3 =
    "<div class='row'> <div class='col-4'> <select id='selector' class='rounded' style='width:90%; height:40px; margin-bottom:10px;' [(ngModel)]='Select3' (change)='prueba()' > <option style='width:360px; height:100px;' =''>Seleccione una opción</option> <option ='taxto'>Texto/Numero</option> <option ='barras'>Diagrama de barras</option> <option ='torta'>Diagrama de torta</option> <option ='puntos'>Diagrama de puntos</option> </select> </div> <div class='col-4'> <select id='selector' class='rounded' style='width:90%; height:40px; margin-bottom:10px;' [(ngModel)]='Select3' (change)='prueba()' > <option style='width:360px; height:100px;' =''>Seleccione una opción</option> <option ='taxto'>Texto/Numero</option> <option ='barras'>Diagrama de barras</option> <option ='torta'>Diagrama de torta</option> <option ='puntos'>Diagrama de puntos</option> </select> </div> <div class='col-4'> <select id='selector' class='rounded' style='width:90%; height:40px; margin-bottom:10px;' [(ngModel)]='Select3' (change)='prueba()' > <option style='width:360px; height:100px;' =''>Seleccione una opción</option> <option ='taxto'>Texto/Numero</option> <option ='barras'>Diagrama de barras</option> <option ='torta'>Diagrama de torta</option> <option ='puntos'>Diagrama de puntos</option> </select> </div>  </div>";
  select4 =
    "<div class='row'> <div class='col-3'> <select id='selector' class='rounded' style='width:90%; height:40px; margin-bottom:10px;' [(ngModel)]='Select3' (change)='prueba()' > <option style='width:360px; height:100px;' =''>Seleccione una opción</option> <option ='taxto'>Texto/Numero</option> <option ='barras'>Diagrama de barras</option> <option ='torta'>Diagrama de torta</option> <option ='puntos'>Diagrama de puntos</option> </select> </div> <div class='col-3'> <select id='selector' class='rounded' style='width:90%; height:40px; margin-bottom:10px;' [(ngModel)]='Select3' (change)='prueba()' > <option style='width:360px; height:100px;' =''>Seleccione una opción</option> <option ='taxto'>Texto/Numero</option> <option ='barras'>Diagrama de barras</option> <option ='torta'>Diagrama de torta</option> <option ='puntos'>Diagrama de puntos</option> </select> </div> <div class='col-3'> <select id='selector' class='rounded' style='width:90%; height:40px; margin-bottom:10px;' [(ngModel)]='Select3' (change)='prueba()' > <option style='width:360px; height:100px;' =''>Seleccione una opción</option> <option ='taxto'>Texto/Numero</option> <option ='barras'>Diagrama de barras</option> <option ='torta'>Diagrama de torta</option> <option ='puntos'>Diagrama de puntos</option> </select> </div> <div class='col-3'> <select id='selector' class='rounded' style='width:90%; height:40px; margin-bottom:10px;' [(ngModel)]='Select3' (change)='prueba()' > <option style='width:360px; height:100px;' =''>Seleccione una opción</option> <option ='taxto'>Texto/Numero</option> <option ='barras'>Diagrama de barras</option> <option ='torta'>Diagrama de torta</option> <option ='puntos'>Diagrama de puntos</option> </select> </div> </div>";

  div = "<div class='contenedorAgregar1'>";
  input = "<input class='rounded-pill text-center h-40px w-25' type='text'/>";

  d =
    "<select id='selector1'  class='selector' [(ngModel)]='Select3' onchange='prueba()'><option value='3'>Selecciona tipo de usuario</option> <option value='p'>Selecciona tipo de usuario</option></select>";
  array: any = [];

  ngOnInit() {
    this.ReportesService.reportesUsar.subscribe((res) => {
      this.indicadores = res;
    });
    console.log("prueba : ", this.indicadores);
  }

  resultado = $("#selector1").change(function () {
    var estado = $("#selector1").val();
    alert(estado);
  });

  prueba() {
    alert("hola");
  }

  agregarFila() {
    let myParent = document.getElementById("contenedor");
    // prueba.innerHTML = this.d;
    // prueba.addEventListener("change", () => {
    //   alert("hola");
    // });

    //let select = document.querySelector(".selector");

    //myParent.innerHTML += this.d

    //let select = document.querySelector(".selector");

    // select.addEventListener("change", ()=>{
    //     alert("hola: ")
    // })

    let selectList = document.createElement("select");

    //Create array of options to be added
    var array = ["Seleccione una opcion", "1", "2", "3", "4"];
    var opciones = [
      "Seleccione una opcion",
      "Texto/numero",
      "Diagrama de barras",
      "Diagrama de torta",
      "Diagrama de puntos",
    ];

    this.idSelec++;
    selectList.id = this.idSelec.toString();
    console.log("id selec: ", this.idSelec);
    selectList.className = "rounded";
    selectList.style.cssText =
      "width:22%; height:40px; grid-row: '" +
      this.fila++ +
      "'/ '" +
      this.fila++ +
      "'; grid-column: 1/5;";

    //selectList.style.height = "40px";
    myParent.appendChild(selectList);

    //Create and append the options
    for (var i = 0; i < array.length; i++) {
      var option = document.createElement("option");
      option.value = array[i];
      option.text = array[i];
      selectList.appendChild(option);
    }

    let cont = 0;
    let selectOpciones;

    selectList.addEventListener("change", () => {
      let axt = parseInt(selectList.value);
      for (let i = 1; i <= axt; i++) {
        selectOpciones = document.createElement("select");

        selectOpciones.id = "selectOpciones";
        selectOpciones.className = "rounded";
        selectOpciones.style.cssText = "width:90%; height:40px";

        myParent.appendChild(selectOpciones);

        for (let i = 0; i < opciones.length; i++) {
          var option = document.createElement("option");
          option.value = opciones[i];
          option.text = opciones[i];
          selectOpciones.appendChild(option);
        }
      }

      // let p = document.getElementById("selectOpciones");
      // p.addEventListener("change", () => {
      //   if (p.value == "Texto/numero") {
      //     alert("hola");
      //   }
      // });

      //   let input = document.createElement("input");
      //   input.type = "text";
      //   myParent.appendChild(input);

      //  let idEjemplo = document.getElementById("mySelect").value

      //   console.log(idEjemplo)
    });

    console.log("hola: ", this.fila);
  }

  guardar() {
    let html = document.getElementById("contenedor").innerHTML;
    console.log(html);
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
}
