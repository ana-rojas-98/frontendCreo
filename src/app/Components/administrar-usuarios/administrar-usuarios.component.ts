import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
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
    public router: Router
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

  resultadosTabla: any = [];
  resultadosTipoUsuario:any = [];
  resultadosEstado:any = [];
  estado:any = [];
  buscarInput: String;
  permisoModificar = true;
  permisoVer = true;
  permioEliminar = true;
  permisoCrear = true;
  eliminarMe = true;
  usarioLocalStote = JSON.parse(localStorage.getItem("usario"));
  typeuser = parseInt(this.usarioLocalStote.typeuser);

  ngOnInit() {
    this.authService.enviarCorreos().subscribe((res: any) => {});
    this.authService.enviarCorreosIndicadores().subscribe((res: any) => {});

    if (this.usarioLocalStote.typeuser == "3") {
      this.router.navigate(["private"]);
      return true;
    }
    if (this.usarioLocalStote.permisosEditar == false) {
      this.permisoModificar = false;
    }
    if (this.usarioLocalStote.permisosVer == false) {
      this.permisoVer = false;
    }
    if (this.usarioLocalStote.permisosEliminar == false) {
      this.permioEliminar = false;
    }
    if (this.usarioLocalStote.permisosCrear == false) {
      this.permisoCrear = false;
    }

    if (
      this.usarioLocalStote.permisosCrear == false &&
      this.usarioLocalStote.permisosVer == false &&
      this.usarioLocalStote.permisosEditar == false &&
      this.usarioLocalStote.permisosEliminar == false
    ) {
      this.router.navigate(["private"]);
      return true;
    }

    this.getUsuariosApi();
    this.getTipoUsuarioApi();
    this.getUsuarioApi();
  }

  modificarUsuario(UsuarioIdModificar, typeuserModificar) {
    let usarioLocalStote = JSON.parse(localStorage.getItem("usario"));
    let typeuser = parseInt(usarioLocalStote.typeuser);
    if (typeuser >= typeuserModificar) {
      this.serviceAdministaraUsuario.UsuarioIdModificar.emit(
        UsuarioIdModificar
      );
    } else if (typeuser <= typeuserModificar) {
    }
  }

  tipoUsuarioFiltro() {
    if (this.tipoUsuario.typeuser == "") {
      this.getUsuariosApi();
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

  eliminarUsuario(usuarioid) {
    if (usuarioid == this.usarioLocalStote.usuarioid) {
      this.alert("No puedes eliminar a este usuario");
      return true;
    }

    let usuarioEliminar ={
      usuarioid:parseInt(usuarioid),
      idUsuarioRegistro:this.usarioLocalStote.usuarioid.toString()
    }

    Swal.fire({
      title: "Esta seguro de eliminar este usuario",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.authService.eliminarUsuario(usuarioEliminar).subscribe((res: any) => {
          if (res.codigo == 1) {
            this.getUsuariosApi();
            this.getTipoUsuarioApi();
            this.getUsuarioApi();
            return this.alert("Usuario eliminado");
          } else {
            return this.alert("No se pudo eliminar el usuario");
          }
        });
      } else if (result.isDenied) {
        Swal.fire("Se cancelo la petición");
      }
    })


  }
  alert(mensaje) {
    Swal.fire(mensaje);
  }
}
