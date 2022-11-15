import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';
import { AuthService } from "src/app/services/auth.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {
  usarioLocalStote: any;

  constructor(private authService: AuthService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.authService.enviarCorreos().subscribe((res: any) => {});
    this.authService.enviarCorreosIndicadores().subscribe((res: any) => {});
    
    this.getConfiguracion();
    this._success.subscribe((message) => (this.successMessage = message));

  }

  private _success = new Subject<string>();
  successMessage = "";
  @ViewChild("selfClosingAlert", { static: false }) selfClosingAlert: NgbAlert;
  logo: File = null;
  prev: string;
  logoEstatico;
  captImg(event) {
    const imagen = event.target.files[0];
    this.extraerBase64(imagen).then((i: any) => {
      this.prev = i.base;
    })
    this.logo = imagen;
  }
  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const leer = window.URL.createObjectURL($event);
      const im = this.sanitizer.bypassSecurityTrustUrl(leer);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = () => {
        resolve({
          base: null
        });
      }
    }
    catch (e) {
      return null;
    }
  });

  configuracion = {
    nombreEmpresa: "",
    inicial: "",
    final: "",
  }

  resultado = {};

  guardarConfiguracion() {
    const enviarimg = new FormData();

    enviarimg.append('nombre', this.configuracion.nombreEmpresa);
    enviarimg.append('inicio', this.configuracion.inicial);
    enviarimg.append('final', this.configuracion.final);
    enviarimg.append('logo', this.logo);
    this.usarioLocalStote = JSON.parse(localStorage.getItem("usario"));
    let Usuarioid = this.usarioLocalStote.usuarioid
    enviarimg.append("UsuarioID", Usuarioid);
    if (this.configuracion.nombreEmpresa == "") {
      this.changeSuccessMessage(2);
    } else if (this.configuracion.inicial == null) {
      this.changeSuccessMessage(3);
    } else if (this.configuracion.final == null) {
      this.changeSuccessMessage(4);
    } else if (this.configuracion.inicial > this.configuracion.final) {
      this.changeSuccessMessage(1);
    } else {
      this.authService.setConfiguracion(enviarimg).subscribe((res: any) => {
        if (res) {
          this.alerta("Configuración cambiada")
          location.reload();
        }
      });

      return enviarimg;
    }
  }

  getConfiguracion() {
    this.authService.traerDatosConf(this.configuracion).subscribe((res: any) => {
      this.resultado = res;
      this.configuracion.nombreEmpresa = res.nombreEmpresa;
      this.configuracion.inicial = res.añoInicial;
      this.configuracion.final = res.añoFinal;
    });

    this.authService.getImagen().subscribe((res) => {
      let nombreArchivo = res.headers.get("content-disposition");
      let tipo: Blob = res.body as Blob;
      const b = URL.createObjectURL(tipo);
      const im = this.sanitizer.bypassSecurityTrustUrl(b);
      this.logoEstatico = im;
    })
  }

  public changeSuccessMessage(i: number) {
    if (i == 1) {
      this._success.next("¡Error!, El año inicial debe ser mayor que el año final");
    }
    if (i == 2) {
      this._success.next("¡Error!, debe ingresar nombre empresa");
    }
    if (i == 3) {
      this._success.next("¡Error!, debe ingresar un año inicial");
    }
    if (i == 4) {
      this._success.next("¡Error!, debe ingresar un año final");
    }
  }

  alerta(mensaje: any) {
    Swal.fire(mensaje);
  }
}
