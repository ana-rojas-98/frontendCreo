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
  
  mostrar:any=[];
  resultado: any = [];
  enviar: any = [];
  resultadosTabla= []; 
  resultadosHTML = [];
  resultados = [];
  anioArray = [];
  preciodicidadesArray = []; 
  uniqueYears = [];
  uniquePeriod = [];

  resultadosCategoria = {};
  resultadosSubCategoria = {};
  idArchivo = {
    idArchivo: 1,
  };   
  datos = {
    Estandar: "",
    Categoria: "",
    Subcategoria: "",
  }; 
  posicion: any;

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
    this.cambioAnio();
  }

  cambioAnio(){
    if (this.Anio != '') {
       if (this.Periodo != '') {
        this.resultadosHTML = this.resultadosTabla.filter(an => an.anio == this.Anio);
        this.resultadosHTML = this.resultadosHTML.filter(pe => pe.periodicidad == this.Periodo);
        this.mostrar=this.resultadosHTML;
       }
    } 
  }

  cambioPeriodo(){
    if (this.Anio != '') {
      if (this.Periodo != '') {
        this.resultadosHTML = this.resultadosTabla.filter(an => an.anio == this.Anio);
        this.resultadosHTML = this.resultadosHTML.filter(pe => pe.periodicidad == this.Periodo);
        this.mostrar=this.resultadosHTML;
      }
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
  elimi:any;
  insertarFila() {
    this.resultadosHTML.push({
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
      finCol: parseInt("3"),
      saltoLinea: "no",
      html: "",
      idArchivo: this.idArchivo.idArchivo,
      periodicidad: this.Periodo,
    })
    let fila: any;
    fila = document.getElementById("tabla");    
    this.posicion = this.resultadosHTML[this.resultadosHTML.length];
    this.elimi=fila.insertRow(this.posicion);
    console.log("fila",fila);
  }

  eliminarFila(){
    // let fila: any;
    // fila = document.getElementById("tabla");    
    // this.posicion = this.resultadosHTML.length++;
    // //fila.removeChild(this.elimi);
    // console.log("posicion",this.posicion);
    // console.log("posicion",this.elimi);
    // let ola= this.elimi.remove(this.posicion);
     console.log("elimina");
  }

  guardar() {
    console.log("entra")
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
        nombreEstandar: this.datos.Estandar,
        nombreCategoria: this.datos.Categoria,
        nombreSubcategoria: this.datos.Subcategoria,
      });
    });
    console.log("envia",this.enviar)
    this.authService.enviarIndicadorEsitado(this.enviar).subscribe((res) => {
      if (res) {
        this.alerta("Editado");
        this.router.navigate(["administrar-indicadores"])
      }
      return res;
    });
  }
  alerta(mensaje: any) {
    Swal.fire(mensaje);
  }
}
