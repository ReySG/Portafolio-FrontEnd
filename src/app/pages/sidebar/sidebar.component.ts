import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  usuario:Usuario;

  constructor(public authService:AuthService,  private router: Router) { }

  ngOnInit(): void {
  }

  logout():void{
    let username = this.authService.usuario.username;
    this.authService.logout();
    swal.fire('Logout',`Hola ${username}, has cerrado sesión con éxito!`,'success')
    this.router.navigate(['/login']);
  }

}
