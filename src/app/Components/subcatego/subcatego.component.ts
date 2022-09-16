import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-subcatego',
  templateUrl: './subcatego.component.html',
  styleUrls: ['./subcatego.component.scss']
})
export class SubcategoComponent implements OnInit {

  Subcategoria={
    NombreSubcategoria:"",
    IdCategoria:""
  }  
  constructor(   
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  SetSubCategoria(){
    console.log(this.Subcategoria);
    this.authService.crear_subcategoria(this.Subcategoria).subscribe((res:any) => {
      console.log(res);                 
    })
  } 

}
