import { Component } from "@angular/core";
import { NgxCSVParserError, NgxCsvParser } from "ngx-csv-parser";
import { HttpApi } from "src/app/core/http/http-api";
import { CsvService } from "src/app/core/services/csv.service";
import { DataService } from "src/app/core/services/data.service";
import * as moment from "moment";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Logged } from "src/app/core/guard/logged.guard";
import { LoaderService } from "src/app/core/services/loader.service";
import { ImportLoaderComponent } from "../import-loader/import-loader.component";
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
@Component({
  selector: "app-upload-csv",
  templateUrl: "./upload-csv.component.html",
  styleUrls: ["./upload-csv.component.scss"],
})
export class UploadCsvComponent {
  maxDate = new Date();
  csvFileName: any;
  header: boolean = true;
  csvRecords: any = [];
  selectDate: any;
  varData: any;
  constructor(
    private csvService: CsvService,
    private ngxCsvParser: NgxCsvParser,
    private dataService: DataService,
    public dialogRef: MatDialogRef<UploadCsvComponent>,
    private loader: LoaderService,
    public dialog: MatDialog
  ) {}
  inputClick(file: HTMLElement) {
    console.log(file.click());
  }
  fileChangeListener($event: any): void {
    const files = $event.srcElement.files;

    this.csvFileName = files[0].name;
    this.header =
      (this.header as unknown as string) === "true" || this.header === true;

    this.ngxCsvParser
      .parse(files[0], {
        header: this.header,
        delimiter: ",",
        encoding: "utf8",
      })
      .pipe()
      .subscribe(
        (result: any) => {
          console.log("Result", result);
          this.csvRecords = result.map((data: any) => {
            return {
              open: data.OPEN,
              high: data.HIGH,
              close: data.CLOSE,
              low: data.LOW,
              symbol: data.SYMBOL,
            };
          });
          console.log(this.csvRecords);
        },
        (error: NgxCSVParserError) => {
          console.log("Error", error);
        }
      );
  }
  async saveClick() {
    const chunkSize = 100;
    const numChunks = Math.ceil(this.csvRecords.length / chunkSize);
    console.log(numChunks);
    const resultArray: any[][] = [];
    for (let i = 0; i < numChunks; i++) {
      const start = i * chunkSize;
      const end = start + chunkSize;
      const chunk = this.csvRecords.slice(start, end);
      resultArray.push(chunk);
    }

    let dialogRef: any;

    for (let i = 0; i < resultArray.length; i++) {
      let obj = {
        date: moment(this.selectDate).format("YYYY-MM-DD"),
        data: resultArray[i],
      };
      this.varData = { isNumber: i, isArrayLength: resultArray.length };
      if (i == 0) {
        dialogRef = this.dialog.open(ImportLoaderComponent, {
          data: this.varData,
        });
      }
      await delay(1000);
      dialogRef.componentInstance.data.isNumber = i;
      this.dataService.postMethod(HttpApi.postCsvFile, obj).subscribe(
        (res) => {
          console.log(res);
          this.dialogRef.close("failed");
          if (i == resultArray.length - 1) {
            dialogRef.close("success");
            dialogRef.afterClosed().subscribe((result: any) => {
              if (result == "success") {
                this.dialogRef.close(res);
              }
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  importLoader() {}
  close() {
    this.dialogRef.close();
  }
  removeFileName() {
    this.csvFileName = "";
  }
}
