import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PredictorComponent } from './predictor.component';

const routes: Routes = [
  {
    path: '',
    component: PredictorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PredictorRoutingModule {}
