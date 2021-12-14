import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../../clientes/modal.service';
import { Producto } from '../../models/producto';
import { SolicitudCompra } from '../../models/solicitudCompra';
import { SolicitudService } from '../../solicitud/solicitud.service';
import { ProductoService } from '../productos-form/producto.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {

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
          console.log("Solicitudes cliente: ", response);
        });

    });

  }

}
