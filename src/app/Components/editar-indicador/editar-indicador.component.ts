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
  resultadosTabla = [];
  resultadosHTML = [];
  resultados = [];
  anioArray = [];
  preciodicidadesArray = [];
  uniqueYears = [];
  uniquePeriod = [];
  estado = [];
  

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

  //variables de ensayo
  ensayo: any = [];
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
    this.getCategoria(0);
    this.getStandares(0);
    this.getSubCategoria(0);
    
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

  filtrar() {
    this.uniqueYears = [...new Set(this.anioArray)];
    this.uniquePeriod = [...new Set(this.preciodicidadesArray)];
    this.Anio = this.uniqueYears[this.uniqueYears.length - 1];
    this.Periodo = this.uniquePeriod[this.uniquePeriod.length - 1];
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
        // this.mostrar=this.resultadosHTML;
        // this.resultadosHTML.forEach(item => (
        //   this.Respuestas.push(item.valor)
        // ));
      }
    }
    //console.log("itemvalor",this.Respuestas)
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
        console.log("periodo", this.Periodo);
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


 

  insertarFila() {
    let fila: any;
    let i = 1;
    console.log("entra");
    fila = document.getElementById("tabla");
    //this.posicion = this.resultadosHTML[this.resultadosHTML.length+i];
    this.posicion = this.resultadosHTML[this.resultadosHTML.length + i];
    //this.posicion = this.resultadosHTML.length++ + i;
    // this.posicion = this.resultadosTabla.length++ + i;
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

    cel1.innerHTML =
      '<input type="text" [(ngModel)]="linea.entrada" style="width:100%">';
    cel2.innerHTML =
      '<input type="text" [(ngModel)]="linea.entrada" style="width:100%">';
    cel3.innerHTML =
      '<input type="text" [(ngModel)]="linea.entrada" style="width:100%">';
    cel4.innerHTML =
      '<input type="text" [(ngModel)]="linea.entrada" style="width:100%">';
    cel5.innerHTML =
      '<input type="text" [(ngModel)]="linea.entrada" style="width:100%">';
    cel6.innerHTML =
      '<input type="text" [(ngModel)]="linea.entrada" style="width:100%">';
    cel7.innerHTML =
      '<input type="text" [(ngModel)]="linea.entrada" style="width:100%">';
    cel8.innerHTML =
      '<input type="text" [(ngModel)]="linea.entrada" style="width:100%">';
    cel9.innerHTML =
      '<input type="text" [(ngModel)]="linea.entrada" style="width:100%">';
    cel10.innerHTML =
      '<input type="text" [(ngModel)]="linea.entrada" style="width:100%">';
    cel11.innerHTML =
      '<input type="text" [(ngModel)]="linea.entrada" style="width:100%">';
    cel12.innerHTML =
      '<input type="text" [(ngModel)]="linea.entrada" style="width:100%">';
    cel13.innerHTML =
      '<input type="text" [(ngModel)]="linea.entrada" style="width:100%">';
    cel14.innerHTML =
      '<input type="text" [(ngModel)]="linea.entrada" style="width:100%">';

    // cel1.innerHTML = '<input id ="entrada">';
    // cel2.innerHTML = "<td></td>";
    // cel3.innerHTML = "<td></td>";
    // cel4.innerHTML = "<td></td>";
    // cel5.innerHTML = "<td></td>";
    // cel6.innerHTML = "<td></td>";
    // cel7.innerHTML = "<td></td>";
    // cel8.innerHTML = "<td></td>";
    // cel9.innerHTML = "<td></td>";
    // cel10.innerHTML = "<td></td>";
    // cel11.innerHTML = "<td></td>";
    // cel12.innerHTML = "<td></td>";
    // cel13.innerHTML = "<td></td>";
    // cel14.innerHTML = "<td></td>";
    // let e = <HTMLInputElement>document.getElementById("entrada");
    // let ens = e.value;
    // this.ensayo.push({ entrada: ens });
  }

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
