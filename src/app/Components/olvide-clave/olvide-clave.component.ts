import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-olvide-clave",
  templateUrl: "./olvide-clave.component.html",
  styleUrls: ["./olvide-clave.component.scss"],
})
export class OlvideClaveComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  email = {
    Email: "",
  };

  validateEmail() {
    console.log("hola: ",this.email);
    this.authService.validar_correo(this.email).subscribe((res: any) => {
      console.log(res);
    });
  }
}

