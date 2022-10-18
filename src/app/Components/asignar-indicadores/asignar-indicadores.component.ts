import { Component, Input, OnInit } from "@angular/core";
import { AdministrarUsuariosService } from "src/app/services/administrar-usuarios.service";
import { IndicadoresService } from "src/app/services/indicadores.service";
import { AuthService } from "src/app/services/auth.service";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

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
  ) {}

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

  idUsuarioIndicador = 0;
  indicadorEditarCrear = "";
  modificar = false;
  resultados = {};
  resultadosCategoria = {};
  resultadosSubCategoria = {};
  estandarFil = "";
  categoriaFil = "";
  resulEnviarApi: any = [];

  resultadosTabla: any = [];

  estandar() {
    this.estandarFil = this.Estandar.estandar;
    this.getCategoria(this.estandarFil);
    this.getSubCategoria(-1);
  }

  categoria() {
    this.categoriaFil = this.Categoria.categoria1;
    this.getSubCategoria(this.categoriaFil);
  }

  getUsuarioId() {
    this.serviceAdministaraUsuario.UsuarioId.subscribe((Usuarioid) => {
      this.usuarioId = Usuarioid;
      console.log("hola: ", this.usuarioId);
    });
  }

  ngOnInit() {
    let usarioLocalStote = JSON.parse(localStorage.getItem("usario"));
    this.idUsuarioIndicador = parseInt(this.route.snapshot.paramMap.get("id"));
    this.indicadorEditarCrear = this.route.snapshot.paramMap.get("usuario");

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
    this.GetIndicadoresPermisos();
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

  mapearResultadosTabla() {
    this.resultadosTabla.map((res) => {
      res.ver = false;
      res.diligenciar = false;
      res.pdf = false;
      res.excel = false;
      res.word = false;
      res.idusuario = this.idUsuarioIndicador;
    });
  }

  GetIndicadoresPermisos() {
    this.IndicadoresService.GetIndicadoresPermisos("").subscribe((res: any) => {
      this.resultadosTabla = res;
      this.mapearResultadosTabla();
      return res;
    });
  }

  guardarIndicadores() {
    this.resulEnviarApi = this.resultadosTabla.filter(
      (item) =>
        item.ver == true ||
        item.diligenciar == true ||
        item.pdf == true ||
        item.excel == true ||
        item.word == true
    );
    this.CerarPermisosIndicador();
  }

  CerarPermisosIndicador() {
    this.IndicadoresService.CerarPermisosIndicador(
      this.resulEnviarApi
    ).subscribe((res: any) => {
      console.log("api: ", res);
      return res;
    });
  }

  ConsultarIndicadoresAsignados() {
    this.IndicadoresService.ConsultarIndicadoresAsignados("").subscribe(
      (res: any) => {
        console.log("api: ", res);
        return res;
      }
    );
  }
}
