import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-ver-indicador',
  templateUrl: './ver-indicador.component.html',
  styleUrls: ['./ver-indicador.component.scss']
})
export class VerIndicadorComponent implements OnInit {

  constructor(private route: ActivatedRoute, public router: Router, private authService: AuthService) { }

  id = 0;
  accionVer = "";
  ver = false;
  resultadosTabla = [];
  resultado:any=[];
  resultadosHTML = [];
  Respuestas = [];
  imagen = "";
  idArchivo = {
    idArchivo: 1,
  };

  datos={
    Estandar:"",
    Categoria:"",
    Subcategoria:"",

  }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.accionVer = this.route.snapshot.paramMap.get("accion");
    if (this.accionVer == "ver") {
      this.ver = true;
    }
    this.idArchivo.idArchivo = this.id;

    this.TraerFormato();
  }

  TraerFormato(){
    this.authService.EditarIndicador().subscribe((respuesta: any)=>{
      this.resultado = respuesta.map((item)=>{
        if(this.idArchivo.idArchivo == item.idArchivo){
          this.resultadosTabla.push(item)
          this.resultadosHTML.push(item.html)
          this.datos.Estandar = item.nombreEstandar;
          this.datos.Categoria = item.nombreCategoria;
          this.datos.Subcategoria = item.nombreSubcategoria;
        }

        return item;
      });           
    });
    this.vistaPrevia();
  }

  vistaPrevia(){
  }
 
}
