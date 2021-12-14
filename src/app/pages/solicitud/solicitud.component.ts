import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SolicitudCompra } from '../models/solicitudCompra';
import Swal from 'sweetalert2';
import { SolicitudService } from './solicitud.service';
import { Router } from '@angular/router';
import { Cliente } from '../models/cliente';
import { AuthService } from 'src/app/auth/auth.service';
import { ClienteService } from '../clientes/cliente.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Usuario } from '../models/usuario';
import { timer } from 'rxjs';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  public solicitudCompra: SolicitudCompra = new SolicitudCompra();
  public newCliente: Cliente = new Cliente();
  public errores: string[];
  solicitudCompraForm: FormGroup;
  cliente: Cliente;
  usuario: Usuario;
  constructor(private formBuilder: FormBuilder, private router: Router, private usuarioService: UsuariosService, private solicitudService: SolicitudService, public authService: AuthService) { }

  ngOnInit(): void {
    this.usuarioService.getUsuario(this.authService.usuario.id).subscribe(usuario => {
      this.solicitudCompra.cliente = usuario.cliente;

      console.log("nombre cliente", this.solicitudCompra.cliente.nombre);

    });


    // this.solicitudCompraForm = this.formBuilder.group({
    //   pedido: ['', [Validators.required]],
    //   cantidad: ['', [Validators.required]],
    //   cliente: this.solicitudCompra.cliente.idCliente
    // })

  }

  // get pedidoNotValid() {
  //   return this.solicitudCompraForm.get('pedido').invalid && this.solicitudCompraForm.get('pedido').touched;
  // }
  // get cantidadNotValid() {
  //   return this.solicitudCompraForm.get('cantidad').invalid && this.solicitudCompraForm.get('cantidad').touched;
  // }

  // get data() { return this.solicitudCompraForm.value; }

  create() {
    console.log("solicitiud: ", this.solicitudCompra);
    this.solicitudService.crearSolicitudCompra(this.solicitudCompra)
      .subscribe(
        productor => {
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
    let timerInterval
    Swal.fire({
      title: 'Procesando solicitud',
      html: 'Enviando... porfavor espere',
      timer: 6000,
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
          title: 'Solicitud de compra enviada!',
          showConfirmButton: false,
          icon: 'success'

        });
        this.router.navigate(['/mis-solicitudes']);


      }
    })
  }

  // onSubmit() {
  //   if (this.solicitudCompraForm.invalid) {
  //     return Object.values(this.solicitudCompraForm.controls).forEach(control => {
  //       control.markAsTouched();
  //     });
  //   }
  //   this.solicitudCompra = new SolicitudCompra();
  //   this.solicitudCompra = this.data;
  //   this.create();

  // }


}
