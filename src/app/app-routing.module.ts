import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ComerciantesComponent } from './pages/comerciantes/comerciantes.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ProductoresComponent } from './pages/productores/productores.component';
import { RegistroComponent } from './pages/registro/registro.component';

const routes: Routes = [
  {path: '', redirectTo: '/registro', pathMatch: 'full'},
  { path: 'login'   , component: LoginComponent },
  { path: 'clientes'   , component: ClientesComponent },
  { path: 'productores' , component: ProductoresComponent },
  { path: 'comerciantes' , component: ComerciantesComponent },
  { path: 'perfil' , component: PerfilComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '**', redirectTo: 'login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
