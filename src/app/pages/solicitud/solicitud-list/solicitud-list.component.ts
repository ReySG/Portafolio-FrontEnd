import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ModalService } from '../../clientes/modal.service';
import { SolicitudCompra } from '../../models/solicitudCompra';
import { SolicitudService } from '../solicitud.service';

@Component({
  selector: 'app-solicitud-list',
  templateUrl: './solicitud-list.component.html',
  styleUrls: ['./solicitud-list.component.css']
})
export class SolicitudListComponent implements OnInit {

  loading: boolean = false;
  paginador: any;
  roles = [];
  solicitudes: SolicitudCompra[];
  solicitudSeleccionada: SolicitudCompra;



  constructor(private solicitudService: SolicitudService, private router: ActivatedRoute,private modalService: ModalService, private authService: AuthService) { }

  ngOnInit(): void {
    this.actualizarLista();

  }


  actualizarLista() {
    this.router.paramMap.subscribe(params => {
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

  ejecutar() {
    this.loading = true;
    setTimeout(() => this.loading = false, 3000)
  }

  abrirModal(solicitud: SolicitudCompra) {
    console.log(this.solicitudSeleccionada);
    this.solicitudSeleccionada = solicitud;
    this.modalService.abrirModal();
  }
s

}
