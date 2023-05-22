import { Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { HttpApi } from "src/app/core/http/http-api";
import { DataService } from "src/app/core/services/data.service";
import { LoaderService } from "src/app/core/services/loader.service";
import { ToastService } from "src/app/core/services/toast.service";

@Component({
  selector: "app-stocks",
  templateUrl: "./stocks.component.html",
  styleUrls: ["./stocks.component.scss"],
})
export class StocksComponent {
  @ViewChild(MatPaginator, { read: true }) paginator: MatPaginator | any;
  tableColumn: any[] = ["Name", "Symbol", "Status"];
  usersArray = new MatTableDataSource<any>([]);
  public totalLength = 0;

  public pageSize = 10;
  public pageIndex = 0;

  page = "0";
  selectedValue: any;
  constructor(
    private dataService: DataService,
    private toast: ToastService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.getStock();
  }

  getStock(page: string = "1", pageSize = 10) {
    this.loader.show();
    this.pageSize = pageSize;
    this.dataService
      .getMethod(
        HttpApi.getStock +
          "?page=" +
          page +
          "&sortBy=createdAt:desc&limit=" +
          this.pageSize +
          "&status=" +
          this.selectedValue
      )
      .subscribe({
        next: (res) => {
          console.log("🚀 ~ line 189 ~ UsersPage  ~ res", res);

          var array: any = [];
          // res.results.map((x: any) => {
          //   if (
          //     x?.['meta']?.['Global Quote']?.['10. change percent'].includes(
          //       '-'
          //     )
          //   ) {
          //     x.flag = true;
          //   } else {
          //     x.flag = false;
          //   }
          //   array.push(x);
          // });
          this.usersArray = new MatTableDataSource<any>(res.results);
          // this.usersArray = res.results;

          this.pageSize = res.limit;
          this.pageIndex = res.page - 1;
          this.totalLength = res.totalResults;
          console.log(this.usersArray);
          this.usersArray.paginator = this.paginator;

          this.loader.dismiss();
        },
        error: (e) => {
          console.error(e);
          this.toast.showToast({ message: e.message, type: "ERROR" });
          this.loader.dismiss();
        },
        complete: () => console.info("complete"),
      });
  }

  getData(event: any) {
    console.log(event);
    this.getStock(event.pageIndex + 1, event.pageSize);
  }
  ngAfterViewInit() {
    this.usersArray.paginator = this.paginator;
  }

  changePredictor(element: any) {
    console.log(element);
    this.dataService.getMethod(HttpApi.changePredictor + element.id).subscribe({
      next: (res) => {
        console.log("🚀 ~76 ~ UsersComponent  ~ res", res);
        this.getStock();
      },
      error: (e) => {
        console.error(e);
        this.toast.showToast({ message: e.message, type: "ERROR" });
      },
      complete: () => console.info("complete"),
    });
  }
  changeUser(element: any) {
    console.log(element);
    this.dataService.getMethod(HttpApi.changeUser + element.id).subscribe({
      next: (res) => {
        console.log("🚀 ~76 ~ UsersComponent  ~ res", res);
        this.getStock();
      },
      error: (e) => console.error(e),
      complete: () => console.info("complete"),
    });
  }

  roleChange(ev: any) {
    console.log(ev.value);
    this.selectedValue = ev.value;
    this.getStock();
  }
}
