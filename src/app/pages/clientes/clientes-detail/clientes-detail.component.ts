import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-clientes-detail',
  templateUrl: './clientes-detail.component.html',
  styleUrls: ['./clientes-detail.component.css']
  
})
export class ClientesDetailComponent implements OnInit {

  progreso: number = 0;

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.modalService.cerrarModal();
    this.progreso = 0;
  }

  abrirModal() {
    this.modalService.abrirModal();
  }

 


}
