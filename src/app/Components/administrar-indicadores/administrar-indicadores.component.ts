import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-administrar-indicadores",
  templateUrl: "./administrar-indicadores.component.html",
  styleUrls: ["./administrar-indicadores.component.scss"],
})
export class AdministrarIndicadoresComponent implements OnInit {
  constructor(private authService: AuthService) {}
  Estandar = {
    NombreEstandar: "",
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

  categoria() {
    console.log("hola: ", this.Categoria);
  }

  ngOnInit() {
    this.getCategoria();
    this.getStandares();

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
      .getSubCategoria(this.SubCategoria)
      .subscribe((res: any) => {
        this.resultadosSubCategoria = res.map((item) => {
          return item;
        });
        console.log("hola: ", this.resultadosSubCategoria);
      });
  }
}
