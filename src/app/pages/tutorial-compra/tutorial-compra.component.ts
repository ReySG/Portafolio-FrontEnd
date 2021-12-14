import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-tutorial-compra',
  templateUrl: './tutorial-compra.component.html',
  styleUrls: ['./tutorial-compra.component.css']
})
export class TutorialCompraComponent implements OnInit {

  items: MenuItem[];



  constructor() { }

  ngOnInit(): void {
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

  onPlayerReady(event) {
    event.target.playVide();
  }

}





