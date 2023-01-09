import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  breakpoint = 1;

  smView = true;
  constructor() {}

  ngOnInit(): void {
    if (window.innerWidth <= 576) {
      this.breakpoint = 1;
      this.smView = false;
    } else {
      this.breakpoint = 2;
      this.smView = true;
    }
  }
  onResize(event: any) {
    if (event.target.innerWidth <= 576) {
      this.breakpoint = 1;
      this.smView = false;
    } else {
      this.breakpoint = 2;
      this.smView = true;
    }
  }
}
