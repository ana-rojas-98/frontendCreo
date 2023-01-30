import { Injectable, Output, EventEmitter} from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "src/environments/environment";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})


export class ReportesService {
  @Output() newItemEvent = new EventEmitter();
  @Output() reportesUsar: EventEmitter<any> = new EventEmitter<any>();

  VerDiligenciarIndicador() {
    throw new Error("Method not implemented.");
  }
  private URL_SER = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    public router: Router,
    private authService: AuthService,
  ) {}

  GetUsuarios() {
    const headers = this.authService.fnSetDefineTokenAuthorization();
    let resul = this.http.get(`${this.URL_SER}/api/Usuarios`, headers);
    return resul;
  }

  ConsultarIndicadoresAsignados() {
    const headers = this.authService.fnSetDefineTokenAuthorization();
    let resul = this.http.get(
      `${this.URL_SER}/api/indicadores/`, headers
    );
    return resul;
  }
  
  IndicadoresAsignados(id) {
    const headers = this.authService.fnSetDefineTokenAuthorization();
    let resul = this.http.post(
      `${this.URL_SER}/api/Notificaciones/IndicadoresAsignados`, id, headers
    );
    return resul;
  }

  UpdateAchivos(idIndicador) {
    const headers = this.authService.fnSetDefineTokenAuthorization();
    let resul = this.http.post(
      `${this.URL_SER}/api/indicadores/UpdateAchivos/`,idIndicador, headers
    );
    return resul;
  }

  GuardarReporte(data)
  {
    const headers = this.authService.fnSetDefineTokenAuthorization();
    let resul = this.http.post(
      `${this.URL_SER}/api/Reportes/GuardarNuevoReporte/`,data, headers
    );
    return resul;
  }

  FinalizarNuevoReporte(data)
  {
    const headers = this.authService.fnSetDefineTokenAuthorization();
    let resul = this.http.post(
      `${this.URL_SER}/api/Reportes/FinalizarNuevoReporte/`,data, headers
    );
    return resul;
  }

  EliminarReporte(fila)
  {
    const headers = this.authService.fnSetDefineTokenAuthorization();
    let resul = this.http.post(
      `${this.URL_SER}/api/Reportes/Eliminar/`,fila, headers
    );
    return resul;
  }

  ConsultaReportes() {
    const headers = this.authService.fnSetDefineTokenAuthorization();
    let resul = this.http.get(
      `${this.URL_SER}/api/Reportes/`, headers
    );
    return resul;
  }


  ConsultaReportesDetail(idTablero) {
    const headers = this.authService.fnSetDefineTokenAuthorization();
    let resul = this.http.post(
      `${this.URL_SER}/api/ReportesDetail/GetTablerosDetail/`,idTablero, headers
    );
    return resul;
  }

  GuardarReporteDetail(data)
  {
    const headers = this.authService.fnSetDefineTokenAuthorization();
    let resul = this.http.post(
      `${this.URL_SER}/api/ReportesDetail/GuardaReporte/`,data, headers
    );
    return resul;
  }

  FinalizarReporte(data)
  {
    const headers = this.authService.fnSetDefineTokenAuthorization();
    let resul = this.http.post(
      `${this.URL_SER}/api/ReportesDetail/FinalizarReporte/`,data, headers
    );
    return resul;
  }

  DuplicarTablero(idTablero) {
    const headers = this.authService.fnSetDefineTokenAuthorization();
    let resul = this.http.post(
      `${this.URL_SER}/api/Reportes/DuplicarTablero/`,idTablero, headers
    );
    return resul;
  }

}
