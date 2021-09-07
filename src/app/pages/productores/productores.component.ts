import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productores',
  templateUrl: './productores.component.html',
  styleUrls: ['./productores.component.css']
})
export class ProductoresComponent implements OnInit {

  loading:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ejecutar() {
    this.loading = true;
    setTimeout( () => this.loading = false, 3000)
  }

}
