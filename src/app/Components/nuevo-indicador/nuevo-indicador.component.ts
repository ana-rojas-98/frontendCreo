import { JsonpClientBackend } from "@angular/common/http";
import {
  Component,
  OnInit,
  ɵflushModuleScopingQueueAsMuchAsPossible,
} from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import * as XSLX from "xlsx";

@Component({
  selector: "app-nuevo-indicador",
  templateUrl: "./nuevo-indicador.component.html",
  styleUrls: ["./nuevo-indicador.component.scss"],
})
export class NuevoIndicadorComponent implements OnInit {
  constructor(private authService: AuthService) {}

  archivos = [];
  ExcelData: any;
  elArchivo: FormData;
  archivosp = "";
  archivoCapturado: File;
  resultadoExcel: any;
  resultadoExcelEnviar: [{}];

  element = false;

  Estandar = {
    NombreEstandar: "",
    estandar: "",
  };

  estandarId = {
    id: "",
  };

  Categoria = {
    categoria1: "",
    NombreCategoria: "",
  };

  SubCategoria = {
    subcategoria1: "",
    nombreSubcategoria: "",
  };

  resultados = {};
  resultadosCategoria = {};
  resultadosSubCategoria = {};
  estandarFil = "";
  categoriaFil = "";

  nombres = [
    {
      id: "1",
      periodicidad: "mensual",
    },
    {
      id: "2",
      periodicidad: "bimensual",
    },
    {
      id: "3",
      periodicidad: "trimestral",
    },
    {
      id: "4",
      periodicidad: "cuatrimestral",
    },
    {
      id: "5",
      periodicidad: "semestral",
    },
    {
      id: "6",
      periodicidad: "anual",
    },
  ];
  seleccionado = {
    id: "",
  };
  variableP = this.seleccionado.id;

  estandar() {
    this.estandarFil = this.Estandar.estandar;
    this.getCategoria(this.estandarFil);
    this.getSubCategoria(0);
  }

  categoria() {
    this.categoriaFil = this.Categoria.categoria1;
    this.getSubCategoria(this.categoriaFil);
  }

  ngOnInit() {
    this.getStandares();
  }

  getStandares() {
    this.authService.getStandares(this.Estandar).subscribe((res: any) => {
      this.resultados = res.map((item) => {
        return item;
      });
    });
  }

  getCategoria(estandar) {
    this.authService.getCategoria(this.Categoria).subscribe((res: any) => {
      this.resultadosCategoria = res.filter(
        (item) => item.idEstandar == estandar
      );
    });
  }

  getSubCategoria(categoria) {
    this.authService
      .getSubCategoria(this.SubCategoria)
      .subscribe((res: any) => {
        this.resultadosSubCategoria = res.filter(
          (item) => item.idCategoria == categoria
        );
      });
  }

  archivoCapt(event) {
    this.archivoCapturado = event.target.files[0];
    this.archivos.push(this.archivoCapturado);
    this.elArchivo = new FormData();
    this.archivos.forEach((archivo) => {
      this.elArchivo.append("archivo", archivo);
    });
    this.leer(this.archivoCapturado);
  }

  leer(event: any) {
    //this.archivoCapturado = event.target.files[0];
    let leerArchivo = new FileReader();
    leerArchivo.readAsBinaryString(this.archivoCapturado);
    leerArchivo.onload = (e) => {
      let libro = XSLX.read(leerArchivo.result, { type: "binary" });
      let hoja = libro.SheetNames;
      this.resultadoExcel = XSLX.utils.sheet_to_json(libro.Sheets[hoja[0]]);
    };
  }

  NuevoIndicadorRegistro = {
    Entrada: "",
    Numero: "",
    TieneFormula: "",
    formula: "",
    Valor: "",
    Titulo: "",
    TamanoTexto: 1,
    Color: "",
    Negrilla: "",
    Subrallada: "",
    Cursiva: "",
    InicioColumna: "",
    FinColumna: "",
    SaltoLinea: "",
  };

