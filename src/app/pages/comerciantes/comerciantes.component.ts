import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comerciantes',
  templateUrl: './comerciantes.component.html',
  styleUrls: ['./comerciantes.component.css']
})
export class ComerciantesComponent implements OnInit {
  
  loading:boolean = false;


  constructor() { }

  ngOnInit(): void {
  }
  ejecutar() {
    this.loading = true;
    setTimeout( () => this.loading = false, 3000)
  }

}
