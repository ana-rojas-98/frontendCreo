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
    Subcategoria1: ""
  };

  Categoria = {
    NombreCategoria: "",
    estandar: "",
  };

  Estandar = {
    estandar: ""
  };

  resultados = {};
  resultadosEstandares = {};

  constructor(private authService: AuthService, private router: Router) {}

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
      this.resultadosEstandares = res.map((item) => {
        return item;
      });
    });
  }

  SetSubCategoria() {
    this.authService
      .crear_subcategoria(this.Subcategoria)
      .subscribe((res: any) => {
        if(res.resul == "Subcategoria guardada"){
          this.router.navigate(['subcatego']);
          return this.alerta(res.resul);
        }else{
          this.alerta("No se pudo agregar la Subcategoria"); 
        }
      });
  }
}
