import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../../clientes/modal.service';
import { Producto } from '../../models/producto';
import { SolicitudCompra } from '../../models/solicitudCompra';
import { SolicitudComponent } from '../../solicitud/solicitud.component';
import { SolicitudService } from '../../solicitud/solicitud.service';
import { ProductoService } from '../productos-form/producto.service';

@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.css']
})
export class ProductosListComponent implements OnInit {

  loading: boolean = false;
  paginador: any;
  productos: Producto[];
  productoSeleccionado: Producto;
  solicitudes: SolicitudCompra[];

  constructor(private modalService: ModalService, private activatedRoute: ActivatedRoute,
    private productoService: ProductoService, private solicitudService: SolicitudService) { }

  ngOnInit(): void {
    this.actualizarLista();

  }

  actualizarLista() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.solicitudService.getSolicitudes(page)
        .subscribe(response => {
          this.solicitudes = response.content as SolicitudCompra[];
          this.paginador = response;
        });
      console.log(this.productos);
    });

  }

  ejecutar() {
    this.loading = true;
    setTimeout(() => this.loading = false, 1000)
  }

  abrirModal(producto: Producto) {
    console.log(this.productoSeleccionado);
    this.productoSeleccionado = producto;
    this.modalService.abrirModal();
  }

}
