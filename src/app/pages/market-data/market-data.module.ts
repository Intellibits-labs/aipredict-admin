import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MarketDataRoutingModule } from "./market-data-routing.module";
import { MarketDataComponent } from "./market-data.component";
import { MaterialModule } from "src/app/core/material/material.module";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [MarketDataComponent],
  imports: [
    CommonModule,
    MarketDataRoutingModule,
    MaterialModule,
    SharedModule,
  ],
})
export class MarketDataModule {}
