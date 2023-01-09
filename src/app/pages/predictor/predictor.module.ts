import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PredictorRoutingModule } from './predictor-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/core/material/material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, PredictorRoutingModule, CoreModule, MaterialModule],
})
export class PredictorModule {}
