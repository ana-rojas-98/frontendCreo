import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-subcatego",
  templateUrl: "./subcatego.component.html",
  styleUrls: ["./subcatego.component.scss"],
})
export class SubcategoComponent implements OnInit {
  Subcategoria = {
    NombreSubcategoria: "",
    IdCategoria: "",
  };

  Categoria = {
    NombreCategoria: "",
    estandar: "",
  };

  resultados = {};

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.getCategoria();
    this.getStandares();
  }

  getCategoria() {
    this.authService.getCategoria(this.Subcategoria).subscribe((res: any) => {
      res.map((item) => {
        //console.log("hola: ", item.nombreCategoria);
        return item;
      });
    });
  }

  getStandares() {
    this.authService.getStandares(this.Categoria).subscribe((res: any) => {
      this.resultados = res.map((item) => {
        return item;
      });
    });
  }

  SetSubCategoria() {
    this.authService
      .crear_subcategoria(this.Subcategoria)
      .subscribe((res: any) => {});
  }
}
