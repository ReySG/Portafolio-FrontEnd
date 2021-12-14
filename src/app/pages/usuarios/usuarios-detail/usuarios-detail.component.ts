import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../../clientes/modal.service';
import { Role } from '../../models/role';
import { Usuario } from '../../models/usuario';
import { UsuariosService } from '../usuarios.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios-detail',
  templateUrl: './usuarios-detail.component.html',
  styleUrls: ['./usuarios-detail.component.css']
})
export class UsuariosDetailComponent implements OnInit {

  @Input() usuario: Usuario;
  public newUsuario: Usuario = new Usuario()

  progreso: number = 0;
  seleccionados: any[];
  roles: Role[];
  errores: string[];
  registerForm: FormGroup;


  constructor(public modalService: ModalService, private activatedRoute: ActivatedRoute,
    private usuarioService: UsuariosService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.usuarioService
      .getRoles()
      .subscribe((data: any) => {
        this.roles = data;
      });

  }



  // onChange(e) {
  //   console.log(e);
  //   this.seleccionados.push(e.itemValue.name);

  //   console.log(this.seleccionados);
  // }


  objectKeys(obj) {
    return Object.keys(obj);
  }

  cerrarModal() {
    this.modalService.cerrarModal();
    this.progreso = 0;
    console.log("rol actualizado", this.usuario.roles);



  }

  update(): void {



    this.usuario.roles.splice(0, this.usuario.roles.length)
    console.log("seleccionados: ", this.seleccionados);

    this.usuario.roles.push(...this.seleccionados)


    console.log("Usuario actualizado: ", this.usuario);

    // this.usuarioService.update(this.usuario)
    //   .subscribe(json => {
    //     this.router.navigate(['/usuarios'])
    //     swal.fire('Usuario Actualizado', `${json.mensaje}: ${json.usuario.nombre}`, 'success')
    //   },
    //     err => {
    //       this.errores = err.error.errors as string[];
    //       console.error('Codigo del error desde el backend: ' + err.status);
    //       console.error(err.error.errors);
    //     }
    //   )
  }



  deleteUsuario(usuario: Usuario): void {
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
        this.cerrarModal();
        this.router.navigate(['/usuarios'])
        this.usuarioService.delete(usuario.id).subscribe(
          response => {
            this.usuario = this.usuario
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
