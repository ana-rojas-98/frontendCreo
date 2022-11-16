import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "src/environments/environment";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VisorEventosService {

  private URL_SER = environment.apiUrl;

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService,
    public router: Router) { }

  fnSetDefineTokenAuthorization() {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });
    const requestOptions = { headers: headers };
    return requestOptions;
  }

  GetEventos(): Observable<any>{
    const headers = this.fnSetDefineTokenAuthorization();
    let result = this.http.get(`${this.URL_SER}/api/VisorEventos/`,headers)
    return result;
  }
}
