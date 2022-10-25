import { JsonpClientBackend } from "@angular/common/http";
import { Router } from "@angular/router";
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
  constructor(private authService: AuthService, private router: Router) {}

  archivos: File = null;
  ExcelData: any;
  archivosp = "";
  archivoCapturado: File;
  resultadoExcel: any;
  resultadoExcelEnviar = [{}];
  archivoleer = [];

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
    periodicidadId: "",
  };

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
    this.archivos = this.archivoCapturado;
    this.archivoleer.push(this.archivoCapturado);
    //otro metodo
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
    Subrallado: "",
    Cursiva: "",
    InicioColumna: "",
    FinColumna: "",
    SaltoLinea: "",
  };

  leerArchivo() {
    const archivoleido = new FileReader();
    const archi = this.archivoleer[0];
    archivoleido.readAsBinaryString(archi);
    console.log("el archivo", archi);
    archivoleido.onload = (e) => {
      const workArchi = XSLX.read(archivoleido.result, { type: "binary" });
      const nombreHojas = workArchi.SheetNames;
      this.ExcelData = XSLX.utils.sheet_to_json(
        workArchi.Sheets[nombreHojas[0]]
      );
    };
    console.log("el excelData", this.ExcelData);
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
    archivo: this.archivos,
    IdEstandar: this.Estandar.estandar,
    IdCategoria: this.Categoria.categoria1,
    Idsubcategoria: this.SubCategoria.subcategoria1,
    periodicidad: "",
  };

  setNuevoIndicador() {
    console.log(this.archivos); 
    const formData = new FormData();
    formData.append("archivo", this.archivos); 
    formData.append("IdEstandar", this.Estandar.estandar); 
    formData.append("IdCategoria", this.Categoria.categoria1); 
    formData.append("Idsubcategoria", this.SubCategoria.subcategoria1); 
    formData.append("periodicidad", this.seleccionado.periodicidadId); 
    console.log("este es lel mensaje", formData); 
    console.log("con estandar", this.Estandar.estandar);
    console.log("concategoria", this.Categoria.categoria1);
    console.log("con estandar", this.SubCategoria.subcategoria1);
    console.log("con periodicidad", this.seleccionado.periodicidadId);

     this.authService.setIndicadorNuevo(formData).subscribe((res: any) => {
      console.log(res);
     });
    return formData;
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
}