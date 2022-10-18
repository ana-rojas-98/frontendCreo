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

  constructor(private authService: AuthService, private sanitizer:DomSanitizer) { }

  ngOnInit() {
  }

   logo: File = null;
   prev : string; 

  captImg(event){
    const imagen = event.target.files[0];
    this.extraerBase64(imagen).then((i:any) => {
      this.prev = i.base;
    })
    this.logo = imagen;
  }
  extraerBase64 = async ($event: any) => new Promise((resolve, reject)=>{
    try{
      const leer = window.URL.createObjectURL($event);
      const im = this.sanitizer.bypassSecurityTrustUrl(leer);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () =>{
        resolve({
          base: reader.result
        });
      };
      reader.onerror = () =>{
        resolve({
          base: null
        });
      }
    }
    catch (e){
      return null;
    }
  });

  configuracion={
    nombreEmpresa:"",
    inicial:"",
    final:"",
  }

  guardarConfiguracion(){    
  const enviarimg = new FormData ();
  
  enviarimg.append('logo',this.prev);
  enviarimg.append('nombre',this.configuracion.nombreEmpresa);
  enviarimg.append('inicio',this.configuracion.inicial);
  enviarimg.append('final',this.configuracion.final);

  this.authService.setConfiguracion(enviarimg).subscribe((res:any)=>
  {
    console.log(res)
  });
  return enviarimg;
  }
  
}
