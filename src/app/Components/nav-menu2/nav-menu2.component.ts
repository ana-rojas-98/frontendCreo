import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-menu2',
  templateUrl: './nav-menu2.component.html',
  styleUrls: ['./nav-menu2.component.scss']
})
export class NavMenu2Component implements OnInit {

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