  mostrar() {
    let resul = this.resultadoExcel.map((item) => {
      if (item.Entrada == "Text") {
        this.NuevoIndicadorRegistro.Entrada = item.Entrada;
        this.NuevoIndicadorRegistro.Numero = "No";
        this.NuevoIndicadorRegistro.TieneFormula = "No";
        this.NuevoIndicadorRegistro.formula = "No";
        this.NuevoIndicadorRegistro.Valor = item.Valor;
        this.NuevoIndicadorRegistro.Titulo = item.Titulo;
        this.NuevoIndicadorRegistro.TamanoTexto = item.TamanoTexto;
        this.NuevoIndicadorRegistro.Color = item.Color;
        this.NuevoIndicadorRegistro.Negrilla = item.Negrilla;
        this.NuevoIndicadorRegistro.Subrallada = item.Subrayado;
        this.NuevoIndicadorRegistro.Cursiva = item.Cursiva;
        this.NuevoIndicadorRegistro.InicioColumna = item.InicioColunma;
        this.NuevoIndicadorRegistro.FinColumna = item.FinColumna;
        this.NuevoIndicadorRegistro.SaltoLinea = item.SaltoDeLinea;
      } else if (item.Entrada == "Input") {
        if (item.TieneFormula == "Input") {
          this.NuevoIndicadorRegistro.Entrada = item.Entrada;
          this.NuevoIndicadorRegistro.Numero = "No";
          this.NuevoIndicadorRegistro.TieneFormula = "No";
          this.NuevoIndicadorRegistro.formula = "No";
          this.NuevoIndicadorRegistro.Valor = item.Valor;
          this.NuevoIndicadorRegistro.Titulo = "No";
          this.NuevoIndicadorRegistro.TamanoTexto = item.TamanoTexto;
          this.NuevoIndicadorRegistro.Color = item.Color;
          this.NuevoIndicadorRegistro.Negrilla = item.Negrilla;
          this.NuevoIndicadorRegistro.Subrallada = item.Subrayado;
          this.NuevoIndicadorRegistro.Cursiva = item.Cursiva;
          this.NuevoIndicadorRegistro.InicioColumna = item.InicioColunma;
          this.NuevoIndicadorRegistro.FinColumna = item.FinColumna;
          this.NuevoIndicadorRegistro.SaltoLinea = item.SaltoDeLinea;
        } else if (
          item.Entrada == "Input" &&
          item.Numero == "Si" &&
          item.TieneFormula == "No"
        ) {
          this.NuevoIndicadorRegistro.Entrada = item.Entrada;
          this.NuevoIndicadorRegistro.Numero = "Si";
          this.NuevoIndicadorRegistro.TieneFormula = "No";
          this.NuevoIndicadorRegistro.formula = "No";
          this.NuevoIndicadorRegistro.Valor = item.Valor;
          this.NuevoIndicadorRegistro.Titulo = "no";
          this.NuevoIndicadorRegistro.TamanoTexto = item.TamanoTexto;
          this.NuevoIndicadorRegistro.Color = item.Color;
          this.NuevoIndicadorRegistro.Negrilla = item.Negrilla;
          this.NuevoIndicadorRegistro.Subrallada = item.Subrayado;
          this.NuevoIndicadorRegistro.Cursiva = item.Cursiva;
          this.NuevoIndicadorRegistro.InicioColumna = item.InicioColunma;
          this.NuevoIndicadorRegistro.FinColumna = item.FinColumna;
          this.NuevoIndicadorRegistro.SaltoLinea = item.SaltoDeLinea;
        }
      }
      this.resultadoExcelEnviar.push(this.NuevoIndicadorRegistro)
    });
    console.log("indicador a registara", this.NuevoIndicadorRegistro);
  }

  leerArchivo() {
    const archivoleido = new FileReader();
    const archi = this.archivos[0];
    archivoleido.readAsBinaryString(archi);
    archivoleido.onload = (e) => {
      const workArchi = XSLX.read(archivoleido.result, { type: "binary" });
      const nombreHojas = workArchi.SheetNames;
      this.ExcelData = XSLX.utils.sheet_to_json(
        workArchi.Sheets[nombreHojas[0]]
      );
    };
  }

  Periodicidad() {
    console.log(this.variableP);
  }

  ShowData() {
    this.element = true;
    console.log(this.element);
  }
  HiddenData() {
    this.element = false;
    console.log(this.element);
  }

  nuevoIndicador = {
    //archivo: this.archivos,
    estandar: 1,
    categoria: 2,
    subcategoria: 2,
    periodicidad: "1",
  };

  form_data = new FormData();
  fform_data = this.nuevoIndicador;

  setNuevoIndicador() {
    //console.log("arc: ", this.elArchivo);
    //console.log("arc2: ", this.fform_data);
    /* this.authService.setIndicadorNuevo(this.fform_data).subscribe((res: any) => {
      console.log(res);
    });*/

    ////ensayos

    const formData = new FormData();
    Object.keys(this.nuevoIndicador).forEach(
      (key) => formData.append(key, this.nuevoIndicador[key]),
      console.log("este es lel mensaje", formData)
    );

    this.authService.setIndicadorNuevo(formData).subscribe((res: any) => {
      console.log(res);
    });
    return formData;
  }
}
