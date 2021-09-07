import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  loading:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ejecutar() {
    this.loading = true;
    setTimeout( () => this.loading = false, 3000)
  }
}
