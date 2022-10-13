import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { AdministrarUsuariosService } from "src/app/services/administrar-usuarios.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-administrar-usuarios",
  templateUrl: "./administrar-usuarios.component.html",
  styleUrls: ["./administrar-usuarios.component.scss"],
})
export class AdministrarUsuariosComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private serviceAdministaraUsuario: AdministrarUsuariosService,
    private router: Router
  ) {}
  usuarios = {
    tipoUsuario: "",
    nombre: "",
    telefono: "",
    correo: "",
  };

  idUsuarioLogueado = "";
  buscarText = false;

  tipoUsuario = {
    typeuser: "",
    nombreTipo: "",
  };
  estadoSelecionado = {
    id: "",
  };

  usarioid = {
    usarioid: "",
  };

  resultadosTabla = [];
  resultadosTipoUsuario = {};
  resultadosEstado = {};
  estado = [];
  buscarInput: String;

  ngOnInit() {
    this.idUsuarioLogueado = localStorage.getItem("idUsuario");
    this.getUsuariosApi();
    this.getTipoUsuarioApi();
    this.getUsuarioApi();
  }

  modificarUsuario(UsuarioIdModificar, typeuserModificar) {
    let usarioLocalStote = JSON.parse(localStorage.getItem("usario"));
    let typeuser = parseInt(usarioLocalStote.typeuser)
    if (typeuser <= typeuserModificar) {
      this.router.navigate(['crear-usuarios',typeuserModificar])
      this.serviceAdministaraUsuario.UsuarioIdModificar.emit(UsuarioIdModificar);
    } else if (typeuser > typeuserModificar) {
      this.alert("No puedes realizar esta operacion")
    }
    
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
          item.nombreTipoUsuario.includes(this.buscarInput) ||
          item.nombre.includes(this.buscarInput) ||
          item.correo.includes(this.buscarInput)
        );
      });
    });
  }

  eliminarUsuario(usuarioid, typeuserEliminar) {
    let usarioLocalStote = JSON.parse(localStorage.getItem("usario"));
    let typeuser = parseInt(usarioLocalStote.typeuser);
    if (typeuser >= typeuserEliminar) {
      this.authService.eliminarUsuario(usuarioid).subscribe((res: any) => {
        if (res.codigo == 1) {
          this.getUsuariosApi();
          this.getTipoUsuarioApi();
          this.getUsuarioApi();
          return this.alert("Usuario eliminado");
        } else {
          return this.alert("No se pudo eliminar");
        }
      });
    } else if (typeuser < typeuserEliminar) {
      this.alert("No puedes eliminar el usuario")
    }
  }
  alert(mensaje) {
    Swal.fire(mensaje);
  }
}
