import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-indicadores-masivos",
  templateUrl: "./indicadores-masivos.component.html",
  styleUrls: ["./indicadores-masivos.component.scss"],
})
export class IndicadoresMasivosComponent implements OnInit {
  constructor(private authService: AuthService, public router: Router) {}
  archivos: File = null;
  ensayo = [];

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
    this.authService
      .getSubCategoria(this.Subcategoria)
      .subscribe((res: any) => {
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
    const formD = new FormData();
    this.Registros.forEach((arra) => {
      formD.append("archivo", arra);
      console.log(arra);
    });
    this.authService.masivos(formD).subscribe((res: any) => {
      console.log(res);
    });
    return formD;
  }
}
