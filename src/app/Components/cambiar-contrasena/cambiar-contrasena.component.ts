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
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.scss']
})
export class CambiarContrasenaComponent implements OnInit {

  constructor(public router: Router,
    private authService: AuthService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  usarioLocalStote = JSON.parse(localStorage.getItem("usario"));
  contrasenaActual = "";
  contrasenaNueva = "";
  contrasenaNuevaConfirma = "";

  contrasenas = {
    password: this.contrasenaActual,
    newpassword: this.contrasenaNueva,
    confirmnewpass: this.contrasenaNuevaConfirma,
    Usuarioid: this.usarioLocalStote.usuarioid,
  };

  guardarConfiguracion(){
    this.contrasenas.password = this.contrasenaActual;
    this.contrasenas.newpassword = this.contrasenaNueva;
    this.contrasenas.confirmnewpass = this.contrasenaNuevaConfirma;

    if (this.contrasenas.password == "" || this.contrasenas.newpassword == "" || this.contrasenas.confirmnewpass == "")
    {
      this.alert("Los campos marcados con '*' no pueden estar vacios");
    }
    else if (this.contrasenas.newpassword != this.contrasenas.confirmnewpass)
    {
      this.alert("Las contraseñas no coinciden");
    }
    else{
      this.authService.CambioContrasena(this.contrasenas).subscribe((res: any) => {
        if (res.resul == "ok"){
          this.alert("Contraseña cambiada correctamente");
          location.reload();
        }
        else if (res.resul == "No coinciden")
        {
          this.alert("La contraseña actual es incorrecta");
        }
        else
        {
          this.alert("Error");
        }
        return res;
      });
    }
  }

  alert(mensaje) {
    Swal.fire(mensaje);
  }


}
