import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-detalle-ventas',
  templateUrl: './detalle-ventas.component.html',
  styleUrls: ['./detalle-ventas.component.css']
})
export class DetalleVentasComponent implements OnInit {
  
  progreso: number = 0;

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }
  cerrarModal() {
    this.modalService.cerrarModal();
    this.progreso = 0;
  }

}
