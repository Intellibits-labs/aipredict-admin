import { Component, OnInit } from '@angular/core';
import { HttpApi } from 'src/app/core/http/http-api';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  breakpoint = 1;
  rowHeight = '2:1';
  dashboard: any;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.breakpoint = window.innerWidth <= 575 ? 1 : 4;
    this.rowHeight = window.innerWidth <= 575 ? '4:1' : '2:1';

    this.getDashboards();
  }
  onResize(event: any) {
    this.breakpoint = event.target.innerWidth <= 575 ? 1 : 4;
    this.rowHeight = event.target.innerWidth <= 575 ? '4:1' : '2:1';
  }

  getDashboards() {
    this.dataService.getMethod(HttpApi.getDashboard).subscribe({
      next: (res) => {
        console.log('🚀 ~ 36 ~ DashboardComponent ~ res', res);
        this.dashboard = res;
      },
      error: (e) => {
        console.log(e.message);
      },
    });
  }
}
