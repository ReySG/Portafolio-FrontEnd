import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { ModalService } from '../clientes/modal.service';
import { Productor } from '../models/productor';
import { ProductorService } from './productor.service';

@Component({
  selector: 'app-productores',
  templateUrl: './productores.component.html',
  styleUrls: ['./productores.component.css']
})
export class ProductoresComponent implements OnInit {

  loading: boolean = false;
  paginador: any;
  productores: Productor[];
  productorSeleccionado: Productor;

  constructor(private modalService: ModalService, private activatedRoute: ActivatedRoute,
    private productorService: ProductorService) { }

  ngOnInit(): void {
    this.actualizarLista();
  }

  actualizarLista() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.productorService.getProductores(page)
        .subscribe(response => {
          this.productores = response.content as Productor[];
          this.paginador = response;
        });
      console.log(this.productores);
    });


  }

  ejecutar() {
    this.loading = true;
    setTimeout(() => this.loading = false, 1000)
  }

  abrirModal(productor: Productor) {
    console.log(this.productorSeleccionado);
    this.productorSeleccionado = productor;
    this.modalService.abrirModal();
  }

  Delete(productor: Productor): void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${productor.nombre} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.productorService.delete(productor.idProductor).subscribe(
          response => {
            this.productores = this.productores.filter(user => user !== productor)
            swalWithBootstrapButtons.fire(
              'Usuario Eliminado!',
              `Usuario  ${productor.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )

      }

    })


  }
}
