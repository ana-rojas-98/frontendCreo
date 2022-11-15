import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "src/environments/environment";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class LicenciaService {

  private URL_SER = environment.apiUrl;

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService,
    public router: Router) { }

  UpdateLicencia(licencia) {
    let result = this.http.post(`${this.URL_SER}/api/Licencia/UpdateLicencia`, 
    licencia );
    return result;
  }

  GetLicencia(licencia) {
    let result = this.http.get(`${this.URL_SER}/api/Licencia/`);
    return result;
  }

  
  
}
