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
    const headers = this.fnSetDefineTokenAuthorization();
    return this.http.get(
      `${this.URL_SER}/api/Usuarios/GeTipotUsuario`,
      headers
    );
  }

  crear_estandar(estandar: any) {
    const headers = this.fnSetDefineTokenAuthorization();
    let result = this.http.post(
      `${this.URL_SER}/api/Estandares/PostEstandar`,
      estandar,
      headers
    );
    return result;
  }

  crear_categoria(categoria: any) {
    const headers = this.fnSetDefineTokenAuthorization();
    let result = this.http.post(
      `${this.URL_SER}/api/Categoria/PostCategoria`,
      categoria,
      headers
    );
    return result;
  }

  crear_subcategoria(subcategoria: any) {
    const headers = this.fnSetDefineTokenAuthorization();
    let resul = this.http.post(
      `${this.URL_SER}/api/Subcategoria/PostSubcategoria`,
      subcategoria,
      headers
    );
    return resul;
  }

  getStandares(estandar: any) {
    const headers = this.fnSetDefineTokenAuthorization();
    let result = this.http.get(`${this.URL_SER}/api/Estandares`, headers);
    return result;
  }

  getCategoria(categorias: any) {
    const headers = this.fnSetDefineTokenAuthorization();
    let result = this.http.get(`${this.URL_SER}/api/Categoria/`, headers);
    return result;
  }

  getSubCategoria(subCategorias: any) {
    const headers = this.fnSetDefineTokenAuthorization();
    let result = this.http.get(`${this.URL_SER}/api/SubCategoria`, headers);
    return result;
  }

  deleteEstandar(estandar: any) {
    const headers = this.fnSetDefineTokenAuthorization();
    let result = this.http.post(
      `${this.URL_SER}/api/Estandares/DeleteEstandar`,
      estandar,
      headers
    );
    return result;
  }

  eliminarSubcategoria(subcategoria: any) {
    const headers = this.fnSetDefineTokenAuthorization();
    let result = this.http.post(
      `${this.URL_SER}/api/SubCategoria/DeleteSubcategoria`,
      subcategoria,
      headers
    );
    return result;
  }

  eliminarCategoria(categoria: any) {
    const headers = this.fnSetDefineTokenAuthorization();
    let result = this.http.post(
      `${this.URL_SER}/api/Categoria/DeleteCategoria`,
      categoria,
      headers
    );
    return result;
  }

  getUsuarios(usuario: any) {
    const headers = this.fnSetDefineTokenAuthorization();
    let result = this.http.get(`${this.URL_SER}/api/Usuarios`, headers);
    return result;
  }
  CrearNuevoUsuario(usuario: any) {
    const headers = this.fnSetDefineTokenAuthorization();
    let resul = this.http.post(
      `${this.URL_SER}/api/Usuarios/PostNuevoUsuario`,
      usuario,
      headers
    );
    return resul;
  }

  setIndicadorNuevo(nuevoIndicador: any) {
    const headers = this.fnSetDefineTokenAuthorization();
    let result = this.http.post(
      `${this.URL_SER}/api/FormatoIndicadors/indicadorIndividual`,
      nuevoIndicador
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
    const headers = this.fnSetDefineTokenAuthorization();
    let resul = this.http.post(
      `${this.URL_SER}/api/Usuarios/GetUsuarioModificar`,
      id,
      headers
    );
    return resul;
  }

  descarga() {
    const headers = this.fnSetDefineTokenAuthorization();
    let resu = this.http.get(
      `${this.URL_SER}/api/FormatoIndicadors/descargarArchivo`,
      { observe: "response", responseType: "blob"}
    );
    return resu;
  }

  ModificarUsuario(id) {
    const headers = this.fnSetDefineTokenAuthorization();
    let resul = this.http.post(
      `${this.URL_SER}/api/Usuarios/ModificarUsuario`,
      id,
      headers
    );
    return resul;
  }

  eliminarUsuario(id) {
    const headers = this.fnSetDefineTokenAuthorization();
    let resul = this.http.post(
      `${this.URL_SER}/api/Usuarios/EliminarUsuario`,
      id,
      headers
    );
    return resul;
  }

  setConfiguracion(confi: any) {
    const headers = this.fnSetDefineTokenAuthorization();
    let res = this.http.post(
      `${this.URL_SER}/api/FormatoIndicadors/guardarConfiguracion`,
      confi
    );
    return res;
  }

  traerDatosConf(config: any) {
    const headers = this.fnSetDefineTokenAuthorization();
    let resultado = this.http.get(`${this.URL_SER}/api/configuracions`, headers);
    return resultado;
  }

  getImagen() {
    let resultado = this.http.get(
      `${this.URL_SER}/api/configuracions/mostarImg`,
      { observe: "response", responseType: "blob" }
    );
    return resultado;
  }

  enviarCorreo(correo: any) {
    const headers = this.fnSetDefineTokenAuthorization();
    let resul = this.http.post(
      `${this.URL_SER}/api/Notificaciones/enviarNotificacion`,
      correo, headers
    );
    return resul;
  }

  getNotificacion(notificacion: any) {
    const headers = this.fnSetDefineTokenAuthorization();
    let resultado = this.http.get(
      `${this.URL_SER}/api/Notificaciones`,
      headers
    );
    return resultado;
  }

  EliminarNotificacion(notificacion: any) {
    const headers = this.fnSetDefineTokenAuthorization();
    let resultado = this.http.post(
      `${this.URL_SER}/api/Notificaciones/EliminarNotificacion`,notificacion,
      headers
    );
    return resultado;
  }

  tablaAdminIndicadores() {
    const headers = this.fnSetDefineTokenAuthorization();
    let tabla = this.http.get(`${this.URL_SER}/api/archivos`, headers);
    return tabla;
  }

  EditarIndicador() {
    const headers = this.fnSetDefineTokenAuthorization();
    let formato = this.http.get(`${this.URL_SER}/api/FormatoIndicadors`, headers);

    return formato;
  }

  enviarProgramados(programados) {
    const headers = this.fnSetDefineTokenAuthorization();
    let resultado = this.http.post(
      `${this.URL_SER}/api/CorreosProgramados`,
      programados, headers
    );
    return resultado;
  }

  enviarCorreos() {
    const headers = this.fnSetDefineTokenAuthorization();
    let resultado = this.http.get(
      `${this.URL_SER}/api/CorreosProgramados/PutCorreoProgramado`, headers
    );
    return resultado;
  }

  enviarCorreosIndicadores() {
    const headers = this.fnSetDefineTokenAuthorization();
    let resultado = this.http.get(
      `${this.URL_SER}/api/CorreosProgramados/CorreoIndicadoresFaltantes`, headers
    );
    return resultado;
  }

  enviarIndicadorEditado(array: any) {
    const headers = this.fnSetDefineTokenAuthorization();
    let formato = this.http.post(
      `${this.URL_SER}/api/Notificaciones/actualizarTabla`,
      array, headers
    );
    return formato;
  }

  CerrarSesion(array: any) {
    const headers = this.fnSetDefineTokenAuthorization();
    let formato = this.http.post(
      `${this.URL_SER}/api/Usuarios/CerrarSesion`,
      array, headers
    );
    return formato;
  }

  Eliminar(id) {
    const headers = this.fnSetDefineTokenAuthorization();
    let formato = this.http.post(
      `${this.URL_SER}/api/Notificaciones/EliminarIndicador`,
      id, headers
    );
    return formato;
  }
  DuplicarIndicador(id) {
    const headers = this.fnSetDefineTokenAuthorization();
    let formato = this.http.post(
      `${this.URL_SER}/api/Notificaciones/DuplicarIndicador`,
      id, headers
    );
    return formato;
  }

  GuardarMiPerfil(perfil) {
    const headers = this.fnSetDefineTokenAuthorization();
    let usarioLocalStote = JSON.parse(localStorage.getItem("usario"));
    let formato = this.http.post(`${this.URL_SER}/api/Notificaciones/GuardarMiPerfil`,perfil, headers);
    return formato;
  }

  CambioContrasena(contrasenas){
    const headers = this.fnSetDefineTokenAuthorization();
    let formato = this.http.post(`${this.URL_SER}/api/Notificaciones/CambioContrasena`,contrasenas, headers);
    return formato;
  }

}
