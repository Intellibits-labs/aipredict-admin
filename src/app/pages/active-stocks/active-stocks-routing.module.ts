import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ActiveStocksComponent } from "./active-stocks.component";

const routes: Routes = [
  {
    path: "",
    component: ActiveStocksComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActiveStocksRoutingModule {}
