import { nullSafeIsEquivalent } from "@angular/compiler/src/output/output_ast";
import { Component, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { NgbAlert } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { async } from "rxjs/internal/scheduler/async";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent implements OnInit {

  constructor(public router: Router,
    private authService: AuthService,
    private sanitizer: DomSanitizer) { }

  usarioLocalStote = JSON.parse(localStorage.getItem("usario"));

  configuracion = {
    Fullname: "",
    Email: "",
    Telefono: "",
    Usuarioid: this.usarioLocalStote.usuarioid,
  };

  nombre = "";
  email = "";
  telefono = "";

  ngOnInit() {
    this.Iniciar();
  }
  guardarConfiguracion() {
    this.configuracion.Fullname = this.nombre;
    this.configuracion.Email = this.email;
    this.configuracion.Telefono = this.telefono;
    if (this.configuracion.Fullname == "" || this.configuracion.Telefono == "" || this.configuracion.Email == "") {
      this.alert("Los cambios señalados con '*' no pueden estar vacios");
    }
    else {
      this.authService.GuardarMiPerfil(this.configuracion).subscribe((res: any) => {
        if (res.resul == "Credenciales correctas") {
          localStorage.setItem("usario", JSON.stringify(res.usuario));
          this.alert("Cambios realizados correctamente");
          location.reload();
        }
        return res;
      });
    }

  }

  Iniciar() {
    this.nombre = this.usarioLocalStote.nombre;
    this.email = this.usarioLocalStote.correo;
    this.telefono = this.usarioLocalStote.telefono;
  }

  alert(mensaje) {
    Swal.fire(mensaje);
  }

  cancelar(){
    window.history.back();
  }

}
