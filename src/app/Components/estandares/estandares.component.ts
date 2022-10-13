import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

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
    this.authService.crear_estandar(this.Estandar).subscribe((res:any) => {
      if(res.result == "se guardo exitosamente"){
        this.router.navigate(['categorias']);
        return this.alerta(res.result);
      }else{
        this.alerta("no se pudo agregar el nuevo estandar"); 
      }
                
    })
  } 

  alerta(mensaje:any){
    Swal.fire(mensaje);
  }

}
