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
      { path: 'subcategorias', component: SubcategoComponent},
      { path: 'olvide-clave', component: OlvideClaveComponent},
      { path: 'administrar-indicadores', component: AdministrarIndicadoresComponent},
      { path: 'cambio-contrasena.component', component: CambioContrasenaComponent},
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
