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
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home' },
      { label: 'Calendar', icon: 'pi pi-fw pi-calendar' },
      { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
      { label: 'Documentation', icon: 'pi pi-fw pi-file' },
      { label: 'Settings', icon: 'pi pi-fw pi-cog' }
    ];



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

  Delete(usuario: Usuario): void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${usuario.username} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.usuarioService.delete(usuario.id).subscribe(
          response => {
            this.usuarios = this.usuarios.filter(user => user !== usuario)
            swalWithBootstrapButtons.fire(
              'Usuario Eliminado!',
              `Usuario  ${usuario.username} eliminado con éxito.`,
              'success'
            )
          }
        )

      }

    })


  }



}
