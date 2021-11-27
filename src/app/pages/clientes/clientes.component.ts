import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../models/cliente';
import { ClienteService } from './cliente.service';
import { ModalService } from './modal.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  loading: boolean = false;
  clientes: Cliente[];
  clienteSeleccionado: Cliente;
  paginador: any;


  constructor(private modalService: ModalService, private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.actualizarLista();
  }

  actualizarLista() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.clienteService.getClientes(page)
        .subscribe(response => {
          this.clientes = response.content as Cliente[];
          this.paginador = response;
        });
      console.log(this.clientes);

    });

  }

  ejecutar() {
    this.loading = true;
    setTimeout(() => this.loading = false, 3000)
  }



  abrirModal(cliente: Cliente) {
    console.log(this.clienteSeleccionado);
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }






}
