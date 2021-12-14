import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { ClienteService } from '../../clientes/cliente.service';
import { Cliente } from '../../models/cliente';
import { SolicitudCompra } from '../../models/solicitudCompra';
import { UsuariosService } from '../../usuarios/usuarios.service';
import { SolicitudService } from '../solicitud.service';

@Component({
  selector: 'app-mis-solicitudes',
  templateUrl: './mis-solicitudes.component.html',
  styleUrls: ['./mis-solicitudes.component.css']
})
export class MisSolicitudesComponent implements OnInit {

  loading: boolean = false;
  paginador: any;
  solicitudes: SolicitudCompra[];
  IdCliente: number;
  cliente: Cliente;
  idCliente: number;

  constructor(private activatedRoute: ActivatedRoute, private solicitudService: SolicitudService, public authService: AuthService, private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.getSolicitudesPorCliente();


  }

  getSolicitudesPorCliente() {
    this.clienteService.getClientePorUsuarioId(this.authService.usuario.id).subscribe(cliente => {
      this.idCliente = cliente.idCliente;
      this.activatedRoute.paramMap.subscribe(params => {
        let page: number = +params.get('page');
        if (!page) {
          page = 0;
        }
        console.log("id cliente: ", this.idCliente);
        this.solicitudService.getSolicitudesCliente(this.idCliente, page)
          .subscribe(response => {
            this.solicitudes = response.content as SolicitudCompra[];
            this.paginador = response;
            console.log("Solicitudes cliente: ", response);
          });
      });
    });




  }


}
