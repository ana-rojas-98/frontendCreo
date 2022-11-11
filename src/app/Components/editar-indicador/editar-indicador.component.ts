import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { FormControl } from "@angular/forms";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-indicador',
  templateUrl: './editar-indicador.component.html',
  styleUrls: ['./editar-indicador.component.scss']
})
export class EditarIndicadorComponent implements OnInit {

  constructor(private authService: AuthService, private route: ActivatedRoute, public router: Router) { }
  Estandar = new FormControl("");
  Categoria = new FormControl("");
  Subcategoria = new FormControl("");

  id = 0;
  accionEditar = "";
  editar = false;
  resultadosTabla = [];
  resultado:any=[];
  resultadosHTML = [];
  Respuestas = [];
  prueba = "";
  idArchivo = {
    idArchivo: 1,
  };
  resultados=[];
  resultadosCategoria = {};
  resultadosSubCategoria = {};
  datos={
    Estandar:"",
    Categoria:"",
    Subcategoria:"",

  }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.accionEditar = this.route.snapshot.paramMap.get("accion");
    if (this.accionEditar == "editar") {
      this.editar = true;
    }
    this.idArchivo.idArchivo = this.id;
    this.TraerFormato();
    this.getStandares();
    this.getCategoria(0);
    this.getSubCategoria(0);
  }
  TraerFormato(){
    this.authService.EditarIndicador().subscribe((respuesta: any)=>{
      this.resultado = respuesta.map((item)=>{
        if(this.idArchivo.idArchivo == item.idArchivo){
          this.resultadosTabla.push(item)
          this.datos.Estandar = item.nombreEstandar;
          this.datos.Categoria = item.nombreCategoria;
          this.datos.Subcategoria = item.nombreSubcategoria;
        }
        return item;
      });           
    });
  }
  getStandares() {
    this.authService.getStandares("").subscribe((res: any) => {
      this.resultados = res.map((item) => {
        return item;
      });
    });
  }

  getCategoria(estandar) {
    if (estandar == 0) {
      this.authService.getCategoria("").subscribe((res: any) => {
        this.resultadosCategoria = res.map((item) => {
          return item;
        });
      });
    } else {
      this.authService.getCategoria("").subscribe((res: any) => {
        this.resultadosCategoria = res.filter(
          (item) => item.idEstandar == estandar
        );
      });
    }
  }

  getSubCategoria(categoria) {
    if (categoria == 0) {
      this.authService
        .getSubCategoria("")
        .subscribe((res: any) => {
          this.resultadosSubCategoria = res.map((item) => {
            return item;
          });
        });
    } else {
      this.authService
        .getSubCategoria("")
        .subscribe((res: any) => {
          this.resultadosSubCategoria = res.filter(
            (item) => item.idCategoria == categoria
          );
        });
    }
  }

  guardar(){
    console.log("resulatado",this.resultadosTabla)
    this.authService.enviarIndicadorEsitado(this.resultadosTabla).subscribe((res)=>{
      if(res){
        this.alerta("Editado")
      }
      return res;
    });
  }
  alerta(mensaje: any) {
    Swal.fire(mensaje);
  }
}
