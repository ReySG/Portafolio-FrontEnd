import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solicitud-list',
  templateUrl: './solicitud-list.component.html',
  styleUrls: ['./solicitud-list.component.css']
})
export class SolicitudListComponent implements OnInit {

  loading: boolean = false;
  paginador: any;
  roles = [];



  constructor() { }

  ngOnInit(): void {
  }

}
