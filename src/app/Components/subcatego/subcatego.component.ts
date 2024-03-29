import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbAlert } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { CargandoService } from "src/app/services/cargando.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-subcatego",
  templateUrl: "./subcatego.component.html",
  styleUrls: ["./subcatego.component.scss"],
})
export class SubcategoComponent implements OnInit {

  usarioLocalStote = JSON.parse(localStorage.getItem("usario"));
  Usuarioid = this.usarioLocalStote.usuarioid

  Subcategoria = {
    NombreSubcategoria: "",
    Subcategoria1: "",
    IdUsuario: this.Usuarioid,
    IdEstandar: "",
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

  Estandarf = new FormControl("");
  Categoriaf = new FormControl("");

  private _success = new Subject<string>();
  successMessage = "";
  @ViewChild("selfClosingAlert", { static: false }) selfClosingAlert: NgbAlert;

  est = 0;
  cat = 0;


  constructor(private authService: AuthService, private router: Router,
    public cargandoService: CargandoService,private route: ActivatedRoute,) { }

  ngOnInit() {
    let usarioLocalStote = JSON.parse(localStorage.getItem("usario"));
    this.est = parseInt(this.route.snapshot.paramMap.get("es"));
    this.cat = parseInt(this.route.snapshot.paramMap.get("cat"));
    if (usarioLocalStote.typeuser == "3") {
      this.router.navigate(["private"]);
      return true;
    }
    if (usarioLocalStote.indicadorCrear == false) {
      this.router.navigate(["private"]);
      return true;
    }
    this.getStandares();
    this._success.subscribe((message) => (this.successMessage = message));
  }

  alerta(mensaje: any) {
    Swal.fire(mensaje);
  }

  getCategoria() {
    this.authService.getCategoria(this.Categoria).subscribe((res: any) => {
      this.resultados = res.map((item) => {
        return item;
      });
      this.selectElement("categoria", this.cat);
      this.Categoriaf.setValue(this.cat);
      this.Subcategoria.Subcategoria1 = this.cat.toString();
    });
  }

  getStandares() {
    this.authService.getStandares(this.Categoria).subscribe((res: any) => {
      this.resultadosEstandares = res.map((item) => {
        return item;
      });
      this.selectElement("estandar", this.est);
      this.Estandarf.setValue(this.est);
      this.Subcategoria.IdEstandar = this.est.toString();
      this.Estandar.estandar = this.est.toString();
      this.getCategoria();
    });
  }

  selectElement(id, valueToSelect) {
    let element;
    element = document.getElementById(id);
    element.value = valueToSelect;
  }


  getCategoriafilter(estandar) {
    this.authService.getCategoria(this.Categoria).subscribe((res: any) => {
      this.resultados = res.filter(
        (item) => item.idEstandar == this.Estandarf.value

      );
      this.Subcategoria.IdEstandar = this.Estandarf.value;
    });

  }

  SetSubCategoria() {

    if (this.Estandar.estandar == '') {
      this.changeSuccessMessage(2);
    }
    else {
      if (this.Subcategoria.Subcategoria1 == '') {
        this.changeSuccessMessage(3);
      }
      else {
        if (this.Subcategoria.NombreSubcategoria == '') {
          this.changeSuccessMessage(4);
        }
        else {
          this.cargandoService.ventanaCargando();
          this.authService
            .crear_subcategoria(this.Subcategoria)
            .subscribe((res: any) => {
              if (res.resul == "Subcategoria guardada") {
                this.alerta("Subcategoría creada exitosamente");
                return this.router.navigate(['/administrar-indicadores']);
              } else {
                this.changeSuccessMessage(5);
              }
            });
        }
      }
    }

  }

  public changeSuccessMessage(i: number) {
    if (i == 1) {
      this._success.next("¡Se guardó existosamente!");
    }
    if (i == 2) {
      this._success.next("¡Error!, debe seleccionar el estándar");
    }
    if (i == 3) {
      this._success.next("¡Error!, debe seleccionar la categoría");
    }
    if (i == 4) {
      this._success.next("¡Error!, debe ingresar el nombre de la subcategoría");
    }
    if (i == 5) {
      this._success.next("¡Error!, la subcategoría ya existe");
    }
  }

}
