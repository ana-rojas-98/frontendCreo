import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IndicadoresService } from "src/app/services/indicadores.service";


@Component({
  selector: "app-diligenciar-indicador",
  templateUrl: "./diligenciar-indicador.component.html",
  styleUrls: ["./diligenciar-indicador.component.scss"],
})
export class DiligenciarIndicadorComponent implements OnInit {
  constructor(private route: ActivatedRoute, public router: Router, private indicadoresservice: IndicadoresService) { }
  id = 0;
  accionVerModificar = "";
  modificar = false;
  ver = false;
  resultadosTabla = [];
  anioArray = [];
  preciodicidadesArray = [];
  uniqueYears = [];
  uniquePeriod = [];
  resultadosHTML = [];
  prueba = "";
  el: any;

  Anio: "";
  Periodo = "";

  idArchivo = {
    idArchivo: 1,
  };

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
    this.idArchivo.idArchivo = this.id;
    this.VerDiligenciarIndicador();

  }

  filtrarInfo() {
    this.uniqueYears = [...new Set(this.anioArray)];
    console.log('Datos', this.uniqueYears);
    this.uniquePeriod = [...new Set(this.preciodicidadesArray)];
    console.log('Datos', this.uniquePeriod);
  }

  VerDiligenciarIndicador() {
    this.indicadoresservice.VerDiligenciarIndicador(this.idArchivo).subscribe((res: any) => {
      this.resultadosTabla = res.map((item) => {
        this.anioArray.push(item.anio);
        this.preciodicidadesArray.push(item.periodicidad);
        this.resultadosHTML.push(item.html);
        console.log('item',item.html);
        // document.body.insertAdjacentHTML('beforebegin',item.html);
        this.prueba += item.html;
        return item;
      });
      document.getElementById('prueba').outerHTML = this.prueba;
      // console.log('resultados', this.resultadosTabla);
      // console.log('Anio', this.anioArray);
      // console.log('Periodicidad', this.preciodicidadesArray);
      // console.log(this.resultadosHTML);
      this.filtrarInfo();
    });
  }
}
