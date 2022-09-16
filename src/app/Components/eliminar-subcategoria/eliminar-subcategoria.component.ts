import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-eliminar-subcategoria',
  templateUrl: './eliminar-subcategoria.component.html',
  styleUrls: ['./eliminar-subcategoria.component.scss']
})
export class EliminarSubcategoriaComponent implements OnInit {

  Subcategoria ={
    IdSubcategoria: "",
    IdCategoria: "",
    IdEstandar: "",
  }
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

}
