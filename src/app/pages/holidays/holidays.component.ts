import { Component, EventEmitter, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";

import * as moment from "moment";
import { Moment } from "moment";
export const MY_FORMATS = {
  parse: {
    dateInput: "MM/YYYY",
  },
  display: {
    dateInput: "MM/YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};
@Component({
  selector: "app-holidays",
  templateUrl: "./holidays.component.html",
  styleUrls: ["./holidays.component.scss"],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class HolidaysComponent implements OnInit {
  date = new FormControl(moment());
  constructor() {}
  ngOnInit(): void {}
}
