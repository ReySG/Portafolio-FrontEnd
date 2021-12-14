import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Cliente } from '../../models/cliente';
import { Usuario } from '../../models/usuario';
import { ClienteService } from '../cliente.service';
import { ModalService } from '../modal.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes-detail',
  templateUrl: './clientes-detail.component.html',
  styleUrls: ['./clientes-detail.component.css']

})
export class ClientesDetailComponent implements OnInit {

  @Input() cliente: Cliente;
  public newCliente: Cliente = new Cliente();

  progreso: number = 0;
  seleccionados: any[];
  errores: string[];
  registerForm: FormGroup;
  constructor(public modalService: ModalService, private clienteService: ClienteService, private router: Router) { }

  ngOnInit(): void {
  }

  update(): void {
    this.clienteService.update(this.cliente)
      .subscribe(json => {
        this.router.navigate(['/clientes'])
        Swal.fire('Cliente Actualizado', `El cliente ${this.cliente.nombre} ha sido actualizado exitosamente`, 'success')
        this.cerrarModal();
      },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
  }


  cerrarModal() {
    this.modalService.cerrarModal();
    this.progreso = 0;
  }

  abrirModal() {
    this.modalService.abrirModal();
  }

  deleteCliente(cliente: Cliente): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cerrarModal();
        this.router.navigate(['/clientes'])
        this.clienteService.deleteCliente(cliente.idCliente).subscribe(response => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )

        })
      }
    })
  }




}
