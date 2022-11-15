import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NgbAlert } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-cambio-contrasena",
  templateUrl: "./cambio-contrasena.component.html",
  styleUrls: ["./cambio-contrasena.component.scss"],
})
export class CambioContrasenaComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  private _success = new Subject<string>();

  successMessage = '';
  
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;

  public changeSuccessMessage(i: number) { 
    if (i == 1)
    {
      this._success.next('Datos incorrectos'); 
    }
    if (i == 2)
    {
      this._success.next('Las contraseñas no coinciden'); 
    }
    if (i == 3)
    {
      this._success.next('Cambio exitoso'); 
    }
    
  }

  token = {
    email: "",
    token: "",
    pass: "",
    pass1: "",
  };

  eviarToken() {
    if (this.token.pass === this.token.pass1) {
      let token1 = {
        email: this.token.email,
        password: this.token.pass,
        token: this.token.token,
      };
      this.authService.cambiar_contrasena(token1).subscribe((res: any) => {
        if (res.resul == "Datos incorrectos") {
          this.changeSuccessMessage(1);
        } else {
          this.changeSuccessMessage(3);
          this.router.navigate(['login']);
          console.log("Cambio exitoso: ", res);
        }
      });
    } else {
      this.changeSuccessMessage(2);
    }
  }

  alerta(mensaje: any) {
    Swal.fire(
      mensaje
    )
  }

  ngOnInit() {
    this.authService.enviarCorreos().subscribe((res: any) => {});
    this.authService.enviarCorreosIndicadores().subscribe((res: any) => {});
    
    this._success.subscribe(message => this.successMessage = message);
  }
}
