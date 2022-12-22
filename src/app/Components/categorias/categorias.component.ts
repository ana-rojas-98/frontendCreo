import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbAlert } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { CargandoService } from "src/app/services/cargando.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-categorias",
  templateUrl: "./categorias.component.html",
  styleUrls: ["./categorias.component.scss"],
})
export class CategoriasComponent implements OnInit {

  usarioLocalStote = JSON.parse(localStorage.getItem("usario"));
  Usuarioid = this.usarioLocalStote.usuarioid

  Categoria = {
    NombreCategoria: "",
    IdEstandar: "",
    IdUsuario: this.Usuarioid,
  };
  resultados = {};

  id = 0;


  Estandar = new FormControl("");

  private _success = new Subject<string>();
  successMessage = "";
  @ViewChild("selfClosingAlert", { static: false }) selfClosingAlert: NgbAlert;

  constructor(private authService: AuthService, private router: Router,
    public cargandoService: CargandoService, private route: ActivatedRoute,) { }

  ngOnInit() {
    this.authService.enviarCorreos().subscribe((res: any) => { });
    this.authService.enviarCorreosIndicadores().subscribe((res: any) => { });
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
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
    this._success.subscribe((message) => (this.successMessage = message));
  }

  selectElement(id, valueToSelect) {
    let element;
    element = document.getElementById(id);
    element.value = valueToSelect;
  }


  public changeSuccessMessage(i: number) {
    if (i == 1) {
      this._success.next("¡Se guardó existosamente!");
    }
    if (i == 2) {
      this._success.next("¡Error!, la categoría ya existe");
    }
    if (i == 3) {
      this._success.next("¡Error!, debe seleccionar el estándar");
    }
    if (i == 4) {
      this._success.next("¡Error!, debe ingresar el nombre de la categoría");
    }
  }

  getStandares() {
    this.authService.getStandares(this.Categoria).subscribe((res: any) => {
      this.resultados = res.map((item) => {
        return item;
      });
      this.selectElement("estandar", this.id);
      this.Estandar.setValue(this.id);
      this.Categoria.IdEstandar = this.id.toString();
    });
  }

  crear_categoria() {
    this.Categoria.IdEstandar = this.Estandar.value;
    if (this.Categoria.IdEstandar == '') {
      this.changeSuccessMessage(3);
    }
    else {
      if (this.Categoria.NombreCategoria == '') {
        this.changeSuccessMessage(4);
      }
      else {
        this.cargandoService.ventanaCargando();
        this.authService.crear_categoria(this.Categoria).subscribe((res: any) => {
          if (res.resul == "Categoria guardada") {
            this.router.navigate(["subcategoria/" + this.Categoria.IdEstandar + "/" + res.id]);
            return this.alerta("Categoría creada exitosamente");
          } else {
            Swal.close()
            this.changeSuccessMessage(2);
          }
        });
      }
    }
  }

  alerta(mensaje: any) {
    Swal.fire(mensaje);
  }
}
