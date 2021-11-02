import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proceso-venta',
  templateUrl: './proceso-venta.component.html',
  styleUrls: ['./proceso-venta.component.css']
})
export class ProcesoVentaComponent implements OnInit {

  loading: boolean = false;
  paginador: any;
  roles = [];



  constructor() { }

  ngOnInit(): void {
  }

}
