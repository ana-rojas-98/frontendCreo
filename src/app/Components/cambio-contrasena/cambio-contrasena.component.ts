import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";



@Component({
  selector: "app-cambio-contrasena",
  templateUrl: "./cambio-contrasena.component.html",
  styleUrls: ["./cambio-contrasena.component.scss"],
})
export class CambioContrasenaComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router,) {}

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
        if (res === "El correo no existe") {
          console.log("datos incorrectos: ", res);
        } else {
          console.log("cambio exitoso: ", res);
        }
      });
    }
  }

  ngOnInit() {}
}
