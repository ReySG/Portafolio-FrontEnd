import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import swal from 'sweetalert2';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  private fotoSeleccionada: File;
  progreso: number = 0;
  usuario: Usuario;
  
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      swal.fire('Error seleccionar imagen: ', 'El archivo debe ser del tipo imagen', 'error');
      this.fotoSeleccionada = null;
    }
  }

  subirFoto() {

   
  }


}
