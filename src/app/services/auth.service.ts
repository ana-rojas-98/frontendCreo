import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "src/environments/environment";
import { Router, ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  data_headers_request: any = "";

  //https://localhost:5001
  ///http://www.creo.somee.com
  private URL_SER = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    public router: Router
  ) {}
  signin(user: any) {
    return this.http.post(`${this.URL_SER}/api/Usuarios/Authenticate`, user);
  }
  isAuth(): boolean {
    const token = localStorage.getItem("token");
    if (
      this.jwtHelper.isTokenExpired(token) ||
      !localStorage.getItem("token")
    ) {
      return false;
    }
    return true;
  }

  fnSetDefineTokenAuthorization() {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    });
    const requestOptions = { headers: headers };
    return requestOptions;
  }

  singup(user_reg: any) {
    return this.http.post(`${this.URL_SER}/api/Usuarios/PostUsuario`, user_reg);
  }

  validar_correo(email: any) {
    let result = this.http.post(
      `${this.URL_SER}/api/Usuarios/ValidationEmail`,
      email
    );
    console.log(result);
    return this.http.post(
      `${this.URL_SER}/api/Usuarios/ValidationEmail`,
      email
    );
  }

  cambiar_contrasena(token: any) {
    this.http.post(
      `${this.URL_SER}/api/RecuperarContrasena/ValidatioToken`,
      token
    );
    return this.http.post(
      `${this.URL_SER}/api/RecuperarContrasena/ValidatioToken`,
      token
    );
  }

  getTipoUsuario(tipoUsuario: any) {
    return this.http.get(
      `${this.URL_SER}/api/Usuarios/GeTipotUsuario`,
      tipoUsuario
    );
  }

  crear_estandar(estandar: any) {
    let result = this.http.post(
      `${this.URL_SER}/api/Estandares/PostEstandar`,
      estandar
    );
    console.log(result);
    return result;
  }

  crear_categoria(categoria: any) {
    let result = this.http.post(
      `${this.URL_SER}/api/Categoria/PostCategoria`,
      categoria
    );
    return result;
  }

  crear_subcategoria(subcategoria: any) {
    let resul = this.http.post(
      `${this.URL_SER}/api/Subcategoria/PostSubcategoria`,
      subcategoria
    );
    return resul;
  }

  getStandares(estandar: any) {
    let result = this.http.get(`${this.URL_SER}/api/Estandares`, estandar);
    return result;
  }

  getCategoria(categorias: any) {
    let result = this.http.get(`${this.URL_SER}/api/Categoria/`, categorias);
    return result;
  }

  getSubCategoria(subCategorias: any) {
    let result = this.http.get(
      `${this.URL_SER}/api/SubCategoria`,
      subCategorias
    );
    return result;
  }

  deleteEstandar(estandar: any) {
    let result = this.http.post(
      `${this.URL_SER}/api/Estandares/DeleteEstandar`,
      estandar
    );
    return result;
  }

  eliminarSubcategoria(subcategoria: any) {
    let result = this.http.post(
      `${this.URL_SER}/api/SubCategoria/DeleteSubcategoria`,
      subcategoria
    );
    return result;
  }

  eliminarCategoria(categoria: any) {
    let result = this.http.post(
      `${this.URL_SER}/api/Categoria/DeleteCategoria`,
      categoria
    );
    return result;
  }

  getUsuarios(usuario: any) {
    let result = this.http.get(`${this.URL_SER}/api/Usuarios`, usuario);
    return result;
  }
  CrearNuevoUsuario(usuario: any) {
    let resul = this.http.post(
      `${this.URL_SER}/api/Usuarios/PostNuevoUsuario`,
      usuario
    );
    return resul;
  }

  setIndicadorNuevo(nuevoIndicador: any) {
    const headers = this.fnSetDefineTokenAuthorization();

    let result = this.http.post(
      `${this.URL_SER}/api/archivos/postArchivos`,
      nuevoIndicador,
      headers
    );
    return result;
  }

  fnDestroySessionData(objectObserve) {
    localStorage.clear();
    sessionStorage.clear();
    objectObserve(true);
    // this.auth.logout({ returnTo: this.doc.location.origin });
    this.router.navigate(["login"]);
  }

  getUsuarioModificar(id) {
    let resul = this.http.post(
      `${this.URL_SER}/api/Usuarios/GetUsuarioModificar`,
      id
    );
    console.log(resul);
    return resul;
  }

descarga(){
  let resu = this.http.get(`${this.URL_SER}/api/FormatoArchivoes/descargarArchivo`,
    {observe:'response', responseType:'blob'});
    return resu;
}
  ModificarUsuario(id) {
    let resul = this.http.post(
      `${this.URL_SER}/api/Usuarios/ModificarUsuario`,
      id
    );
    return resul;
  }

  eliminarUsuario(id) {
    let usuarioid = {
      usuarioid: id,
    };
    let resul = this.http.post(
      `${this.URL_SER}/api/Usuarios/EliminarUsuario`,
      usuarioid
    );
    return resul;
  }
}
