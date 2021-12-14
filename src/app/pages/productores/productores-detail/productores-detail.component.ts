import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalService } from '../../clientes/modal.service';
import { Productor } from '../../models/productor';
import { ProductorService } from '../productor.service';
import { of, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-productores-detail',
  templateUrl: './productores-detail.component.html',
  styleUrls: ['./productores-detail.component.css']
})
export class ProductoresDetailComponent implements OnInit {

  @Input() productor: Productor;

  errores: string[];

  progreso: number = 0;


  constructor(public modalService: ModalService, private productorService: ProductorService, private router: Router) { }

  ngOnInit(): void {
  }

  update(): void {
    console.log(this.productor.idProductor);
    this.productorService.update(this.productor)
      .subscribe(json => {
        this.router.navigate(['/productores'])
        Swal.fire('Productor Actualizado', `El productor ${this.productor.nombre} ha sido actualizado exitosamente`, 'success')
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
    console.log(this.productor);


  }

  abrirModal() {
    this.modalService.abrirModal();
    console.log(this.productor.idProductor);

  }


  deleteProductor(productor: Productor): void {
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
        this.router.navigate(['/productores'])
        this.productorService.delete(productor.idProductor).subscribe(resposnse => {
          Swal.fire(
            'Productor Eliminado!',
            `Productor con id ${productor.idProductor} ha sido eliminado con exito`,
            'success'  
          )

        })
      } 
    })
  }  

}; 