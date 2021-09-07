import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ProductoresComponent } from './pages/productores/productores.component';
import { ContratosComponent } from './pages/contratos/contratos.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ComerciantesComponent } from './pages/comerciantes/comerciantes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    ClientesComponent,
    ProductoresComponent,
    ContratosComponent,
    SidebarComponent,
    PerfilComponent,
    UsuariosComponent,
    ComerciantesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
