import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PredictionsRoutingModule } from "./predictions-routing.module";
import { PredictionsComponent } from "./predictions.component";
import { MaterialModule } from "src/app/core/material/material.module";
import { CoreModule } from "src/app/core/core.module";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [PredictionsComponent],
  imports: [
    CommonModule,
    PredictionsRoutingModule,
    MaterialModule,
    CoreModule,
    SharedModule,
  ],
})
export class PredictionsModule {}
