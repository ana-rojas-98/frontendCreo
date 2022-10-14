import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  constructor(private sanitizer:DomSanitizer) { }

  ngOnInit() {
  }

   guardarimg =[];
   prev : string;
   subido = [];
  captImg(event){
    const imagen = event.target.files[0];
    this.extraerBase64(imagen).then((i:any) => {
      this.prev = i.base;
    })
    this.guardarimg.push(imagen);
     console.log(this.subido);
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

}
