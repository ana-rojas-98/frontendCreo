import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-estandares',
  templateUrl: './estandares.component.html',
  styleUrls: ['./estandares.component.scss']
})
export class EstandaresComponent implements OnInit {

  Estandar={
    NombreEstandar:""
  }  
  constructor(   
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  SetEstandar(){
    console.log(this.Estandar);
    this.authService.crear_estandar(this.Estandar).subscribe((res:any) => {
      console.log(res);                 
    })
  } 

}
