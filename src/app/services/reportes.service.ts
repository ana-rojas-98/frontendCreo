import { Injectable, Output, EventEmitter} from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "src/environments/environment";
import { Router, ActivatedRoute } from "@angular/router";

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
    public router: Router
  ) {}

  GetUsuarios() {
    let resul = this.http.get(`${this.URL_SER}/api/Usuarios`);
    return resul;
  }

  ConsultarIndicadoresAsignados() {
    let resul = this.http.get(
      `${this.URL_SER}/api/indicadores/`
    );
    return resul;
  }

  UpdateAchivos(idIndicador) {
    let resul = this.http.post(
      `${this.URL_SER}/api/indicadores/UpdateAchivos/`,idIndicador
    );
    return resul;
  }
}
