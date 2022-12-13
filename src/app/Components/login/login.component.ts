import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { NgbAlert, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { AdministrarUsuariosService } from "src/app/services/administrar-usuarios.service";


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  user = {
    Email: "",
    Password: "",
  };

  id = {
    Usuarioid: 107,
  };


  private _success = new Subject<string>();

  successMessage = '';

  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;

  constructor(private authService: AuthService, private router: Router, private serviceAdministaraUsuario: AdministrarUsuariosService) { }

  public changeSuccessMessage() { this._success.next('Correo electrónico o contraseña invalidos'); }
  usuarioLocalStote = JSON.parse(localStorage.getItem("usario"));
  token = localStorage.getItem("token");
  ngOnInit()
  {
    if (this.token) {
      return this.router.navigate(["private"]);
    }
    let UsuarioIdModificar;
    this._success.subscribe(message => this.successMessage = message);
    this.serviceAdministaraUsuario.Prueba.emit(UsuarioIdModificar);
  }

  getPermisos(id) {
    this.authService.getUsuarioModificar(id).subscribe((res: any) => {
      localStorage.setItem("usario", JSON.stringify(res));
      this.router.navigate(["private"]);
    });
  }

  LogIn() {
    this.authService.signin(this.user).subscribe((res: any) => {
      if (res.resul == 'Credenciales incorrectas') {
        this.changeSuccessMessage();
      }
      else {
        this.id.Usuarioid = res.usuario.usuarioid;
        localStorage.setItem("token", res.payload);
        localStorage.setItem("idUsuario", res.usuario.usuarioid);
        this.getPermisos(this.id);
        this.id.Usuarioid = res.usuario.usuarioid;
        return res;
      }
    });
  }
}
