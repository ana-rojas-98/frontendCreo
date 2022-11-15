import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { NgModule } from '@angular/core';
import { ReportesService } from 'src/app/services/reportes.service';
import { VisorEventosService } from 'src/app/services/visor-eventos.service';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-visor-eventos',
  templateUrl: './visor-eventos.component.html',
  styleUrls: ['./visor-eventos.component.scss']
})
export class VisorEventosComponent implements OnInit {

  fechaInicial = "2022-11-16";
  fechaFinal = "2022-11-16";
  resultadosModulos1 = "";
  resultadosModuloss = [];

  constructor(private VisorEventosService: VisorEventosService,
    private reportesService: ReportesService) { }

  resultadosTabla = [];
  resultadosTabla2 = [];
  resultadosUsuario = [];
  resultadosModulos: any;

  resultadosModulo = {
    modulo: "",
  };

  Usuario = {
    usuario: "",
  };

  ngOnInit() {
    this.fechaInicial = "2022-11-16";
    this.fechaFinal = "2022-11-16";

    this.GetEventos();
    this.GetUsuarios(0);
  }

  GetEventos() {
    this.VisorEventosService.GetEventos().subscribe((res: any) => {
      this.resultadosTabla = res.map((item) => {
        this.resultadosModuloss.push(item.modulo);
        return item;
      });
      this.resultadosTabla = this.resultadosTabla.sort();
      this.resultadosTabla = this.resultadosTabla.reverse();
      this.resultadosTabla2 = this.resultadosTabla;
      this.resultadosModulos = new Set(this.resultadosModuloss);
      this.resultadosModulos = [...this.resultadosModulos];
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

  moduloFilter() {
    this.resultadosTabla = this.resultadosTabla2.filter(fecha => {
      return (Date.parse(fecha.fecha) >= Date.parse(this.fechaInicial) && Date.parse(fecha.fecha) <= Date.parse(this.fechaFinal));
    });
    if (this.Usuario.usuario == "" && this.resultadosModulo.modulo == "") {
      this.changeFecha();
    }
    else
      if (this.Usuario.usuario != "") {
        if (this.resultadosModulo.modulo != "") {
          this.resultadosTabla = this.resultadosTabla.filter((item) => (item.modulo == this.resultadosModulo.modulo && item.idusuario == this.Usuario.usuario));
        }
        else {
          
          this.resultadosTabla = this.resultadosTabla.filter((item) => (item.idusuario == this.Usuario.usuario));
        }
      }
      else {
        this.resultadosTabla = this.resultadosTabla.filter((item) => (item.modulo == this.resultadosModulo.modulo));
      }
  }

  usuarioFilter() {
    this.resultadosTabla = this.resultadosTabla2.filter(fecha => {
      return (Date.parse(fecha.fecha) >= Date.parse(this.fechaInicial) && Date.parse(fecha.fecha) <= Date.parse(this.fechaFinal));
    });
    if (this.Usuario.usuario == "" && this.resultadosModulo.modulo == "") {
      this.changeFecha();
    }
    else
      if (this.resultadosModulo.modulo != "") {
        if (this.Usuario.usuario != "") {
          this.resultadosTabla = this.resultadosTabla.filter((item) => (item.modulo == this.resultadosModulo.modulo && item.idusuario == this.Usuario.usuario));
        }
        else {
          this.resultadosTabla = this.resultadosTabla.filter((item) => (item.modulo == this.resultadosModulo.modulo));
        }
      }
      else {
        this.resultadosTabla = this.resultadosTabla.filter((item) => (item.idusuario == this.Usuario.usuario));
      }
  }

  changeFecha() {
    if (this.fechaFinal < this.fechaInicial) {
      alert("La fecha inicial debe ser mayor a la final");
      this.fechaFinal = this.fechaInicial;
    }
    this.resultadosTabla = this.resultadosTabla2.filter(fecha => {
      return (Date.parse(fecha.fecha) >= Date.parse(this.fechaInicial) && Date.parse(fecha.fecha) <= Date.parse(this.fechaFinal));
    });
    if (this.Usuario.usuario != "") {
      this.resultadosTabla = this.resultadosTabla.filter((item) => (item.modulo == this.resultadosModulo.modulo && item.idusuario == this.Usuario.usuario));
    }
    if (this.resultadosModulo.modulo != "") {
      this.resultadosTabla = this.resultadosTabla.filter((item) => (item.modulo == this.resultadosModulo.modulo && item.idusuario == this.Usuario.usuario));
    }

  }

}