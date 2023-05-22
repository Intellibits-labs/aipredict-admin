import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ActiveStocksRoutingModule } from "./active-stocks-routing.module";
import { ActiveStocksComponent } from "./active-stocks.component";
import { MaterialModule } from "src/app/core/material/material.module";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [ActiveStocksComponent],
  imports: [
    CommonModule,
    ActiveStocksRoutingModule,
    MaterialModule,
    SharedModule,
  ],
})
export class ActiveStocksModule {}
