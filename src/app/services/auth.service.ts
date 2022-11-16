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
    const headers = this.fnSetDefineTokenAuthorization();
    let result = this.http.get(`${this.URL_SER}/api/Usuarios`,
    headers);
    return result;
  }
  CrearNuevoUsuario(usuario: any) {
    const headers = this.fnSetDefineTokenAuthorization();
    let resul = this.http.post(
      `${this.URL_SER}/api/Usuarios/PostNuevoUsuario`,
      usuario,
      headers,
    );
    return resul;
  }

  setIndicadorNuevo(nuevoIndicador: any) {
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
    let resul = this.http.post(
      `${this.URL_SER}/api/Usuarios/GetUsuarioModificar`,
      id
    );
    return resul;
  }

  descarga() {
    let resu = this.http.get(
      `${this.URL_SER}/api/FormatoIndicadors/descargarArchivo`,
      { observe: "response", responseType: "blob" }
    );
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

  setConfiguracion(confi: any) {
    let res = this.http.post(
      `${this.URL_SER}/api/Configuracions/guardarConfiguracion`,
      confi
    );
    return res;
  }

  traerDatosConf(config: any) {
    let resultado = this.http.get(`${this.URL_SER}/api/configuracions`, config);
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
    let resul = this.http.post(
      `${this.URL_SER}/api/Notificaciones/enviarNotificacion`,
      correo
    );
    return resul;
  }

  getNotificacion(notificacion: any) {
    let resultado = this.http.get(
      `${this.URL_SER}/api/Notificaciones`,
      notificacion
    );
    return resultado;
  }

  tablaAdminIndicadores() {
    let tabla = this.http.get(`${this.URL_SER}/api/archivos`);
    return tabla;
  }

  EditarIndicador() {
    let formato = this.http.get(`${this.URL_SER}/api/FormatoIndicadors`);
    return formato;
  }

  enviarProgramados(programados) {
    let resultado = this.http.post(
      `${this.URL_SER}/api/CorreosProgramados`,
      programados
    );
    return resultado;
  }

  enviarCorreos() {
    let resultado = this.http.get(
      `${this.URL_SER}/api/CorreosProgramados/PutCorreoProgramado`
    );
    return resultado;
  }

  enviarCorreosIndicadores() {
    let resultado = this.http.get(
      `${this.URL_SER}/api/CorreosProgramados/CorreoIndicadoresFaltantes`
    );
    return resultado;
  }

  enviarIndicadorEsitado(array: any) {
    let formato = this.http.post(
      `${this.URL_SER}/api/Notificaciones/actualizarTabla`,
      array
    );
    return formato;
  }

  CerrarSesion(array: any) {
    let formato = this.http.post(
      `${this.URL_SER}/api/Usuarios/CerrarSesion`,
      array
    );
    return formato;
  }

  Eliminar(id) {
    let formato = this.http.post(
      `${this.URL_SER}/api/Notificaciones/EliminarIndicador`,
      id
    );
    return formato;
  }
  DuplicarIndicador(id) {
    let formato = this.http.post(
      `${this.URL_SER}/api/Notificaciones/DuplicarIndicador`,
      id
    );
    return formato;
  }
}
