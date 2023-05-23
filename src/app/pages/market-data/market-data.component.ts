import { Component, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Observable, map, startWith } from "rxjs";
import { HttpApi } from "src/app/core/http/http-api";
import { DataService } from "src/app/core/services/data.service";
import { LoaderService } from "src/app/core/services/loader.service";
import { ToastService } from "src/app/core/services/toast.service";
import { UploadCsvComponent } from "src/app/shared/upload-csv/upload-csv.component";

@Component({
  selector: "app-market-data",
  templateUrl: "./market-data.component.html",
  styleUrls: ["./market-data.component.scss"],
})
export class MarketDataComponent {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator | any;
  tableColumn: string[] = ["Open", "High", "Close", "Low", "Symbol"];
  MarketDataArray = new MatTableDataSource<any>([]);
  public totalLength = 0;

  public pageSize = 10;
  public pageIndex = 0;

  page = "0";
  allStocks: any = [];
  selectedStock: any;
  myControl = new FormControl("");
  value = "";
  filteredOptions!: Observable<any[]>;
  stockId: any;
  constructor(
    private dataService: DataService,
    private toast: ToastService,
    private loader: LoaderService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllStocks();
  }
  _filter(value: any): any[] {
    const filterValue = value?.toLowerCase();
    return this.allStocks.filter((option: any) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  getAllStocks() {
    this.dataService
      .getMethod(HttpApi.getAllStock + "?status=ACTIVE")
      .subscribe({
        next: (res) => {
          console.log("🚀 ~ line 189 ~ UsersPage ~ res", res);
          this.allStocks = res;
          this.myControl.patchValue(res[0].name);
          this.stockId = res[0].id;
          this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(""),
            map((value: any) => this._filter(value || ""))
          );
          this.getMarketDatas();
          console.log("selectedStock ", this.selectedStock);
        },
        error: (e) => {
          console.error(e);
          this.toast.showToast({ message: e.message, type: "ERROR" });
        },
        complete: () => console.info("complete"),
      });
  }
  clearClick() {
    this.myControl?.reset();
  }

  onStockClick(item: any) {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value: any) => this._filter(value || ""))
    );
    this.stockId = item.id;
    this.getMarketDatas();
  }
  getMarketDatas(page: string = "1", pageSize = 10) {
    this.loader.show();
    this.pageSize = pageSize;
    this.dataService
      .getMethod(
        HttpApi.getMarketData +
          this.stockId +
          "?page=" +
          page +
          "&sortBy=createdAt:desc&limit=" +
          this.pageSize
      )
      .subscribe({
        next: (res) => {
          console.log(
            "🚀 ~ line 189 ~ UsersPage ~ this.data.getMethod ~ res",
            res
          );
          this.MarketDataArray = new MatTableDataSource<any>(res);
          this.pageSize = res.limit;
          this.pageIndex = res.page - 1;
          this.totalLength = res.totalResults;
          console.log(this.MarketDataArray);
          this.MarketDataArray.paginator = this.paginator;
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
    this.getMarketDatas(event.pageIndex + 1, event.pageSize);
  }
  // ngAfterViewInit() {
  //   this.MarketDataArray.paginator = this.paginator;
  // }
  selectStock(item: any) {
    this.selectedStock = item.id;
    this.getMarketDatas();
  }
  importClick() {
    const dialogRef = this.dialog.open(UploadCsvComponent, {
      data: { isData: "" },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.status == "success") {
        this.getMarketDatas();
      }
    });
  }
}
