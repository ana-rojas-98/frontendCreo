import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "src/environments/environment";
import { Router, ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class VisorEventosService {

  private URL_SER = environment.apiUrl;

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService,
    public router: Router) { }

  GetEventos() {
    let result = this.http.get(`${this.URL_SER}/api/VisorEventos/`);
    console.log(result);
    return result;
  }
}
