import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouteConfigLoadEnd } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LicenciaService } from 'src/app/services/licencia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-licencia',
  templateUrl: './licencia.component.html',
  styleUrls: ['./licencia.component.scss']
})
export class LicenciaComponent implements OnInit {
  sanitizer: any;

  constructor(private authService: AuthService, private licenciaService: LicenciaService) { }
  Licencia = {
    Licencia1: "",
  }

  ngOnInit() {
    this.GetLicencia();
  }
  private _success = new Subject<string>();
  successMessage = "";
  @ViewChild("selfClosingAlert", { static: false }) selfClosingAlert: NgbAlert;
  logo: File = null;
  prev: string;

  UpdateLicencia() {
    this.licenciaService.UpdateLicencia(this.Licencia).subscribe((res: any) => {
      if (res.resul == "ok") {
        this.alerta("Licencia actualizada");
        location.reload();
      }
    });
  }

  GetLicencia() {
    this.licenciaService.GetLicencia(this.Licencia).subscribe((res: any) => {
      this.Licencia.Licencia1 = res.licencia1;
    });
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
