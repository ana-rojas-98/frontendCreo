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

  tipoUsuario = {
    typeuser: 1,
    nombreTipo: "",
  };

  resultados = [];
  resultadosTipoUsuario = {};
  resultadosEstado = {};
  estado = "";

  ngOnInit() {
    this.getUsuariosfilter();
    this.getTipoUsuario();
    this.getEstado();
  }

  MtipoUsuario() {
    this.authService.getUsuarios(this.usuarios).subscribe((res: any) => {
      this.resultados = res.filter((item) => {
        return item.typeuser == this.tipoUsuario.typeuser;
      });
      this.estado = res
    });
  }

  getEstado() {
    console.log(this.estado);
  }

  getTipoUsuario() {
    this.authService.getTipoUsuario(this.tipoUsuario).subscribe((res: any) => {
      this.resultadosTipoUsuario = res.map((item) => {
        this.estado = res;
        return item;
      });
    });
  }

  getUsuarios() {
    this.authService.getUsuarios(this.usuarios).subscribe((res: any) => {
      this.resultados = res.map((item) => {
        return item;
      });
    });
  }

  getUsuariosfilter() {
    this.authService.getUsuarios(this.usuarios).subscribe((res: any) => {
      this.resultados = res.map((item) => {
        return item;
      });
    });
  }
}
