import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HolidaysRoutingModule } from "./holidays-routing.module";
import { HolidaysComponent } from "./holidays.component";
import { MaterialModule } from "src/app/core/material/material.module";
import { CoreModule } from "src/app/core/core.module";

@NgModule({
  declarations: [HolidaysComponent],
  imports: [CommonModule, HolidaysRoutingModule, MaterialModule, CoreModule],
})
export class HolidaysModule {}
