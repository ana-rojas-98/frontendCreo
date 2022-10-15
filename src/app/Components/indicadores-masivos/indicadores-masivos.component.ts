import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-indicadores-masivos',
  templateUrl: './indicadores-masivos.component.html',
  styleUrls: ['./indicadores-masivos.component.scss']
})
export class IndicadoresMasivosComponent implements OnInit {

  constructor(private authService: AuthService) { }
  archivos: File = null;
  ensayo = [];

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

  nombres = [
    {
      id: "1",
      periodicidad: "mensual",
    },
    {
      id: "2",
      periodicidad: "bimensual",
    },
    {
      id: "3",
      periodicidad: "trimestral",
    },
    {
      id: "4",
      periodicidad: "cuatrimestral",
    },
    {
      id: "5",
      periodicidad: "semestral",
    },
    {
      id: "6",
      periodicidad: "anual",
    },
  ];
  seleccionado = {
    id: "",
  };
  variableP = [];
  
  valor: FormGroup;
  Periodicidad(){
   this.valor = new FormGroup({});
   for (let index = 0; index < this.nombres.length; index++) {
    this.valor.addControl('control'+index,this.valor)
    console.log('valor', this.valor)
   }
   console.log('afuera valor', this.valor)
  const otro: FormControl = new FormControl();
  console.log('form control',otro.setValue)
  for (let index = 0; index < this.nombres.length; index++) {
   console.log('dentro for control', otro.value )   
  }
  }

  estandar() {
    this.estandarFil = this.Estandar.estandar;
    this.getCategoria(this.estandarFil);
    this.getSubCategoria(0);
    console.log('estandr Fil',this.estandarFil)
    console.log('resultado estandar', this.resultados)
    console.log('estandar objeto', this.Estandar)
    console.log('estandarid', this.estandarId)
  }

  categoria() {
    this.categoriaFil = this.Categoria.categoria1;
    this.getSubCategoria(this.categoriaFil);
  }

  ngOnInit() {    
    this.getStandares();
  }
  getStandares() {
    this.authService.getStandares(this.Estandar).subscribe((res: any) => {
      this.resultados = res.map((item) => {
        return item;
      });
    });
  }

  getCategoria(estandar) {
    this.authService.getCategoria(this.Categoria).subscribe((res: any) => {
      this.resultadosCategoria = res.filter(
        (item) => item.idEstandar == estandar
      );
    });
  }

  getSubCategoria(categoria) {
    this.authService
      .getSubCategoria(this.SubCategoria)
      .subscribe((res: any) => {
        this.resultadosSubCategoria = res.filter(
          (item) => item.idCategoria == categoria
        );
      });
  }


  capturarArchivo(){
    //funciona
     const idInput = document.getElementById("in") as HTMLInputElement;
     for (let index = 0; index < idInput.files.length; index++) {
      const element = idInput.files[index];
      this.archivos = element;
      this.ensayo.push(this.archivos);
     } 
  }

  descargarArchivo(){
    this.authService.descarga().subscribe(res=>{
      let nombreArchivo = res.headers.get('content-disposition')
      //?.split(';')[1].split('=')[1];
      let tipo:Blob=res.body as Blob;
      let a = document.createElement('a');
      a.download = 'ArchivoEjemplo.xlsx';
      a.href = window.URL.createObjectURL(tipo);
      a.click();
    })
  }

}
