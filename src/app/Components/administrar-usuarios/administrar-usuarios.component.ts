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
    typeuser: "",
    nombreTipo: "",
  };
  estadoSelecionado = {
    id: "",
  };

  resultadosTabla = [];
  resultadosTipoUsuario = {};
  resultadosEstado = {};
  estado = [];
  buscarInput: String;

  ngOnInit() {
    this.getUsuariosApi();
    this.getTipoUsuarioApi();
    this.getUsuarioApi();
  }

  tipoUsuarioFiltro() {
    console.log("aqui");
    if (this.tipoUsuario.typeuser == "") {
      this.getUsuariosApi();
      this.getUsuarioApi();
      return true;
    }
    this.authService.getUsuarios(this.usuarios).subscribe((res: any) => {
      this.resultadosTabla = res.filter((item) => {
        return item.typeuser == this.tipoUsuario.typeuser;
      });
      this.estado = this.resultadosTabla;
    });
  }

  getEstadoFiltro() {
    if (this.estadoSelecionado.id == "") {
      this.tipoUsuarioFiltro();
      return true;
    }
    this.resultadosTabla = this.estado.filter((item) => {
      return item.estado == parseInt(this.estadoSelecionado.id);
    });
  }

  getTipoUsuarioApi() {
    this.authService.getTipoUsuario(this.tipoUsuario).subscribe((res: any) => {
      this.resultadosTipoUsuario = res.map((item) => {
        this.estado = res;
        return item;
      });
    });
  }

  getUsuarioApi() {
    this.authService.getUsuarios(this.estado).subscribe((res: any) => {
      this.estado = res.map((item) => {
        return item;
      });
    });
  }

  getUsuariosApi() {
    this.authService.getUsuarios(this.usuarios).subscribe((res: any) => {
      this.resultadosTabla = res.map((item) => {
        return item;
      });
    });
  }

  buscar() {
    this.authService.getUsuarios(this.usuarios).subscribe((res: any) => {
      this.resultadosTabla = res.filter((item) => {
        return (
          item.tipoUsuario.includes(this.buscarInput) ||
          item.nombre.includes(this.buscarInput) ||
          item.correo.includes(this.buscarInput)
        );
      });
    });
  }
}
