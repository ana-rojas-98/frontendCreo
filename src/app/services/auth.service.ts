import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL_SER = 'https://localhost:5001';
  constructor(
    private http:HttpClient,
    private jwtHelper: JwtHelperService
    ) { }
  signin(user:any){
    return this.http.post(`${this.URL_SER}/api/Usuarios/Authenticate`,user);
  }
  isAuth():boolean{
    const token = localStorage.getItem('token');    
    if(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')){
      return false;
    }
    return true;
  }
  singup(user_reg:any){
    return this.http.post(`${this.URL_SER}/api/Usuarios/PostUsuario`,user_reg);
  }
  crear_estandar(estand:any){
    return this.http.post(`${this.URL_SER}/api/Estandares/PostEstandar`,estand);
  }
  crear_categoria(categoria:any){
    return this.http.post(`${this.URL_SER}/api/Categoria/PostCategoria`,categoria);
  }
  crear_subcategoria(subcategoria:any){
    return this.http.post(`${this.URL_SER}/api/Subcategoria/PostSubcategoria`,subcategoria);
  }
  
  validar_correo(email:any){
    return this.http.post(`${this.URL_SER}/api/Usuarios/ValidationEmail`,email);
  }
}
