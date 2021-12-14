import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../cliente.service';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../usuarios/usuarios.service';
import { Usuario } from '../../models/usuario';
import { AuthService } from 'src/app/auth/auth.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-clientes-info-update',
  templateUrl: './clientes-info-update.component.html',
  styleUrls: ['./clientes-info-update.component.css']
})
export class ClientesInfoUpdateComponent implements OnInit {

  public usuario: any;
  public cliente: Cliente = new Cliente();
  public clienteActual: Cliente;
  idUsuario: number;
  progreso: number = 0;
  seleccionados: any[];
  errores: string[];
  clienteForm: FormGroup;

  constructor(private clienteService: ClienteService, private router: Router, private formBuilder: FormBuilder, private usuarioService: UsuariosService, private authService: AuthService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.authService.usuario);
    this.idUsuario = this.authService.usuario.id;
    this.usuarioService.getUsuario(this.idUsuario).subscribe(user => {
      this.usuario = user;
      this.cliente = user.cliente;
      console.log("cliente:", this.cliente);
    });
    console.log("idUSuario:", this.idUsuario);

    this.clienteForm = this.formBuilder.group({
      nombre: new FormControl(this.cliente.nombre),
      rut: ['', [Validators.required]],
      apellidoP: ['', [Validators.required]],
      apellidoM: ['', [Validators.required]],
      email: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      usuarioId: this.idUsuario,
    })
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.clienteService.getCliente(id).subscribe((cliente) => this.clienteActual = cliente
        )
        console.log(this.clienteActual);
      }
    })

  }


  update(): void {


    this.usuario.cliente = this.data;

    // this.usuario.cliente = this.cliente;

    // console.log("user: ", this.usuario);
    this.usuarioService.updateUsuarioCliente(this.usuario)
      .subscribe(json => {
        this.router.navigate(['/solicitud'])
        Swal.fire('Cliente Actualizado', `El cliente ${this.usuario.cliente.nombre} ha sido actualizado exitosamente`, 'success')
      },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
  }
  get nombreNotValid() {
    return this.clienteForm.get('nombre').invalid && this.clienteForm.get('nombre').touched;
  }
  get rutNotValid() {
    return this.clienteForm.get('rut').invalid && this.clienteForm.get('rut').touched;
  }
  get apellidoPNotValid() {
    return this.clienteForm.get('apellidoP').invalid && this.clienteForm.get('apellidoP').touched;
  }
  get apellidoMNotValid() {
    return this.clienteForm.get('apellidoM').invalid && this.clienteForm.get('apellidoM').touched;
  }
  get emailNotValid() {
    return this.clienteForm.get('email').invalid && this.clienteForm.get('email').touched;
  }
  get direccionNotValid() {
    return this.clienteForm.get('direccion').invalid && this.clienteForm.get('direccion').touched;
  }
  get numeroNotValid() {
    return this.clienteForm.get('numero').invalid && this.clienteForm.get('numero').touched;
  }

  get data() { return this.clienteForm.value; }


  onSubmit() {
    if (this.clienteForm.invalid) {
      return Object.values(this.clienteForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    this.update();

  }
}
