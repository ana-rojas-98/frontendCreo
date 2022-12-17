import { CargandoService } from "./../../services/cargando.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { FormControl } from "@angular/forms";
import Swal from "sweetalert2";
import { ReportesService } from "src/app/services/reportes.service";
import * as $ from "jquery";

@Component({
  selector: "app-editar-indicador",
  templateUrl: "./editar-indicador.component.html",
  styleUrls: ["./editar-indicador.component.scss"],
})
export class EditarIndicadorComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    public router: Router,
    private reportesService: ReportesService,
    public cargandoService: CargandoService
  ) {}
  id = 0;

  editar = false;

  accionEditar = "";
  Anio: "";
  Periodo = "";

  mostrar: any = [];
  resultado: any = [];
  enviar: any = [];

  resultadosHTML: any = [];

  anioArray: any = [];
  preciodicidadesArray: any = [];
  uniqueYears: any = [];
  uniquePeriod: any = [];
  estado: any = [];
  elimi: any;

  idArchivo = {
    idArchivo: 1,
  };

  datos = {
    Estandar: "",
    Categoria: "",
    Subcategoria: "",
  };

  Indicador = {
    idIndicador: "",
  };

  Usuario = {
    usuario: "",
  };

  usarioLocalStote = JSON.parse(localStorage.getItem("usario"));
  usuarioid = parseInt(this.usarioLocalStote.usuarioid);
  posicion: any;
  eliminarObj: any;
  eliminados: any = [];

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
  cargando = true;

  bandera = 1;

  Nombre = {
    indicador: "",
  };
  super: any = [];
  contenModal: any;
  Categoria1 = {
    categoria1: "",
    NombreCategoria: "",
  };

  SubCategoria = {
    subcategoria1: "",
    nombreSubcategoria: "",
  };

  allowOutsideClick: false;
  allowEscapeKey: false;

  ngOnInit() {
    this.authService.enviarCorreos().subscribe((res: any) => {});
    this.authService.enviarCorreosIndicadores().subscribe((res: any) => {});

    $(".open").on("click", function () {
      $(".overlay, .modal").addClass("active");
    });

    $(".close, .overlay").on("click", function () {
      $(".overlay, .modal").removeClass("active");
    });

    //this.modalService.open(this.contenModal);
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.accionEditar = this.route.snapshot.paramMap.get("accion");
    if (this.accionEditar == "editar") {
      this.editar = true;
    }
    this.idArchivo.idArchivo = this.id;
    this.getStandares();
    this.getCategoria();
    this.getSubCategoria();
    this.TraerFormato();
  }

  TraerFormato() {
    this.cargandoService.ventanaCargando();
    this.authService.EditarIndicador().subscribe((respuesta: any) => {
      this.resultado = respuesta.map((item) => {
        if (this.idArchivo.idArchivo == item.idArchivo) {
          this.resultadosTabla.push(item);
          this.anioArray.push(item.anio);
          this.preciodicidadesArray.push(item.periodicidad);
          this.Nombre.indicador = item.archivo;
        }
        return item;
      });
      this.filtrar();
      this.selectElement("estandar", this.resultadosTabla[0].estandar);
      this.Estandar.setValue(this.resultadosTabla[0].estandar);
      this.estandar();
      this.selectElement("categoria", this.resultadosTabla[0].categoria1);
      this.Categoria.setValue(this.resultadosTabla[0].categoria1);
      this.categoria();
      this.selectElement("subcategoria", this.resultadosTabla[0].subcategoria1);
      this.Subcategoria.setValue(this.resultadosTabla[0].subcategoria1);
      this.subcategoria();
      if (this.resultado) {
        Swal.close();
      }
    });
  }

  filtrar() {
    this.uniqueYears = [...new Set(this.anioArray)];
    this.uniquePeriod = [...new Set(this.preciodicidadesArray)];
    this.Anio = this.uniqueYears[this.uniqueYears.length - 1];
    this.Periodo = this.uniquePeriod[this.uniquePeriod.length - 1];
    this.cambioAnio();
  }

  cambioAnio() {
    if (this.Anio != "") {
      if (this.Periodo != "") {
        this.resultadosHTML = this.resultadosTabla.filter(
          (an) => an.anio == this.Anio
        );
        this.resultadosHTML = this.resultadosHTML.filter(
          (pe) => pe.periodicidad == this.Periodo
        );
        this.mostrar = this.resultadosHTML;
      }
    }
  }

  cambioPeriodo() {
    if (this.Anio != "") {
      if (this.Periodo != "") {
        this.resultadosHTML = this.resultadosTabla.filter(
          (an) => an.anio == this.Anio
        );
        this.resultadosHTML = this.resultadosHTML.filter(
          (pe) => pe.periodicidad == this.Periodo
        );
        this.mostrar = this.resultadosHTML;
      }
    }
  }

  getStandares() {
    this.authService.getStandares("").subscribe((res: any) => {
      this.resultados = res.map((item) => {
        return item;
      });
    });
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

  estandar() {
    this.getCategoriaFilter(this.Estandar.value);
    this.getSubCategoriaFilter(this.Estandar.value, this.Categoria.value);
    if (this.Estandar.value != "") {
    } else {
      this.getCategoria();
    }
    if (
      this.Estandar.value == "" &&
      this.Categoria.value == "" &&
      this.Subcategoria.value == ""
    ) {
      this.getCategoria();
      this.getStandares();
      this.getSubCategoria();
    }
  }

  categoria() {
    this.getSubCategoriaFilter(this.Estandar.value, this.Categoria.value);
    if (this.Categoria.value != "") {
    } else {
      this.estandar();
      this.getSubCategoria();
    }
    if (
      this.Estandar.value == "" &&
      this.Categoria.value == "" &&
      this.Subcategoria.value == ""
    ) {
      this.getCategoria();
      this.getStandares();
      this.getSubCategoria();
    }
  }

  subcategoria() {
    if (this.Subcategoria.value != "") {
    } else {
      this.categoria();
    }
    if (
      this.Estandar.value == "" &&
      this.Categoria.value == "" &&
      this.Subcategoria.value == ""
    ) {
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

  insertarFila(event) {
    let evento = event.target;
    let insertar = evento.parentNode.parentNode.rowIndex;
    /// (posicion a añadir, posicion eliminar, que cosa agregar o eliminar)
    this.resultadosHTML.splice(insertar, 0, {
      idFormato: parseInt("0"),
      entrada: "text",
      numerop: "no",
      formulap: "no",
      formula: "no",
      valor: "",
      titulo: "no",
      tamanoTexto: parseInt("12"),
      color: "#000",
      negrilla: "no",
      subrayado: "no",
      cursiva: "no",
      inicioCol: parseInt("1"),
      finCol: parseInt("12"),
      saltoLinea: "si",
      html: "",
      alinear: "center",
      colorFondo: "transparent",
      eliminar: "0",
      usuarioId: this.usuarioid,
      idArchivo: this.idArchivo.idArchivo,
      periodicidad: this.Periodo,
      anio: this.Anio,
    });
  }

  eliminarFila(event) {
    let e = event.target;
    let eliminar = e.parentNode.parentNode.rowIndex - 1;
    /// (posicion eliminar, cantidad a eliminar)
    this.eliminarObj = this.resultadosHTML.splice(eliminar, 1);
    this.eliminarObj.map((item) => {
      this.eliminados.push({
        idFormato: item.idFormato,
        eliminar: "1",
        posicion: eliminar,
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
        periodicidad: item.periodicidad,
        anio: parseInt(item.anio),
        alinear: "center",
        colorFondo: "transparent",
        usuarioid: this.usuarioid,
        archivo: this.Nombre.indicador,
        nombreEstandar: this.Estandar.value.toString(),
        nombreCategoria: this.Categoria.value.toString(),
        nombreSubcategoria: this.Subcategoria.value.toString(),
      });
    });
    this.super = this.resultadosHTML;
  }

  guardar() {
    this.cargandoService.ventanaCargando();
    this.super = this.resultadosHTML;
    this.eliminados.map((item1) => {
      this.super.splice(item1.posicion, 0, {
        idFormato: item1.idFormato,
        eliminar: item1.eliminar,
        entrada: item1.entrada,
        numerop: item1.numerop,
        formulap: item1.formulap,
        formula: item1.formula,
        valor: item1.valor,
        titulo: item1.titulo,
        tamanoTexto: parseInt(item1.tamanoTexto),
        color: item1.color,
        negrilla: item1.negrilla,
        subrayado: item1.subrayado,
        cursiva: item1.cursiva,
        inicioCol: parseInt(item1.inicioCol),
        finCol: parseInt(item1.finCol),
        saltoLinea: item1.saltoLinea,
        html: item1.html,
        idArchivo: parseInt(item1.idArchivo),
        periodicidad: item1.periodicidad,
        anio: parseInt(item1.anio),
        alinear: "center",
        colorFondo: "transparent",
        usuarioid: this.usuarioid,
        nombreEstandar: this.Estandar.value.toString(),
        nombreCategoria: this.Categoria.value.toString(),
        nombreSubcategoria: this.Subcategoria.value.toString(),
      });
    });
    this.super.map((item) => {
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
        periodicidad: item.periodicidad,
        anio: parseInt(item.anio),
        alinear: "center",
        colorFondo: "transparent",
        usuarioid: this.usuarioid,
        archivo: this.Nombre.indicador,
        eliminar: parseInt(item.eliminar),
        nombreEstandar: this.Estandar.value.toString(),
        nombreCategoria: this.Categoria.value.toString(),
        nombreSubcategoria: this.Subcategoria.value.toString(),
      });
    });
    this.authService.enviarIndicadorEditado(this.enviar).subscribe((res) => {
      if (res) {
        this.alerta("Editado");
        this.router.navigate(["administrar-indicadores"]);
      }
      return res;
    });
  }
  alerta(mensaje: any) {
    Swal.fire(mensaje);
  }

  selectElement(id, valueToSelect) {
    let element;
    element = document.getElementById(id);
    element.value = valueToSelect;
  }

}
