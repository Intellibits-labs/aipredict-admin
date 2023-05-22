import {
  BreakpointObserver,
  Breakpoints,
  MediaMatcher,
} from "@angular/cdk/layout";
import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

import { MatSidenav } from "@angular/material/sidenav";
import { Router } from "@angular/router";
import { DataService } from "../core/services/data.service";
import { MenuServiceService } from "../core/services/menu-service.service";

@Component({
  selector: "app-pages",
  templateUrl: "./pages.component.html",
  styleUrls: ["./pages.component.scss"],
})
export class PagesComponent implements OnInit {
  @ViewChild("snav") public sidenav: MatSidenav | any;
  showFiller = true;
  isPhonePortrait: boolean = false;
  pagesArray: any = [
    {
      title: "Dashboard",
      url: "/pages/dashboard",
      icon: "dashboard",
    },
    {
      title: "Users",
      url: "/pages/users",
      icon: "person",
    },

    {
      title: "Stocks",
      url: "/pages/stocks",
      icon: "monitoring",
    },

    {
      title: "Predictions",
      url: "/pages/predictions",
      icon: "leaderboard",
    },
    {
      title: "Holidays",
      url: "/pages/holidays",
      icon: "holiday_village",
    },
    {
      title: "Market Data",
      url: "/pages/market-data",
      icon: "data_thresholding",
    },
  ];
  userData: any;

  mobileQuery!: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(
    private router: Router,
    private menuServiceService: MenuServiceService,
    private responsive: BreakpointObserver,
    private dataService: DataService,
    public dialog: MatDialog,
    public changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.getUserMe();
    this.responsive.observe(Breakpoints.HandsetPortrait).subscribe((result) => {
      this.isPhonePortrait = false;
      if (result.matches) {
        this.isPhonePortrait = true;
      }
      console.log(this.isPhonePortrait);
    });
  }
  ngAfterViewInit(): void {
    this.menuServiceService.setSidenav(this.sidenav);
    console.log(
      "🚀 ~ file: pages.component.ts:80 ~ PagesComponent ~ ngAfterViewInit ~ this.sidenav",
      this.sidenav
    );
  }

  getUserMe() {
    this.dataService.getMethod("users/me").subscribe({
      next: (res) => {
        console.log("🚀 ~ file: pages.page.ts ~ line 36 ~  ~ res", res);
        this.userData = res;
      },
      error: (e) => console.error(e),
      complete: () => console.info("complete"),
    });
  }

  logout() {
    let dialogRef = this.dialog.open(LogoutDialog, {
      width: "300px",
      height: "200px",
      data: { data: "" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed", result);
      if (result == "YES") {
        localStorage.clear();
        this.router.navigate(["/"]);
      }
    });
  }
}
@Component({
  selector: "logout-dialog",
  templateUrl: "../pages/logout-dialog.html",
})
export class LogoutDialog {
  constructor(
    public dialogRef: MatDialogRef<LogoutDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  logoutClick(button: string) {
    this.dialogRef.close(button);
  }
}
