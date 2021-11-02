import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Usuario } from '../models/usuario';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:Usuario;


  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
   }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      swal.fire('login',`Hola ${this.authService.usuario.username}ya estas autenticado!`,'info')
      this.router.navigate(['/perfil']);
    }
  }

  login():void {
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null){
      swal.fire('Error Login', 'Username o password vacias!', 'error');
      return;

    }
    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);
    


      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;
      this.router.navigate(['/perfil']);
      swal.fire('Logueado', `${usuario.username}, Bienvenido!`,'success');

    }, error => {
      if(error.status == 400){
        swal.fire('Error al Loguear','Usuario o contraseña incorrectas!','error');
      }
    }
  );
  }

}
