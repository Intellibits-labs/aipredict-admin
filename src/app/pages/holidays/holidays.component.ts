import { Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import * as moment from "moment";
import { HttpApi } from "src/app/core/http/http-api";
import { DataService } from "src/app/core/services/data.service";
import { LoaderService } from "src/app/core/services/loader.service";
import { ToastService } from "src/app/core/services/toast.service";
import {
  MatCalendar,
  MatCalendarCellClassFunction
} from "@angular/material/datepicker";

@Component({
  selector: "app-holidays",
  templateUrl: "./holidays.component.html",
  styleUrls: ["./holidays.component.scss"]
})
export class HolidaysComponent {
  @ViewChild(MatCalendar) calendar: MatCalendar<Date> | undefined;

  @ViewChild(MatPaginator, { read: true }) paginator: MatPaginator | any;
  tableColumn: string[] = ["Name", "Price", "Percentage"];
  usersArray = new MatTableDataSource<any>([]);
  public totalLength = 0;

  public pageSize = 10;
  public pageIndex = 0;
  viewMode = "table";

  page = "0";
  selectedValue: any;
  selectedDates: moment.Moment[] = [];
  minDate: any;

  constructor(
    private dataService: DataService,
    private toast: ToastService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.getHolidays();
  }

  getHolidays(page: string = "1", pageSize = 10) {
    this.loader.show();
    this.pageSize = pageSize;
    this.dataService.getMethod(HttpApi.getHolidays).subscribe({
      next: (res: any) => {
        console.log("🚀 ~ line 189 ~ UsersPage  ~ res", res);

        // this.usersArray = new MatTableDataSource<any>(res.results);
        // this.pageSize = res.limit;
        // this.pageIndex = res.page - 1;
        // this.totalLength = res.totalResults;
        // this.usersArray.paginator = this.paginator;
        console.log(this.totalLength);
        this.selectedDates = res.map((x: any) => {
          return moment(x.date);
        });
        this.calendar?.updateTodaysDate();
        this.loader.dismiss();
      },
      error: (e: any) => {
        console.error(e);
        this.toast.showToast({ message: e.message, type: "ERROR" });
        this.loader.dismiss();
      },
      complete: () => console.info("complete")
    });
  }

  getData(event: any) {
    console.log(event);
    this.getHolidays(event.pageIndex + 1, event.pageSize);
  }
  newHolidays(ev: moment.Moment) {
    const date = moment(ev);
    console.log(
      "🚀 ~ file: holidays.component.ts:91 ~ HolidaysComponent ~ newHolidays ~ date:",
      date
    );
    const day = date.get("date") + "";
    const month = date.get("month") + "";
    const year = date.get("year") + "";
    this.dataService
      .postMethod(HttpApi.toggleHoliday, { day, month, year })
      .subscribe({
        next: (res: any) => {
          console.log(
            "🚀 ~ file: holidays.component.ts:91 ~ HolidaysComponent ~ newHolidays ~ res:",
            res
          );
          this.selectedDates = res.map((x: any) => x.date);
          this.calendar?.updateTodaysDate();
        },
        error: (e: any) => {
          console.error(e);
          this.toast.showToast({ message: e.message, type: "ERROR" });
          this.loader.dismiss();
        },
        complete: () => console.info("complete")
      });
  }
  ngAfterViewInit() {
    this.usersArray.paginator = this.paginator;
  }
  changeView(view: string) {
    this.viewMode = view;
  }
  onSelect(event: moment.Moment) {
    this.minDate = "2019-06-24T18:30:00.000Z";
    console.log(
      "🚀 ~ file: holidays.component.ts:93 ~ HolidaysComponent ~ onSelect ~ event:",
      event
    );
    // Add selected date to array

    this.newHolidays(event);
    // setTimeout(() => {
    //   this.minDate = null; // Set null to remove the date restriction
    // }, 0);
  }
  dateClass(): MatCalendarCellClassFunction<any> {
    return (date: Date) => {
      const selectedDate = this.selectedDates.find((d) =>
        moment(d).isSame(date, "day")
      );

      return selectedDate ? "selected-date" : "";
    };
  }
}
