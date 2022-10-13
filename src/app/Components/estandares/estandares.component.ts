import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estandares',
  templateUrl: './estandares.component.html',
  styleUrls: ['./estandares.component.scss']
})
export class EstandaresComponent implements OnInit {
  private _success = new Subject<string>();

  successMessage = '';

  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;
  
  public changeSuccessMessage(i: number) { 
    if (i == 1)
    {
      this._success.next('¡Se guardó existosamente!'); 
    }
    if (i == 2)
    {
      this._success.next('¡Error!, el estándar ya existe'); 
    }
  }

  Estandar={
    NombreEstandar:""
  }  
  constructor(   
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this._success.subscribe(message => this.successMessage = message);
  }
  SetEstandar(){
    this.authService.crear_estandar(this.Estandar).subscribe((res:any) => {
      if(res.result == "se guardo exitosamente"){
        this.changeSuccessMessage(1);
        this.router.navigate(['categorias']);
      }else{
        this.changeSuccessMessage(2);
      }
                
    })
  } 
}
