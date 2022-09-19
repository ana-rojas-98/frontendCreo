import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-categorias",
  templateUrl: "./categorias.component.html",
  styleUrls: ["./categorias.component.scss"],
})
export class CategoriasComponent implements OnInit {
  Categoria = {
    NombreCategoria: "",
    estandar: "",
  };

  resultados = {};

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.getStandares();
  }
  SetCategoria() {
    this.authService.crear_categoria(this.Categoria).subscribe((res: any) => {
      //console.log(res);
    });
  }

  getStandares() {
    this.authService.getStandares(this.Categoria).subscribe((res: any) => {
      this.resultados = res.map((item) => {
        return item;
      });
    });
  }

  crear_categoria() {
    console.log(this.Categoria);
    this.authService.crear_categoria(this.Categoria).subscribe((res: any) => {
      //console.log(res);
    });
  }
}
