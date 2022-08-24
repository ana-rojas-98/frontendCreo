import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL_SER = 'http://localhost:3000';
  constructor(
    private http:HttpClient,
    private jwtHelper: JwtHelperService
    ) { }
  signin(user:any){
    return this.http.post(`${this.URL_SER}/user/signin`,user);
  }
  isAuth():boolean{
    const token = localStorage.getItem('token');
    if(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')){
      return false;
    }
    return true;
  }
}
