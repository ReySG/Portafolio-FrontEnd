import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  myElement: ElementRef;

  constructor(private scroller: ViewportScroller, private router: Router) { }

  ngOnInit(): void {
  }

  gotoAbout() {
    this.router.navigate([], { fragment: "about" });
  }

  toAbout() {
    document.getElementById("about").scrollIntoView({ behavior: "smooth" });
  }
  toTutorial() {
    document.getElementById("tutorial").scrollIntoView({ behavior: "smooth" });
  }
  toContacto() {
    document.getElementById("contacto").scrollIntoView({ behavior: "smooth" });
  }
}
