import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { async } from 'rxjs/internal/scheduler/async';
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  constructor(private authService: AuthService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getConfiguracion();
  }
  fecha = new Date();
  year = this.fecha.getFullYear();

  logo: File = null;
  prev: string;
  logoEstatico;
  captImg(event) {
    const imagen = event.target.files[0];
    this.extraerBase64(imagen).then((i: any) => {
      this.prev = i.base;
    })
    this.logo = imagen;
  }
  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const leer = window.URL.createObjectURL($event);
      const im = this.sanitizer.bypassSecurityTrustUrl(leer);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = () => {
        resolve({
          base: null
        });
      }
    }
    catch (e) {
      return null;
    }
  });

  configuracion = {
    nombreEmpresa: "",
    inicial: "",
    final: "",
  }

  resultado = {};

  guardarConfiguracion() {
    const enviarimg = new FormData();

    enviarimg.append('nombre', this.configuracion.nombreEmpresa);
    enviarimg.append('inicio', this.configuracion.inicial);
    enviarimg.append('final', this.configuracion.final);
    enviarimg.append('logo', this.logo);

    console.log('año inicial', this.configuracion.inicial);
    console.log('año final', this.configuracion.final);

    if (this.configuracion.inicial > this.configuracion.final) {
      alert("El año inicial debe ser mayor que el año final");
    } else {
      this.authService.setConfiguracion(enviarimg).subscribe((res: any) => {
        console.log('hola', res);
        if(res){
          location.reload();
        }
      });

      return enviarimg;
    }
  }

  getConfiguracion() {
    this.authService.traerDatosConf(this.configuracion).subscribe((res: any) => {
      this.resultado = res.map((item)=>{
        let ultimo= item[item.length-1];
        console.log("ultimo",ultimo)
          return ultimo;
      });
    });

    this.authService.getImagen().subscribe((res) =>{
      let nombreArchivo = res.headers.get("content-disposition");
      let tipo: Blob = res.body as Blob;
      const b = URL.createObjectURL(tipo);
      const im = this.sanitizer.bypassSecurityTrustUrl(b);
      this.logoEstatico=im;
      console.log("entra para mostrar")
    })
  }
}
