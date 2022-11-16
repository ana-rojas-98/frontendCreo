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

  UpdateAchivos(idIndicador) {
    const headers = this.authService.fnSetDefineTokenAuthorization();
    let resul = this.http.post(
      `${this.URL_SER}/api/indicadores/UpdateAchivos/`,idIndicador, headers
    );
    return resul;
  }
}
