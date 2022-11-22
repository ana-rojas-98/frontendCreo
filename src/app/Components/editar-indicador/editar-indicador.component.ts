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

  editar = false;

  accionEditar = "";
  Anio: "";
  Periodo = "";

  mostrar: any = [];
  resultado: any = [];
  enviar: any = [];
  resultadoEstandar: any = [];
  resultadosTabla: any = [];
  resultadosHTML: any = [];
  resultados: any = [];
  anioArray: any = [];
  preciodicidadesArray: any = [];
  uniqueYears: any = [];
  uniquePeriod: any = [];
  estado: any = [];
  elimi: any;

  resultadosCategoria: any = [];
  resultadosSubCategoria: any = [];
  idArchivo = {
    idArchivo: 1,
  };

  datos = {
    Estandar: "",
    Categoria: "",
    Subcategoria: "",
  };

  Estandar = {
    estandar: "",
  };
  Indicador = {
    idIndicador: "",
  };

  Usuario = {
    usuario: "",
  };

  Categoria1 = {
    categoria1: "",
    NombreCategoria: "",
  };

  SubCategoria = {
    subcategoria1: "",
    nombreSubcategoria: "",
  };
  usarioLocalStote = JSON.parse(localStorage.getItem("usario"));
  usuarioid = parseInt(this.usarioLocalStote.usuarioid);
  posicion: any;
  eliminarObj:any;
  eliminados:any=[];
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
    this.getStandares(0);
    this.getCategoria(0);
    this.getSubCategoria(0);
  }

  TraerFormato() {
    this.authService.EditarIndicador().subscribe((respuesta: any) => {
      this.resultado = respuesta.map((item) => {
        if (this.idArchivo.idArchivo == item.idArchivo) {
          this.resultadosTabla.push(item);
          this.datos.Estandar = item.nombreEstandar;
          this.anioArray.push(item.anio);
          this.preciodicidadesArray.push(item.periodicidad);
        }
        return item;
      });
      this.filtrar();
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

  getEstandarFilter() {
    if (this.Estandar.estandar == "") {
      return true;
    }
    let dato = parseInt(this.Estandar.estandar);
    this.getCategoria(dato);
    this.resultadosTabla = this.estado.filter((item) => {
      return item.idEstandar == dato;
    });
  }

  getCategoriaFilter() {
    if (this.Categoria1.categoria1 == "") {
      this.getEstandarFilter();
      this.getSubCategoria(0);
      return true;
    }

    let dato = parseInt(this.Categoria1.categoria1);
    this.getSubCategoria(dato);

    this.resultadosTabla = this.estado.filter((item) => {
      return item.idCategoria == dato;
    });
  }

  geSubtCategoriaFilter() {
    if (this.SubCategoria.subcategoria1 == "") {
      this.getCategoriaFilter();
      return true;
    }

    let dato = parseInt(this.SubCategoria.subcategoria1);

    this.resultadosTabla = this.estado.filter((item) => {
      return item.idSubCategoria == dato;
    });
  }

  getStandares(dato) {
    if (dato == 0) {
      this.authService.getStandares("").subscribe((res: any) => {
        this.resultadoEstandar = res.map((item) => {
          return item;
        });
      });
      return true;
    }
  }

  getCategoria(dato) {
    if (dato == 0) {
      this.authService.getCategoria("").subscribe((res: any) => {
        this.resultadosCategoria = res.map((item) => {
          return item;
        });
      });
      return true;
    }
    this.authService.getCategoria("").subscribe((res: any) => {
      this.resultadosCategoria = res.filter((item) => {
        return item.idEstandar == dato;
      });
    });
  }

  getSubCategoria(dato) {
    if (dato == 0) {
      this.authService.getSubCategoria("").subscribe((res: any) => {
        this.resultadosSubCategoria = res.map((item) => {
          return item;
        });
      });
      return true;
    }

    this.authService.getSubCategoria("").subscribe((res: any) => {
      this.resultadosSubCategoria = res.filter((item) => {
        return item.idCategoria == dato;
      });
    });
  }

insertarFila(event) {     
  let evento = event.target;
  let insertar=evento.parentNode.parentNode.rowIndex;
/// (posicion a añadir, posicion eliminar, que cosa agregar o eliminar)
this.resultadosHTML.splice(insertar,0,{
  idFormato:parseInt("0") ,
  entrada: "text",
  numerop: "no",
  formulap: "no",
  formula: "no",
  valor:"",
  titulo: "no",
  tamanoTexto: parseInt("12"),
  color: "#000",
  negrilla: "no",
  subrayado:"no",
  cursiva: "no",
  inicioCol: parseInt("1"),
  finCol: parseInt("12"),
  saltoLinea: "si",
  html: "",
  alinear: "ensayo",
  colorFondo:"ensayos",
  eliminar:"0",
  usuarioId: this.usuarioid,
  idArchivo: this.idArchivo.idArchivo,
  periodicidad: this.Periodo,
  anio: this.Anio,
})
}


eliminarFila(event){
  let e=event.target;
  let eliminar=e.parentNode.parentNode.rowIndex-1;
  /// (posicion eliminar, cantidad a eliminar)
  this.eliminarObj=this.resultadosHTML.splice(eliminar,1);
   this.eliminarObj.map((item)=>{
    this.eliminados.push(
      {
        idFormato:item.idFormato,
        eliminar:"1",
        posicion:eliminar,
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
        nombreEstandar: this.datos.Estandar,
        nombreCategoria: this.datos.Categoria,
        nombreSubcategoria: this.datos.Subcategoria,
      })
   })
}
 


  guardar() {   
    this.eliminados.map((item1)=>{
        this.resultadosHTML.splice(item1.posicion,0,{
          idFormato:item1.idFormato,
          eliminar:item1.eliminar,
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
          nombreEstandar: this.datos.Estandar,
          nombreCategoria: this.datos.Categoria,
          nombreSubcategoria: this.datos.Subcategoria,
        });
    });
    this.resultadosHTML.map((item) => {
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
        eliminar:item.eliminar,
        nombreEstandar: this.datos.Estandar,
        nombreCategoria: this.datos.Categoria,
        nombreSubcategoria: this.datos.Subcategoria,
      });
    });
    console.log("envia", this.enviar);
    // this.authService.enviarIndicadorEditado(this.enviar).subscribe((res) => {
    //   if (res) {
    //     this.alerta("Editado");
    //     this.router.navigate(["administrar-indicadores"]);
    //   }
    //   return res;
    // });
  }
  alerta(mensaje: any) {
    Swal.fire(mensaje);
  }
}
