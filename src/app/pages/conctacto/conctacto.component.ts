import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conctacto',
  templateUrl: './conctacto.component.html',
  styleUrls: ['./conctacto.component.css']
})
export class ConctactoComponent implements OnInit {

  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;

  options: any;

  overlays: any[];


  constructor() { }

  ngOnInit(): void {
    this.options = {
      center: {lat: 36.890257, lng: 30.707417},
      zoom: 12
  };
  }

}
