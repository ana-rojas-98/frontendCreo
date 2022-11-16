import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "src/environments/environment";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class LicenciaService {

  private URL_SER = environment.apiUrl;

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private authService: AuthService,
    public router: Router) { }

  UpdateLicencia(licencia) {
    const headers = this.authService.fnSetDefineTokenAuthorization();
    let result = this.http.post(`${this.URL_SER}/api/Licencia/UpdateLicencia`, 
    licencia, headers);
    return result;
  }

  GetLicencia(licencia) {
    const headers = this.authService.fnSetDefineTokenAuthorization();
    let result = this.http.get(`${this.URL_SER}/api/Licencia/`, headers);
    return result;
  }

  
  
}
