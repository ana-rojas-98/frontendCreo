import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "src/environments/environment";
import { Router, ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class IndicadoresService {
  data_headers_request: any = "";

  //https://localhost:5001
  ///http://www.creo.somee.com
  private URL_SER = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    public router: Router
  ) {}

  GetIndicadoresPermisos(id) {
    let resul = this.http.get(`${this.URL_SER}/api/indicadores`);
    return resul;
  }

  CerarPermisosIndicador(permisos) {
    let resul = this.http.post(
      `${this.URL_SER}/api/indicadores/RegistroIndicadores`,
      permisos
    );
    return resul;
  }


  ConsultarIndicadoresAsignados(permisos) {
    let resul = this.http.post(
      `${this.URL_SER}/api/indicadores/ConsultarUsuarios`,permisos
    );
    return resul;
  }

  VerDiligenciarIndicador(idArchivo) {
    let resul = this.http.post(
      `${this.URL_SER}/api/indicadores/VerDiligenciarIndicador`,idArchivo
    );
    return resul;
  }

  GuardarRespuestasIndicador(Respuestas) {
    let resul = this.http.post(
      `${this.URL_SER}/api/indicadores/GuardarRespuestasIndicador`,Respuestas
    );
    return resul;
  }

  FinalizarIndicador(Respuestas) {
    let resul = this.http.post(
      `${this.URL_SER}/api/indicadores/FinalizarInidicador`,Respuestas
    );
    return resul;
  }

  GuardarAdjunto(Respuestas: any) {
    let resul = this.http.post(
      `${this.URL_SER}/api/indicadores/GuardarAdjunto`,Respuestas
    );
    return resul;
  }

  descarga(Archivo) {
    let resu = this.http.get(
      `${this.URL_SER}/api/indicadores/descargarArchivo`,
      { observe: "response", responseType: "blob" , params: {'NombreArchivo': Archivo} }
    );
    return resu;
  }

  ObtenerAdjuntos(id) {
    let result = this.http.post(
      `${this.URL_SER}/api/indicadores/ObtenerAdjuntos`, id);
    return result;
  }
}
