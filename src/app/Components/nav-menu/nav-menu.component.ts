import { Component , OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit{

  constructor(private authService: AuthService, private sanitizer:DomSanitizer){}
  isExpanded = false;
  logo : string;
  ngOnInit (){
    this.mostrarImg();
  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  

  mostrarImg(){
    console.log('aqui va una imagen');
    this.authService.getImagen().subscribe((res) =>{
      this.extraerBase64(res).then((i:any)=>{
        this.logo=i.base;
      }); 
    })

  }

  extraerBase64 = async (imagen: any) => new Promise((resolve, reject)=>{
    try{
      const leer = window.URL.createObjectURL(imagen);
      const im = this.sanitizer.bypassSecurityTrustUrl(leer);
      const reader = new FileReader();
      reader.readAsDataURL(imagen);
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
