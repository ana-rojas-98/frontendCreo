import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { EMPTY, empty, Subject } from "rxjs";
import { element } from "protractor";
import { NgbAlert } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";

@Component({
  selector: "app-indicadores-masivos",
  templateUrl: "./indicadores-masivos.component.html",
  styleUrls: ["./indicadores-masivos.component.scss"],
})
export class IndicadoresMasivosComponent implements OnInit {
  constructor(private authService: AuthService, public router: Router) { }
  archivos: File = null;
  ensayo = [];

  private _success = new Subject<string>();
  successMessage = "";
  @ViewChild("selfClosingAlert", { static: false }) selfClosingAlert: NgbAlert;

  Estandar = new FormControl("");
  Categoria = new FormControl("");
  Subcategoria = new FormControl("");
  Periodicidad = new FormControl("");

  resultados = {};
  resultadosCategoria = {};
  resultadosSubCategoria = {};

  Registros = [];
  EstandarOpciones = [];
  CategoriaOpciones = [];
  SubcategoriaOpciones = [];

  estandarFil = "";

  nombres = [
    {
      id: "1",
      periodicidad: "Mensual",
    },
    {
      id: "2",
      periodicidad: "Bimensual",
    },
    {
      id: "3",
      periodicidad: "Trimestral",
    },
    {
      id: "4",
      periodicidad: "Cuatrimestral",
    },
    {
      id: "5",
      periodicidad: "Semestral",
    },
    {
      id: "6",
      periodicidad: "Anual",
    },
  ];
  seleccionado = {
    id: "",
  };

  valor: FormGroup;

  periodicidad(Posicion) {
    this.Registros[Posicion][3] = this.Periodicidad.value;
    console.log("Registros", this.Registros);
  }

  estandar(Posicion) {
    this.Registros[Posicion][0] = this.Estandar.value;
    console.log("Registros", this.Registros);
    this.getCategoriaFilter(Posicion, this.Estandar.value);
    this.getSubCategoriaFilter(Posicion, this.Categoria.value);
  }

  categoria(Posicion) {
    this.Registros[Posicion][1] = this.Categoria.value;
    console.log("Registros", this.Registros);
    this.getSubCategoriaFilter(Posicion, this.Categoria.value);
  }

  subcategoria(Posicion) {
    this.Registros[Posicion][2] = this.Subcategoria.value;
    console.log("Registros", this.Registros);
  }

  ngOnInit() {
    let usarioLocalStote = JSON.parse(localStorage.getItem("usario"));
    if (usarioLocalStote.typeuser == "3") {
      this.router.navigate(["private"]);
      return true;
    }
    if (usarioLocalStote.indicadorCrear == false) {
      this.router.navigate(["private"]);
      return true;
    }
    this.getStandares();
    this.getCategoria();
    this.getSubCategoria();
    this._success.subscribe((message) => (this.successMessage = message));
  }
  getStandares() {
    this.authService.getStandares(this.Estandar).subscribe((res: any) => {
      this.resultados = res.map((item) => {
        return item;
      });
    });
  }

  getCategoria() {
    this.authService.getCategoria(this.Categoria).subscribe((res: any) => {
      this.resultadosCategoria = res.map((item) => {
        return item;
      });
    });
  }

  getSubCategoria() {
    this.authService
      .getSubCategoria(this.Subcategoria)
      .subscribe((res: any) => {
        this.resultadosSubCategoria = res.map((item) => {
          return item;
        });
      });
  }

  getCategoriaFilter(Posicion, estandar) {
    this.authService.getCategoria(this.Categoria).subscribe((res: any) => {
      this.CategoriaOpciones[Posicion] = res.filter(
        (item) => item.idEstandar == estandar
      );
    });
  }

  getSubCategoriaFilter(Posicion, categoria) {
    this.authService.getSubCategoria(this.Subcategoria).subscribe((res: any) => {
      this.SubcategoriaOpciones[Posicion] = res.filter(
        (item) => item.idCategoria == categoria
      );
    });
  }

  capturarArchivo() {
    //funciona
    const idInput = document.getElementById("in") as HTMLInputElement;
    for (let index = 0; index < idInput.files.length; index++) {
      const element = idInput.files[index];
      this.archivos = element;
      this.ensayo.push(this.archivos);
      this.Registros.push([0, 0, 0, 0]);
      this.EstandarOpciones.push(this.resultados);
      this.CategoriaOpciones.push(this.resultadosCategoria);
      this.SubcategoriaOpciones.push(this.resultadosSubCategoria);
    }
  }

  descargarArchivo() {
    this.authService.descarga().subscribe((res) => {
      let nombreArchivo = res.headers.get("content-disposition");
      //?.split(';')[1].split('=')[1];
      let tipo: Blob = res.body as Blob;
      let a = document.createElement("a");
      a.download = "ArchivoEjemplo.xlsx";
      a.href = window.URL.createObjectURL(tipo);
      a.click();
    });
  }

  GuardarIndicadores() {
    let j = 0;
    let contador = 0;
    this.ensayo.forEach((item) => {
      const formD = new FormData();
      if (this.ensayo[j] == null) {
        return this.changeSuccessMessage(5, j);
      } else if (this.Registros[j][0] == '') {
        return this.changeSuccessMessage(1, j);
      } else if (this.Registros[j][1] == '') {
        return this.changeSuccessMessage(2, j);
      } else if (this.Registros[j][2] == '') {
        return this.changeSuccessMessage(3, j);
      } else if (this.Registros[j][3] == '') {
        return this.changeSuccessMessage(4, j);
      } else {
        contador++;
      }
      j++;
    })
    if (contador == this.ensayo.length) {
      let comp = 0;
      let i = 0;
      this.ensayo.forEach((item) => {
        const formD = new FormData();
        formD.append("archivo", this.ensayo[i]);
        formD.append("IdEstandar", this.Registros[i][0]);
        formD.append("IdCategoria", this.Registros[i][1]);
        formD.append("Idsubcategoria", this.Registros[i][2]);
        formD.append("periodicidad", this.Registros[i][3]);
        let usarioLocalStote = JSON.parse(localStorage.getItem("usario"));
        formD.append("IdUsuario", usarioLocalStote.usuarioid);
        i++;
        this.authService.setIndicadorNuevo(formD).subscribe((res: any) => {
          if (res.result == 'Exitoso'){
            comp ++;
            if (comp == i){
              this.alerta("¡Indicadores creados exitosamente!")
              this.router.navigate(['administrar-indicadores'])
            }
          }
        });

      })
    }
  }


  public changeSuccessMessage(i: number, Posicion) {
    if (i == 1) {
      return this._success.next("¡Error!, debe seleccionar el estándar en la posición " + (Posicion + 1));
    }
    if (i == 2) {
      return this._success.next("¡Error!, debe seleccionar la categoría en la posición " + (Posicion + 1));
    }
    if (i == 3) {
      return this._success.next("¡Error!, debe seleccionar la subcategoría en la posición " + (Posicion + 1));
    }
    if (i == 4) {
      return this._success.next("¡Error!, debe seleccionar la periodicidad en la posición " + (Posicion + 1));
    }
    if (i == 5) {
      return this._success.next("¡Error!, en el archivo " + (Posicion + 1));
    }
  }

  alerta(mensaje: any) {
    Swal.fire(mensaje);
  }
}
