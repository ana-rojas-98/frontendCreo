import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-administrar-indicadores",
  templateUrl: "./administrar-indicadores.component.html",
  styleUrls: ["./administrar-indicadores.component.scss"],
})
export class AdministrarIndicadoresComponent implements OnInit {
  constructor(private authService: AuthService, public router: Router) {}
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
  crear = false;
  ver = false;
  editar = false;
  eliminar = false;

  estandar() {
    this.estandarFil = this.Estandar.estandar;
    this.getCategoria(this.estandarFil);
    this.getSubCategoria(-1);
  }

  categoria() {
    this.categoriaFil = this.Categoria.categoria1;
    this.getSubCategoria(this.categoriaFil);
  }

  ngOnInit() {
    let usarioLocalStote = JSON.parse(localStorage.getItem("usario"));

    if (usarioLocalStote.typeuser == "3") {
      this.router.navigate(['private'])
      return true;
    }
    if (usarioLocalStote.indicadorCrear == true) {
      this.crear = true;
    }
    if (usarioLocalStote.indicadorVer == true) {
      this.ver = true;
    }
    if (usarioLocalStote.indicadorEditar == true) {
      this.editar = true;
    }
    if (usarioLocalStote.indicadorEliminar == true) {
      this.eliminar = true;
    }
    this.getStandares();
    this.getCategoria(0);
    this.getSubCategoria(0);
  }

  getStandares() {
    this.authService.getStandares(this.Estandar).subscribe((res: any) => {
      this.resultados = res.map((item) => {
        return item;
      });
    });
  }

  getCategoria(estandar) {
    if (estandar == 0) {
      this.authService.getCategoria(this.Categoria).subscribe((res: any) => {
        this.resultadosCategoria = res.map((item) => {
          return item;
        });
      });
    } else {
      this.authService.getCategoria(this.Categoria).subscribe((res: any) => {
        this.resultadosCategoria = res.filter(
          (item) => item.idEstandar == estandar
        );
      });
    }
  }

  getSubCategoria(categoria) {
    if (categoria == 0) {
      this.authService
        .getSubCategoria(this.SubCategoria)
        .subscribe((res: any) => {
          this.resultadosSubCategoria = res.map((item) => {
            return item;
          });
        });
    } else {
      this.authService
        .getSubCategoria(this.SubCategoria)
        .subscribe((res: any) => {
          this.resultadosSubCategoria = res.filter(
            (item) => item.idCategoria == categoria
          );
        });
    }
  }
}
