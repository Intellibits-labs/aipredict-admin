import { Component, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { HttpApi } from "src/app/core/http/http-api";
import { DataService } from "src/app/core/services/data.service";
import { LoaderService } from "src/app/core/services/loader.service";
import { ToastService } from "src/app/core/services/toast.service";
import { UploadCsvComponent } from "src/app/shared/upload-csv/upload-csv.component";
import { UsereditModalComponent } from "src/app/shared/useredit-modal/useredit-modal.component";

@Component({
  selector: "app-predictions",
  templateUrl: "./predictions.component.html",
  styleUrls: ["./predictions.component.scss"],
})
export class PredictionsComponent {
  @ViewChild(MatPaginator, { read: true }) paginator: MatPaginator | any;
  tableColumn: string[] = [
    "User",
    "Stock",
    "Trade Date",
    "Buy Price",
    "Sell Price",
    "Stop Loss",
    "Status",
    "Expected ROI",
  ];
  usersArray = new MatTableDataSource<any>([]);
  public totalLength = 0;

  public pageSize = 10;
  public pageIndex = 0;

  page = "0";
  selectedValue: any;
  constructor(
    private dataService: DataService,
    private toast: ToastService,
    private loader: LoaderService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getPrediction();
  }

  getPrediction(page: string = "1", pageSize = 10) {
    this.loader.show();
    this.pageSize = pageSize;
    this.dataService
      .getMethod(
        HttpApi.getPrediction +
          "?page=" +
          page +
          "&sortBy=createdAt:desc&limit=" +
          this.pageSize +
          (this.selectedValue ? "&role=" + this.selectedValue : "")
      )
      .subscribe({
        next: (res) => {
          console.log(
            "🚀 ~ line 189 ~ UsersPage ~ this.data.getMethod ~ res",
            res
          );
          this.usersArray = new MatTableDataSource<any>(res?.results);
          this.pageSize = res.limit;
          this.pageIndex = res.page - 1;
          this.totalLength = res.totalResults;
          console.log(this.usersArray);
          this.usersArray.paginator = this.paginator;
          console.log(this.totalLength);
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
    this.getPrediction(event.pageIndex + 1, event.pageSize);
  }
  ngAfterViewInit() {
    this.usersArray.paginator = this.paginator;
  }

  changePredictor(element: any) {
    console.log(element);
    this.dataService.getMethod(HttpApi.changePredictor + element.id).subscribe({
      next: (res) => {
        console.log("🚀 ~76 ~ UsersComponent  ~ res", res);
        this.getPrediction();
      },
      error: (e) => console.error(e),
      complete: () => console.info("complete"),
    });
  }
  changeUser(element: any) {
    console.log(element);
    this.dataService.getMethod(HttpApi.changeUser + element.id).subscribe({
      next: (res) => {
        console.log("🚀 ~76 ~ UsersComponent  ~ res", res);
        this.getPrediction();
      },
      error: (e) => console.error(e),
      complete: () => console.info("complete"),
    });
  }

  roleChange(ev: any) {
    console.log(ev.value);
    this.selectedValue = ev.value;
    this.getPrediction();
  }

  uploadClick() {
    const dialogRef = this.dialog.open(UploadCsvComponent, {
      data: { isData: "" },
    });
  }
}
