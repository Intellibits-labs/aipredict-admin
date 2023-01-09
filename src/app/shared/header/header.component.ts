import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuServiceService } from 'src/app/core/services/menu-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() menuToggle = new EventEmitter<boolean>();
  constructor(private menuServiceService: MenuServiceService) {}

  ngOnInit(): void {}
  toggle() {
    this.menuToggle.emit(true);
  }
}
