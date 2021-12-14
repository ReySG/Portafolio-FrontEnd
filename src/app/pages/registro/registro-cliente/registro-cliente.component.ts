import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuariosService } from '../../usuarios/usuarios.service';
import Swal from 'sweetalert2';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent implements OnInit {

  public usuario: Usuario = new Usuario();
  errores: string[];
  usuarioForm: FormGroup;
  cliente: Cliente;

  roles: [
    {
      "id": 4,
      "nombre": "ROLE_CLIENTE_EXTERNO"
    }]

  constructor(private usuarioService: UsuariosService, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],

    })

  }

  get nombreNotValid() {
    return this.usuarioForm.get('username').invalid && this.usuarioForm.get('username').touched;
  }
  get passwordNotValid() {
    return this.usuarioForm.get('password').invalid && this.usuarioForm.get('password').touched;
  }
  get emailNotValid() {
    return this.usuarioForm.get('email').invalid && this.usuarioForm.get('email').touched;
  }
  // get rolesNotValid() {
  //   return this.usuarioForm.get('roles').invalid && this.usuarioForm.get('roles').touched;
  // }



  get data() { return this.usuarioForm.value; }

  onSubmit() {
    if (this.usuarioForm.invalid) {
      return Object.values(this.usuarioForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    this.usuario = new Usuario();
    this.usuario = this.data;
    // this.usuario.roles = this.roles;

    console.log("Data: ", this.data);

    this.create();


  }

  create(): void {
    console.log(this.usuario);
    this.usuarioService.registrarUsuarioCliente(this.usuario)
      .subscribe(usuario => {
        console.log("usuario creado: ", this.usuario);
        this.router.navigate(['/home'])
      },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
    let timerInterval
    Swal.fire({
      title: 'Procesando...',
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft().toString();
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
        Swal.fire({
          title: 'Usuario Registrado!',
          showConfirmButton: false,
          icon: 'success'

        });
        this.router.navigate(['/home']);


      }
    })

  }













}
