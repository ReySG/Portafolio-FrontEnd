import { NgModule, LOCALE_ID } from '@angular/core';
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
import { ClientesDetailComponent } from './pages/clientes/clientes-detail/clientes-detail.component';
import { DetalleVentasComponent } from './pages/clientes/detalle-ventas/detalle-ventas.component';
import { PaginatorComponent } from './pages/paginator/paginator.component';
import { UsuariosDetailComponent } from './pages/usuarios/usuarios-detail/usuarios-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { UsuariosFormComponent } from './pages/usuarios/usuarios-form/usuarios-form.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptor } from './auth/interceptors/token.interceptor';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import { DataViewModule } from 'primeng/dataview';
import { OrderListModule } from 'primeng/orderlist';
import { TimelineModule } from 'primeng/timeline';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import {BadgeModule} from 'primeng/badge';
import {MenubarModule} from 'primeng/menubar';
import {TabMenuModule} from 'primeng/tabmenu';
import { ConctactoComponent } from './pages/conctacto/conctacto.component';
import { TutorialCompraComponent } from './pages/tutorial-compra/tutorial-compra.component';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { SolicitudComponent } from './pages/solicitud/solicitud.component';
import { AgmCoreModule } from '@agm/core';
import {GMapModule} from 'primeng/gmap';
import { FooterComponent } from './pages/footer/footer.component';
import { ProcesoVentaComponent } from './pages/proceso-venta/proceso-venta.component';
import { ProcesoVentaFormComponent } from './pages//proceso-venta/proceso-venta-form/proceso-venta-form.component';
import { ProcesoDeVentaDetailComponent } from './pages/proceso-venta/proceso-de-venta-detail/proceso-de-venta-detail.component';
import { SolicitudListComponent } from './pages/solicitud/solicitud-list/solicitud-list.component';
import { ToolbarModule } from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';

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
    ClientesDetailComponent,
    DetalleVentasComponent,
    PaginatorComponent,
    UsuariosDetailComponent,
    HomeComponent,
    NavbarComponent,
    UsuariosFormComponent,
    ConctactoComponent,
    TutorialCompraComponent,
    SolicitudComponent,
    FooterComponent,
    ProcesoVentaComponent,
    ProcesoVentaFormComponent,
    ProcesoDeVentaDetailComponent,
    SolicitudListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SplitButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MultiSelectModule,
    BrowserAnimationsModule,
    DataViewModule,
    OrderListModule,
    ButtonModule,
    TimelineModule,
    AvatarModule,
    AvatarGroupModule,
    BadgeModule,
    MenubarModule,
    TabMenuModule,
    YouTubePlayerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCxcGpBiowdDy2ZQD-g0YUMGop3sY4qzQE'
    }),
    GMapModule,
    ToolbarModule
    
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' },
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
