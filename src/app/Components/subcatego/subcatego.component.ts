import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-subcatego",
  templateUrl: "./subcatego.component.html",
  styleUrls: ["./subcatego.component.scss"],
})
export class SubcategoComponent implements OnInit {
  Subcategoria = {
    NombreSubcategoria: "",
    IdCategoria: ""
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
  
  alerta(mensaje:any){
    Swal.fire(mensaje);
  }

  categoria(){
    console.log(this.Subcategoria)
  }

  getCategoria() {
    this.authService.getCategoria(this.Categoria).subscribe((res: any) => {
      this.resultados = res.map((item) => {
        return item;
      });
    });
  }

  getStandares() {
    this.authService.getStandares(this.Categoria).subscribe((res: any) => {
      res.map((item) => {
        return item;
      });
    });
  }

  SetSubCategoria() {
    this.authService
      .crear_subcategoria(this.Subcategoria)
      .subscribe((res: any) => {
        this.alerta(res.resul)
      });
  }
}
