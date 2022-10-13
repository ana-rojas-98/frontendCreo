import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { NavMenuComponent } from './Components/nav-menu/nav-menu.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { PrivateComponent } from './Components/private/private.component';


// Providers
import { JwtHelperService, JWT_OPTIONS }  from '@auth0/angular-jwt'
import { AuthGuard } from './guards/auth.guard';
import { RegistroSuperComponent } from './Components/registro-super/registro-super.component';
import { EstandaresComponent } from './Components/estandares/estandares.component';
import { CategoriasComponent } from './Components/categorias/categorias.component';
import { SubcategoComponent } from './Components/subcatego/subcatego.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { PermisosRegistrosComponent } from './Components/permisos-registros/permisos-registros.component';
import { OlvideClaveComponent } from './Components/olvide-clave/olvide-clave.component';
import { AdministrarIndicadoresComponent } from './Components/administrar-indicadores/administrar-indicadores.component';
import { CambioContrasenaComponent } from './Components/cambio-contrasena/cambio-contrasena.component';
import { FooterComponent } from './Components/footer/footer.component';
import { EliminarEstandarComponent } from './Components/eliminar-estandar/eliminar-estandar.component';
import { EliminarCategoriaComponent } from './Components/eliminar-categoria/eliminar-categoria.component';
import { EliminarSubcategoriaComponent } from './Components/eliminar-subcategoria/eliminar-subcategoria.component';
import { NuevoIndicadorComponent } from './Components/nuevo-indicador/nuevo-indicador.component';
import { IndicadoresMasivosComponent } from './Components/indicadores-masivos/indicadores-masivos.component';
import { EditarIndicadorComponent } from './Components/editar-indicador/editar-indicador.component';
import { AdministrarUsuariosComponent } from './Components/administrar-usuarios/administrar-usuarios.component';
import { CrearUsuarioComponent } from './Components/crear-usuario/crear-usuario.component';
import { IndicadoresComponent } from './Components/indicadores/indicadores.component';
import { DiligenciarIndicadorComponent } from './Components/diligenciar-indicador/diligenciar-indicador.component';
import { AsignarIndicadoresComponent } from './Components/asignar-indicadores/asignar-indicadores.component';
import { FooterPrincipalComponent } from './Components/footer-principal/footer-principal.component';
import { ConfiguracionComponent } from './Components/configuracion/configuracion.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { TokenInterceptorService } from './services/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,        
    LoginComponent,
    RegisterComponent,
    RegistroSuperComponent,
    PrivateComponent,
    EstandaresComponent,
    CategoriasComponent,
    SubcategoComponent,
    SidebarComponent,
    PermisosRegistrosComponent,
    OlvideClaveComponent,
    AdministrarIndicadoresComponent,
    CambioContrasenaComponent,
    FooterComponent,
    EliminarEstandarComponent,
    EliminarCategoriaComponent,
    EliminarSubcategoriaComponent,
    NuevoIndicadorComponent,
    IndicadoresMasivosComponent,
    EditarIndicadorComponent,
    AdministrarUsuariosComponent,
    CrearUsuarioComponent,
    IndicadoresComponent,
    DiligenciarIndicadorComponent,
    AsignarIndicadoresComponent,
    FooterPrincipalComponent,
    ConfiguracionComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal'}),
    HttpClientModule,
    NgbModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },            
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent, canActivate:[AuthGuard] },
      { path: 'private', component: PrivateComponent,canActivate:[AuthGuard]},
      { path: 'registro-super', component: RegistroSuperComponent, canActivate:[AuthGuard]},
      { path: 'estandares', component: EstandaresComponent, canActivate:[AuthGuard]},
      { path: 'categorias', component: CategoriasComponent, canActivate:[AuthGuard]},
      { path: 'subcatego', component: SubcategoComponent, canActivate:[AuthGuard]},
      { path: 'olvide-clave', component: OlvideClaveComponent},
      { path: 'administrar-indicadores', component: AdministrarIndicadoresComponent, canActivate:[AuthGuard]},
      { path: 'cambio-contrasena', component: CambioContrasenaComponent},
      { path: 'eliminar-estandar', component: EliminarEstandarComponent, canActivate:[AuthGuard]},
      { path: 'eliminar-categoria', component: EliminarCategoriaComponent, canActivate:[AuthGuard]},
      { path: 'eliminar-subcategoria', component: EliminarSubcategoriaComponent, canActivate:[AuthGuard]},
      { path: 'nuevo-indicador', component: NuevoIndicadorComponent, canActivate:[AuthGuard]},
      { path: 'indicadores-masivos', component: IndicadoresMasivosComponent, canActivate:[AuthGuard]},
      { path: 'editar-indicador', component: EditarIndicadorComponent, canActivate:[AuthGuard]},
      { path: 'administrar-usuarios', component: AdministrarUsuariosComponent, canActivate:[AuthGuard]},
      { path: 'crear-usuarios', component: CrearUsuarioComponent, canActivate:[AuthGuard]},
      { path: 'crear-usuarios/:id', component: CrearUsuarioComponent, canActivate:[AuthGuard]},
      { path: 'crear-usuarios/:v/:usuario', component: CrearUsuarioComponent, canActivate:[AuthGuard]},
      { path: 'indicadores', component: IndicadoresComponent, canActivate:[AuthGuard]},
      { path: 'diligenciar-indicador', component: DiligenciarIndicadorComponent, canActivate:[AuthGuard]},
      { path: 'asignar-indicadores', component: AsignarIndicadoresComponent, canActivate:[AuthGuard]},
      { path: 'configuracion', component: ConfiguracionComponent, canActivate:[AuthGuard]},
    ])
  ],
  providers: [
    // JWT
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
