import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ReportesService } from 'src/app/services/reportes.service';
import { VisorEventosService } from 'src/app/services/visor-eventos.service';
import {FormGroup, FormControl} from '@angular/forms';
import Swal from 'sweetalert2';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-visor-eventos',
  templateUrl: './visor-eventos.component.html',
  styleUrls: ['./visor-eventos.component.scss']
})
export class VisorEventosComponent implements OnInit {

  constructor(private VisorEventosService: VisorEventosService,
    private reportesService: ReportesService) { }

  resultadosTabla = [];
  resultadosUsuario = [];
  resultadosModulos = [];

  Usuario = {
    usuario: "",
  };

  ngOnInit() {
    this.GetEventos();
    this.GetUsuarios(0);
  }

  GetEventos(){
    this.VisorEventosService.GetEventos().subscribe((res: any) => {
      this.resultadosTabla = res.map((item) => {
        this.resultadosModulos.push(item.modulo);
        return item;
      });
    });
  }

  GetUsuarios(dato) {
    if (dato == 0) {
      this.reportesService.GetUsuarios().subscribe((res: any) => {
        this.resultadosUsuario = res.map((item) => {
          return item;
        });
      });
    }
  }

}