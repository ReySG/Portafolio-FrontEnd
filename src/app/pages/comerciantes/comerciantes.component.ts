import { Component, OnInit } from '@angular/core';
import { ModalService } from '../clientes/modal.service';

@Component({
  selector: 'app-comerciantes',
  templateUrl: './comerciantes.component.html',
  styleUrls: ['./comerciantes.component.css']
})
export class ComerciantesComponent implements OnInit {
  
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
