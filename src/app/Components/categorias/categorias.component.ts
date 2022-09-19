import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-categorias",
  templateUrl: "./categorias.component.html",
  styleUrls: ["./categorias.component.scss"],
})
export class CategoriasComponent implements OnInit {
  Categoria = {
    NombreCategoria: "",
    IdEstandar: "",
  };

  resultados = {};

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.getStandares();
  }

  

  getStandares() {
    this.authService.getStandares(this.Categoria).subscribe((res: any) => {
      this.resultados = res.map((item) => {
        return item;
      });
    });
  }

  crear_categoria() {
    this.authService.crear_categoria(this.Categoria).subscribe((res: any) => {
      this.alerta(res.resul)
    });
  }

  alerta(mensaje:any){
    Swal.fire(mensaje);
  }

}
