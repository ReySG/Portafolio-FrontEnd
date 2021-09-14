import { Component, OnInit } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  loading:boolean = false;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  ejecutar() {
    this.loading = true;
    setTimeout( () => this.loading = false, 3000)
  }

  abrirModal() {
    this.modalService.abrirModal();
  }
}
