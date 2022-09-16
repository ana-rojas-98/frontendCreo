import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-eliminar-estandar',
  templateUrl: './eliminar-estandar.component.html',
  styleUrls: ['./eliminar-estandar.component.scss']
})
export class EliminarEstandarComponent implements OnInit {

  Estandar={
    IdEstandar:""
  }
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

}
