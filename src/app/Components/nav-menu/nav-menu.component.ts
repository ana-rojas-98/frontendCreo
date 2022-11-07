import { Component , OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { DomSanitizer } from '@angular/platform-browser';
import { promise } from 'protractor';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit{

  constructor(private authService: AuthService, private sanitizer:DomSanitizer){}
  isExpanded = false;
  logo;
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
    this.authService.getImagen().subscribe((res) =>{
      let nombreArchivo = res.headers.get("content-disposition");
      let tipo: Blob = res.body as Blob;
      const b = URL.createObjectURL(tipo);
      const im = this.sanitizer.bypassSecurityTrustUrl(b);
      this.logo=im;
    })
  };
}
