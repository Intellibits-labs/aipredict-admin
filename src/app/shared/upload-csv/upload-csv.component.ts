import { Component } from "@angular/core";
import { NgxCSVParserError, NgxCsvParser } from "ngx-csv-parser";
import { HttpApi } from "src/app/core/http/http-api";
import { CsvService } from "src/app/core/services/csv.service";
import { DataService } from "src/app/core/services/data.service";
import * as moment from "moment";
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
  constructor(
    private csvService: CsvService,
    private ngxCsvParser: NgxCsvParser,
    private dataService: DataService
  ) {}
  inputClick(file: HTMLElement) {
    console.log(file.click());
  }
  fileChangeListener($event: any): void {
    const files = $event.srcElement.files;

    // let reader: FileReader = new FileReader();
    // reader.readAsText(file);
    // reader.onload = (e) => {
    //   let csv: string = reader.result as string;
    //   console.log("csv ", JSON.stringify(csv));
    // };

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
  saveClick() {
    const chunkSize = 100;
    const numChunks = Math.ceil(this.csvRecords.length / chunkSize);

    const resultArray: any[][] = [];
    for (let i = 0; i < numChunks; i++) {
      const start = i * chunkSize;
      const end = start + chunkSize;
      const chunk = this.csvRecords.slice(start, end);
      resultArray.push(chunk);
    }
    for (let i = 0; i < resultArray.length; i++) {
      let obj = {
        date: moment(this.selectDate).format("YYYY-MM"),
        data: resultArray[i],
      };
      this.dataService.postMethod(HttpApi.postCsvFile, obj).subscribe(
        (res) => {
          console.log(res);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
