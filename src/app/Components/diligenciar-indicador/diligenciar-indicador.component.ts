import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-diligenciar-indicador",
  templateUrl: "./diligenciar-indicador.component.html",
  styleUrls: ["./diligenciar-indicador.component.scss"],
})
export class DiligenciarIndicadorComponent implements OnInit {
  constructor(private route: ActivatedRoute, public router: Router) {}
  id = 0;
  accionVerModificar = "";
  modificar = false;
  ver = false;

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.accionVerModificar = this.route.snapshot.paramMap.get("accion");
    if (this.accionVerModificar == "ver") {
      this.ver = true;
      alert("vas a ver ");
    }
    if (this.accionVerModificar == "editar") {
      this.modificar = true;
      alert("vas a editar");
    }
  }
}
