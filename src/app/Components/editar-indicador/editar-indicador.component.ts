import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { FormControl } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: "app-editar-indicador",
  templateUrl: "./editar-indicador.component.html",
  styleUrls: ["./editar-indicador.component.scss"],
})
export class EditarIndicadorComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    public router: Router
  ) {}
  // Estandar = new FormControl("");
  Categoria = new FormControl("");
  // Subcategoria = new FormControl("");

  id = 0;
  accionEditar = "";
  editar = false;
  resultadosTabla = [];
  resultado: any = [];
  resultadosHTML = [];
  Respuestas = [];
  prueba = "";
  idArchivo = {
    idArchivo: 1,
  };
  resultados = [];
  resultadosCategoria = {};
  resultadosSubCategoria = {};
  datos = {
    Estandar: "",
    Categoria: "",
    Subcategoria: "",
  };

  anioArray = [];
  preciodicidadesArray = [];

  ngOnInit() {
    this.authService.enviarCorreos().subscribe((res: any) => {});
    this.authService.enviarCorreosIndicadores().subscribe((res: any) => {});

    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.accionEditar = this.route.snapshot.paramMap.get("accion");
    if (this.accionEditar == "editar") {
      this.editar = true;
    }
    this.idArchivo.idArchivo = this.id;
    this.TraerFormato();
    this.getStandares();
  }
  uniqueYears = [];
  uniquePeriod = [];
  Anio: "";
  Periodo = "";


  TraerFormato() {
    this.authService.EditarIndicador().subscribe((respuesta: any) => {
      this.resultado = respuesta.map((item) => {
        if (this.idArchivo.idArchivo == item.idArchivo) {
          this.resultadosTabla.push(item);
          this.datos.Estandar = item.nombreEstandar;
          this.datos.Categoria = item.nombreCategoria;
          this.datos.Subcategoria = item.nombreSubcategoria;
          this.anioArray.push(item.anio);
          this.preciodicidadesArray.push(item.periodicidad);
        }
        return item;
      });
      this.filtrar();
    });
  }

  filtrar(){
    this.uniqueYears = [...new Set(this.anioArray)];
    this.uniquePeriod = [...new Set(this.preciodicidadesArray)];
    this.Anio = this.uniqueYears[this.uniqueYears.length - 1];
    this.Periodo = this.uniquePeriod[this.uniquePeriod.length - 1];
  }

  cambioAnio(){
    this.Respuestas = [];
    if (this.Anio != '') {
      if (this.Periodo != '') {
        this.resultadosHTML = this.resultadosTabla.filter(an => an.anio == this.Anio);
        this.resultadosHTML = this.resultadosHTML.filter(pe => pe.periodicidad == this.Periodo);
        let i = 2;
        this.resultadosHTML.forEach(item => (
          this.Respuestas.push(item.valor)
        ));

      }
      else {
        this.prueba = "No se encuentra resultados";
      }
    } else {
      this.prueba = "No se encuentra resultados";
    }
  }

  getStandares() {
    this.authService.getStandares(this.datos.Estandar).subscribe((res: any) => {
      this.resultados = res.map((item) => {
        return item;
      });
    });
  }

  getCategoria(estandar) {
    this.authService.getCategoria(this.Categoria).subscribe((res: any) => {
      this.resultadosCategoria = res.filter(
        (item) => item.nombreEstandar == estandar
      );
    });
  }

  getSubCategoria(categoria) {
    this.authService
      .getSubCategoria(this.datos.Categoria)
      .subscribe((res: any) => {
        this.resultadosSubCategoria = res.filter(
          (item) => item.nombreCategoria == categoria
        );
      });
  }
  ensayo: any = [];
  posicion: any;
  insertarFila() {
    let fila: any;
    let i = 1;
    console.log("entra");
    fila = document.getElementById("tabla");
    this.posicion = this.resultadosTabla.length++ + i;
    var row = fila.insertRow(this.posicion);
    // console.log("fila", fila);
    // console.log("row", row);
    // console.log("posicion variable", posicion);
    //console.log("posicion array", this.resultadosTabla[this.resultadosTabla.length]);
    //console.log("posicion", this.resultadosTabla.length++);
    let cel1 = row.insertCell(0);
    let cel2 = row.insertCell(1);
    let cel3 = row.insertCell(2);
    let cel4 = row.insertCell(3);
    let cel5 = row.insertCell(4);
    let cel6 = row.insertCell(5);
    let cel7 = row.insertCell(6);
    let cel8 = row.insertCell(7);
    let cel9 = row.insertCell(8);
    let cel10 = row.insertCell(9);
    let cel11 = row.insertCell(10);
    let cel12 = row.insertCell(11);
    let cel13 = row.insertCell(12);
    let cel14 = row.insertCell(13);

    cel1.innerHTML = '<input id ="entrada">';
    cel2.innerHTML = "<td></td>";
    cel3.innerHTML = "<td></td>";
    cel4.innerHTML = "<td></td>";
    cel5.innerHTML = "<td></td>";
    cel6.innerHTML = "<td></td>";
    cel7.innerHTML = "<td></td>";
    cel8.innerHTML = "<td></td>";
    cel9.innerHTML = "<td></td>";
    cel10.innerHTML = "<td></td>";
    cel11.innerHTML = "<td></td>";
    cel12.innerHTML = "<td></td>";
    cel13.innerHTML = "<td></td>";
    cel14.innerHTML = "<td></td>";
    let e = <HTMLInputElement>document.getElementById("entrada");
    let ens = e.value;
    this.ensayo.push({ entrada: ens });
  }

  enviar: any = [];
  guardar() {
    console.log("nuevos", this.ensayo);
    this.resultadosTabla.map((item) => {
      this.enviar.push({
        idFormato: item.idFormato,
        entrada: item.entrada,
        numerop: item.numerop,
        formulap: item.formulap,
        formula: item.formula,
        valor: item.valor,
        titulo: item.titulo,
        tamanoTexto: parseInt(item.tamanoTexto),
        color: item.color,
        negrilla: item.negrilla,
        subrayado: item.subrayado,
        cursiva: item.cursiva,
        inicioCol: parseInt(item.inicioCol),
        finCol: parseInt(item.finCol),
        saltoLinea: item.saltoLinea,
        html: item.html,
        idArchivo: parseInt(item.idArchivo),
        nombreEstandar: this.datos.Estandar,
        nombreCategoria: this.datos.Categoria,
        nombreSubcategoria: this.datos.Subcategoria,
      });
    });
    console.log("envia : ", this.enviar);
    // this.authService.enviarIndicadorEsitado(this.enviar).subscribe((res) => {
    //   if (res) {
    //     this.alerta("Editado");
    //     this.router.navigate(["administrar-indicadores"])
    //   }
    //   return res;
    // });
  }
  alerta(mensaje: any) {
    Swal.fire(mensaje);
  }
}
