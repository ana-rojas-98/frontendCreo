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
  Estandar = new FormControl("");
  Categoria = new FormControl("");
  Subcategoria = new FormControl("");

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

  ngOnInit() {
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
    console.log("Trae formato");
    this.authService.EditarIndicador().subscribe((respuesta: any) => {
      this.resultado = respuesta.map((item) => {
        if (this.idArchivo.idArchivo == item.idArchivo) {
          this.resultadosTabla.push(item);
          this.datos.Estandar = item.nombreEstandar;
          this.datos.Categoria = item.nombreCategoria;
          this.datos.Subcategoria = item.nombreSubcategoria;
          console.log("formato", this.resultadosTabla);
        }
        return item;
      });
    });
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
  enviar: any = [];
  guardar() {
    console.log("resulatado", this.resultadosTabla);
    console.log("resulatado", this.datos.Estandar);
    this.resultadosTabla.map((item) => {
      this.enviar.push({
        entrada: item.entrada,
        numerop: item.numerop,
        formulap: item.formulap,
        formula: item.formula,
        valor: item.valor,
        titulo: item.titulo,
        tamanoTexto: item.tamanoTexto,
        color: item.color,
        negrilla: item.negrilla,
        subrayado: item.subrayado,
        cursiva: item.cursiva,
        inicioCol: item.inicioCol,
        finCol: item.finCol,
        saltoLinea: item.saltoLinea,
        html: item.html,
        idArchivo: item.idArchivo,
        nombreEstandar: this.datos.Estandar,
        nombreCategoria: this.datos.Categoria,
        nombreSubcategoria: this.datos.Subcategoria,
      });
    });
    console.log("enviar", this.enviar);
    this.authService.enviarIndicadorEsitado(this.enviar).subscribe((res) => {
      if (res) {
        this.alerta("Editado");
      }
      return res;
    });
  }
  alerta(mensaje: any) {
    Swal.fire(mensaje);
  }
}
