import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HolidaysRoutingModule } from "./holidays-routing.module";
import { HolidaysComponent } from "./holidays.component";
import { MaterialModule } from "src/app/core/material/material.module";
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter
} from "@angular/material-moment-adapter";
import { MAT_DATE_LOCALE } from "@angular/material/core";

@NgModule({
  declarations: [HolidaysComponent],
  imports: [CommonModule, HolidaysRoutingModule, MaterialModule],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "en-US" }, // Replace with your locale
    {
      provide: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    }
  ]
})
export class HolidaysModule {}
