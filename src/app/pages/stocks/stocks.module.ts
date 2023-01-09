import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StocksRoutingModule } from './stocks-routing.module';
import { StocksComponent } from './stocks.component';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/core/material/material.module';
import { StockperPipe } from 'src/app/core/pipe/stockper.pipe';

@NgModule({
  declarations: [StocksComponent, StockperPipe],
  imports: [CommonModule, StocksRoutingModule, MaterialModule],
})
export class StocksModule {}
