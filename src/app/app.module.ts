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
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },            
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'private', component: PrivateComponent,canActivate:[AuthGuard]},
      { path: 'registro-super', component: RegistroSuperComponent, canActivate:[AuthGuard]},
      { path: 'estandares', component: EstandaresComponent},
      { path: 'categorias', component: CategoriasComponent},
      { path: 'subcatego', component: SubcategoComponent},
      { path: 'olvide-clave', component: OlvideClaveComponent},
      { path: 'administrar-indicadores', component: AdministrarIndicadoresComponent},
      { path: 'cambio-contrasena', component: CambioContrasenaComponent},
      { path: 'eliminar-estandar', component: EliminarEstandarComponent},
      { path: 'eliminar-categoria', component: EliminarCategoriaComponent},
      { path: 'eliminar-subcategoria', component: EliminarSubcategoriaComponent},
      { path: 'nuevo-indicador', component: NuevoIndicadorComponent},
      { path: 'indicadores-masivos', component: IndicadoresMasivosComponent},
      { path: 'editar-indicador', component: EditarIndicadorComponent},
      { path: 'administrar-usuarios', component: AdministrarUsuariosComponent},
      { path: 'crear-usuarios', component: CrearUsuarioComponent},
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
