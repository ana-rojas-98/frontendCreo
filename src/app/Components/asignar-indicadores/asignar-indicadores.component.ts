import { Component, Input, OnInit } from "@angular/core";
import { AdministrarUsuariosService } from "src/app/services/administrar-usuarios.service";
import { IndicadoresService } from "src/app/services/indicadores.service";
import { AuthService } from "src/app/services/auth.service";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-asignar-indicadores",
  templateUrl: "./asignar-indicadores.component.html",
  styleUrls: ["./asignar-indicadores.component.scss"],
})
export class AsignarIndicadoresComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private IndicadoresService: IndicadoresService,
    private serviceAdministaraUsuario: AdministrarUsuariosService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  public permisosIndicador: FormGroup = new FormGroup({
    id: new FormControl(""),
    idIndicador: new FormControl(""),
    ver: new FormControl(""),
    diligenciar: new FormControl(""),
    pdf: new FormControl(""),
    excel: new FormControl(""),
    word: new FormControl(""),
  });

  usuarioId: any;
  Estandar = {
    NombreEstandar: "",
    estandar: "",
  };

  estandarId = {
    id: "",
  };

  Categoria = {
    categoria1: "",
    NombreCategoria: "",
  };

  SubCategoria = {
    subcategoria1: "",
    nombreSubcategoria: "",
  };

  usarioConsultarApi = {
    Usuarioid: 0,
  };

  idUsuarioIndicador = 0;
  indicadorEditarCrear = "";
  modificar = false;
  resultados = {};
  resultadosCategoria = {};
  resultadosSubCategoria = {};
  estandarFil = "";
  categoriaFil = "";
  subCategoriaFil = "";
  resulEnviarApi: any = [this.SubCategoria];
  resultadosBusquedaIndicadores: any = {};
  nombre = "";
  permisoDocumento = true;
  idUsuarioConsultarApi = {
    id: 0,
  };

  resultadosTabla: any = [];
  auxresultadosTabla: any = [];
  auxresultadosTabla1: any = [];
  con = 0;

  estandar() {
    if (this.con == 0) {
      this.auxresultadosTabla1 = this.resultadosTabla;
      this.con = 1;
    }
    this.auxresultadosTabla = this.auxresultadosTabla1;
    this.estandarFil = this.Estandar.estandar;
    this.getCategoria(this.estandarFil);
    this.getSubCategoria(-1);

    //methodo para filtara despues de precionr el celect
    if (this.estandarFil == "") {
      this.ConsultarIndicadoresAsignados();
      return true;
    }

    if (this.estandarFil != "") {
      let id = parseInt(this.estandarFil);

      let resultadosTabla = this.auxresultadosTabla1.filter((item) => {
        return item.idEstandar == id;
      });
      this.resultadosTabla = resultadosTabla;
      this.mapearResultadosTabla(this.auxresultadosTabla1);
    }
  }

  subCategoria() {
    if (this.con == 0) {
      this.auxresultadosTabla1 = this.resultadosTabla;
      this.con = 1;
    }
    this.subCategoriaFil = this.SubCategoria.subcategoria1;

    //methodo para filtara despues de precionr el celect
    if (this.subCategoriaFil == "") {
      this.categoria();
      return true;
    }

    if (this.subCategoriaFil != "") {
      let id = parseInt(this.subCategoriaFil);

      let resultadosTabla = this.auxresultadosTabla1.filter((item) => {
        return item.idSubCategoria == id;
      });
      this.resultadosTabla = resultadosTabla;
      this.mapearResultadosTabla(this.auxresultadosTabla1);
    }
  }
  categoria() {
    if (this.con == 0) {
      this.auxresultadosTabla1 = this.resultadosTabla;
      this.con = 1;
    }
    this.categoriaFil = this.Categoria.categoria1;
    this.getSubCategoria(this.categoriaFil);

    //methodo para filtara despues de precionr el celect
    if (this.categoriaFil == "") {
      this.estandar();
      return true;
    }

    if (this.categoriaFil != "") {
      let id = parseInt(this.categoriaFil);

      let resultadosTabla = this.auxresultadosTabla1.filter((item) => {
        return item.idCategoria == id;
      });
      this.resultadosTabla = resultadosTabla;
      this.mapearResultadosTabla(this.auxresultadosTabla1);
    }
  }

  getUsuarioId() {
    this.serviceAdministaraUsuario.UsuarioId.subscribe((Usuarioid) => {
      this.usuarioId = Usuarioid;
    });
  }

  getUsuarioApi(id) {
    this.usarioConsultarApi.Usuarioid = id;
    this.authService
      .getUsuarioModificar(this.usarioConsultarApi)
      .subscribe((res: any) => {
        this.nombre = res.nombre;
      });
  }

  getUsuarioModificar(usarioConsultarApi) {
    this.authService
      .getUsuarioModificar(usarioConsultarApi)
      .subscribe((res: any) => {
        if (res.typeuser == "2") {
          this.router.navigate(["administrar-usuarios"]);
          this.alert(
            "El usuario es administrador, no requiere asignar indicadores"
          );
        }
        if (res.typeuser == "1") {
          this.router.navigate(["administrar-usuarios"]);
          this.alert(
            "El usuario es super administrador, no requiere asignar indicadores"
          );
        }
        return res;
      });
  }

  ngOnInit() {
    this.authService.enviarCorreos().subscribe((res: any) => { });
    this.authService.enviarCorreosIndicadores().subscribe((res: any) => { });

    let usarioLocalStote = JSON.parse(localStorage.getItem("usario"));
    this.idUsuarioIndicador = parseInt(this.route.snapshot.paramMap.get("id"));
    this.indicadorEditarCrear = this.route.snapshot.paramMap.get("usuario");
    this.idUsuarioConsultarApi.id = this.idUsuarioIndicador;
    this.getUsuarioApi(this.idUsuarioIndicador);

    this.usarioConsultarApi.Usuarioid = this.idUsuarioIndicador;
    this.getUsuarioModificar(this.usarioConsultarApi);

    if (this.indicadorEditarCrear != "modificar") {
      if (this.indicadorEditarCrear != "crear") {
        this.router.navigate(["private"]);
        return true;
      }
    }

    if (usarioLocalStote.typeuser == "3") {
      this.router.navigate(["private"]);
      return true;
    }
    if (usarioLocalStote.typeuser == "2") {
      if (
        usarioLocalStote.permisosCrear == false &&
        this.idUsuarioIndicador == 0 &&
        this.indicadorEditarCrear == "crear"
      ) {
        this.router.navigate(["private"]);
        return true;
      }

      if (
        usarioLocalStote.permisosEditar == false &&
        this.idUsuarioIndicador == 0 &&
        this.indicadorEditarCrear == "modificar"
      ) {
        this.router.navigate(["private"]);
        return true;
      }
    }

    this.ConsultarIndicadoresAsignados();
    this.getUsuarioId();
    this.getStandares();
    this.getCategoria(0);
    this.getSubCategoria(0);
  }

  ConsultarIndicadoresAsignados() {
    this.IndicadoresService.ConsultarIndicadoresAsignados(
      this.idUsuarioConsultarApi
    ).subscribe((res: any) => {
      this.resultadosBusquedaIndicadores = res;
      this.GetIndicadoresPermisos(this.resultadosBusquedaIndicadores);
      return res;
    });
  }

  getStandares() {
    this.authService.getStandares(this.Estandar).subscribe((res: any) => {
      this.resultados = res.map((item) => {
        return item;
      });
    });
  }

  getCategoria(estandar) {
    if (estandar == 0) {
      this.authService.getCategoria(this.Categoria).subscribe((res: any) => {
        this.resultadosCategoria = res.map((item) => {
          return item;
        });
      });
    } else {
      this.authService.getCategoria(this.Categoria).subscribe((res: any) => {
        this.resultadosCategoria = res.filter(
          (item) => item.idEstandar == estandar
        );
      });
    }
  }

  getSubCategoria(categoria) {
    if (categoria == 0) {
      this.authService
        .getSubCategoria(this.SubCategoria)
        .subscribe((res: any) => {
          this.resultadosSubCategoria = res.map((item) => {
            return item;
          });
        });
    } else {
      this.authService
        .getSubCategoria(this.SubCategoria)
        .subscribe((res: any) => {
          this.resultadosSubCategoria = res.filter(
            (item) => item.idCategoria == categoria
          );
        });
    }
  }

  mapearResultadosTabla(resultadosBusquedaIndicadores) {
    this.auxresultadosTabla = this.resultadosTabla.map((res) => {
      resultadosBusquedaIndicadores.map((item) => {
        if (res.idIndicador == item.idIndicador) {
          res.ver = item.ver;
          res.diligenciar = item.diligenciar;
          if (res.ver == true || res.diligenciar == true) {
            res.permisoDocumento = false;
          } else {
            res.permisoDocumento = true;
          }
          res.pdf = item.pdf;
          res.excel = item.excel;
          res.word = item.word;
          if (res.ver == false && res.diligenciar == false) {
            res.permisoDocumento = true;
            res.pdf = false;
            res.excel = false;
            res.word = false;
          }
          return true;
        }
      });

      res.idusuario = this.idUsuarioIndicador;
      return res;
    });
  }

  habilitar() {
    this.mapearResultadosTabla(this.resultadosTabla);
  }

  GetIndicadoresPermisos(resultadosBusquedaIndicadores) {
    this.IndicadoresService.GetIndicadoresPermisos("").subscribe((res: any) => {
      this.resultadosTabla = res;
      this.resultadosTabla = this.resultadosTabla.sort();
      this.resultadosTabla = this.resultadosTabla.reverse();
      this.mapearResultadosTabla(resultadosBusquedaIndicadores);
      return res;
    });
  }

  guardarIndicadores() {
    this.resulEnviarApi = this.resultadosTabla;
    this.CerarPermisosIndicador();
  }

  CerarPermisosIndicador() {
    this.IndicadoresService.CerarPermisosIndicador(
      this.resulEnviarApi
    ).subscribe((res: any) => {
      if (res.resul == "Se guardo con exito") {
        this.alert("Datos guardados");
      }
      return res;
    });
  }

  alert(mensaje) {
    Swal.fire(mensaje);
  }
}
