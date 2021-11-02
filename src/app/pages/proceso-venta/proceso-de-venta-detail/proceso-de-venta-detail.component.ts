import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-proceso-de-venta-detail',
  templateUrl: './proceso-de-venta-detail.component.html',
  styleUrls: ['./proceso-de-venta-detail.component.css']
})
export class ProcesoDeVentaDetailComponent implements OnInit {

  events: any[];
  items: MenuItem[];


  constructor() { }

  ngOnInit(): void {
    this.events = [
      { status: 'Orden Recibida', date: '15/10/2020 10:30', icon: PrimeIcons.SHOPPING_CART, color: '#9C27B0', image: 'game-controller.jpg' },
      { status: 'En espera de aprobacion', date: '16/10/2020 14:00', icon: PrimeIcons.COG, color: '#673AB7' },
      { status: 'Enviado', date: '17/10/2020 16:15', icon: PrimeIcons.ENVELOPE, color: '#FF9800' },
      { status: 'Entregado', date: '18/10/2020 10:00', icon: PrimeIcons.CHECK, color: '#607D8B' }
    ];
    this.items = [
      {
        label: 'Acciones',
        items: [
          { label: 'Aprobar' },
          { label: 'Rechazar' }
        ]
      },
      {
        label: 'Editar',
        icon: 'pi pi-fw pi-pencil',
        items: [
          { label: 'Eliminar Proceso', icon: 'pi pi-fw pi-trash' },
          { label: 'Actualizar', icon: 'pi pi-fw pi-refresh' }
        ]
      }
    ];
  }

}


