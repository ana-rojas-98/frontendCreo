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
    let resul = this.http.get(
      `${this.URL_SER}/api/indicadores/ConsultarIndicadoresAsignados`
    );
    return resul;
  }
}
