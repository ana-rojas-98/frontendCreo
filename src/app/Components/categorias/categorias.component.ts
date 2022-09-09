import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  Categoria={
    NombreCategoria:"",
    IdEstandar:""
  }  
  constructor(   
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  SetCategoria(){
    console.log(this.Categoria);
    this.authService.crear_categoria(this.Categoria).subscribe((res:any) => {
      console.log(res);                 
    })
  } 

}
