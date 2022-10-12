import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  getPermisos(id) {
    this.authService.getUsuarioModificar(id).subscribe((res: any) => {
      localStorage.setItem("usario", JSON.stringify(res));
      console.log(res);
    });
  }

  LogIn() {
    this.authService.signin(this.user).subscribe((res: any) => {
      this.id.Usuarioid = res.usuario.usuarioid;
      this.getPermisos(this.id);
      localStorage.setItem("token", res.payload);
      this.router.navigate(["private"]);
      localStorage.setItem("idUsuario", res.usuario.usuarioid);
      this.id.Usuarioid = res.usuario.usuarioid;
      return res;
    });
  }
}
