import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-administrar-usuarios",
  templateUrl: "./administrar-usuarios.component.html",
  styleUrls: ["./administrar-usuarios.component.scss"],
})
export class AdministrarUsuariosComponent implements OnInit {
  constructor(private authService: AuthService) {}
  usuarios = {
    tipoUsuario: "",
    nombre: "",
    telefono: "",
    correo: "",
  };

  resultados = {}

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios() {
    this.authService.getUsuarios(this.usuarios).subscribe((res: any) => {
      this.resultados = res.map((item) => {
        return item;
      });
    });
  }
}
