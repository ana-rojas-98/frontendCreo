import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "src/environments/environment";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "./auth.service";

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
    public router: Router,
    private authService: AuthService,
  ) {}

  GetIndicadoresPermisos(id) {
    const headers = this.authService.fnSetDefineTokenAuthorization();
    let resul = this.http.get(`${this.URL_SER}/api/indicadores`, headers);
    return resul;
  }

  CerarPermisosIndicador(permisos) {
    const headers = this.authService.fnSetDefineTokenAuthorization();
    let resul = this.http.post(
      `${this.URL_SER}/api/indicadores/RegistroIndicadores`,
      permisos, headers
    );
    return resul;
  }


  ConsultarIndicadoresAsignados(permisos) {
    const headers = this.authService.fnSetDefineTokenAuthorization();
    let resul = this.http.post(
      `${this.URL_SER}/api/indicadores/ConsultarUsuarios`,permisos, headers
    );
    return resul;
  }

  VerDiligenciarIndicador(idArchivo) {
    const headers = this.authService.fnSetDefineTokenAuthorization();
    let resul = this.http.post(
      `${this.URL_SER}/api/indicadores/VerDiligenciarIndicador`,idArchivo, headers
    );
    return resul;
  }

  GuardarRespuestasIndicador(Respuestas) {
    const headers = this.authService.fnSetDefineTokenAuthorization();
    let resul = this.http.post(
      `${this.URL_SER}/api/indicadores/GuardarRespuestasIndicador`,Respuestas
    );
    return resul;
  }

  FinalizarIndicador(Respuestas) {
    const headers = this.authService.fnSetDefineTokenAuthorization();
    let resul = this.http.post(
      `${this.URL_SER}/api/indicadores/FinalizarInidicador`,Respuestas, headers
    );
    return resul;
  }

  GuardarAdjunto(Respuestas: any) {
    const headers = this.authService.fnSetDefineTokenAuthorization();
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
    const headers = this.authService.fnSetDefineTokenAuthorization();
    let result = this.http.post(
      `${this.URL_SER}/api/Notificaciones/ObtenerAdjuntos`, id, headers);
    return result;
  }

  DescargarTodosAdjuntos() {
    let resu = this.http.get(
      `${this.URL_SER}/api/indicadores/DescargarTodosAdjuntos`,
      { observe: "response", responseType: "blob" }
    );
    return resu;
  }

  EliminarArchivo(id: any) {
    const headers = this.authService.fnSetDefineTokenAuthorization();
    let resul = this.http.post(
      `${this.URL_SER}/api/Notificaciones/EliminarArchivo`,id, headers
    );
    return resul;
  }

  DescargarTodosAdjuntosIndividual(Archivo) {
    let resu = this.http.get(
      `${this.URL_SER}/api/indicadores/DescargarTodosAdjuntosIndividual`,
      { observe: "response", responseType: "blob" , params: {'NombreArchivo': Archivo} }
    );
    return resu;
  }

}
