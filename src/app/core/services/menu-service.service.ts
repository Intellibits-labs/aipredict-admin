import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class MenuServiceService {
  sidenav!: MatSidenav;
  constructor() {}
  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public open() {
    return this.sidenav.open();
  }

  public close() {
    return this.sidenav.close();
  }

  public toggle(): void {
    this.sidenav.close();
    console.log(
      '🚀 ~ file: menu-service.service.ts:24 ~ MenuServiceService ~ toggle ~ sidenav',
      this.sidenav
    );
  }
}
