import { Component, Input, OnInit } from "@angular/core";
import { AdministrarUsuariosService } from "src/app/services/administrar-usuarios.service";
import { IndicadoresService } from "src/app/services/indicadores.service";
import { AuthService } from "src/app/services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-asignar-indicador",
  templateUrl: "./asignar-indicador.component.html",
  styleUrls: ["./asignar-indicador.component.scss"],
})
export class AsignarIndicadorComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private IndicadoresService: IndicadoresService,
    private serviceAdministaraUsuario: AdministrarUsuariosService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  resultados = {};
  resultadosCategoria = {};
  resultadosSubCategoria = {};
  estandarFil = "";
  categoriaFil = "";
  resultadosTabla: [];
  idUsuarioIndicador = 0

  asingnarIndicadores = {
    idUsuario: this.idUsuarioIndicador,
    ver: false,
    diligenciar: false,
    pdf: false,
    excel: false,
    word: false,
  };

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

  GetIndicadoresPermisos() {
    this.IndicadoresService.GetIndicadoresPermisos("").subscribe((res: any) => {
      this.resultadosTabla = res;
      console.log("indicadores: ", res);
      return res;
    });
  }
}
