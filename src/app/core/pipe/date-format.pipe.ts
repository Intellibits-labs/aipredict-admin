import { Pipe, PipeTransform } from "@angular/core";
import { DatePipe } from "@angular/common";

@Pipe({
  name: "customDateFormat"
})
export class CustomDateFormatPipe implements PipeTransform {
  transform(value: any, format?: string): any {
    const datePipe = new DatePipe("en-US");
    const transformedDate = datePipe.transform(value, "dd MMM yyyy");
    return transformedDate;
  }
}
