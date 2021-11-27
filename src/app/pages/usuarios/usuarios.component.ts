import { Component, OnInit, Output } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Role } from '../models/role';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from './usuarios.service';
import { tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { ModalService } from '../clientes/modal.service';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  loading: boolean = false;
  usuarios: Usuario[];
  paginador: any;
  roles = [];
  usuarioSeleccionado: Usuario;
  registerForm: FormGroup;
  items: MenuItem[];

  constructor(private activatedRoute: ActivatedRoute, private usuarioService: UsuariosService, private modalService: ModalService,
    private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.actualizarLista();


  }

  actualizarLista() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.usuarioService.getUsuarios(page)
        .pipe(
          tap(response => {
            (response.content as Usuario[]).forEach(usuario => usuario);

          })
        ).subscribe(response => {
          this.usuarios = response.content as Usuario[];
          this.paginador = response;
        });

    });


  }

  objectKeys(obj) {
    return Object.keys(obj);
  }

  ejecutar() {
    this.loading = true;
    setTimeout(() => this.loading = false, 3000)
  }

  abrirModal(usuario: Usuario) {
    console.log(this.usuarioSeleccionado);
    this.usuarioSeleccionado = usuario;
    this.modalService.abrirModal();
  }

  



}
