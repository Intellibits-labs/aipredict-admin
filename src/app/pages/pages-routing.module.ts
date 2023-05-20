import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from "./pages.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "",
        redirectTo: "users",
        pathMatch: "full",
      },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      {
        path: "users",
        loadChildren: () =>
          import("./users/users.module").then((m) => m.UsersModule),
      },
      {
        path: "predictor",
        loadChildren: () =>
          import("./predictor/predictor.module").then((m) => m.PredictorModule),
      },
      {
        path: "stocks",
        loadChildren: () =>
          import("./stocks/stocks.module").then((m) => m.StocksModule),
      },
      {
        path: "predictions",
        loadChildren: () =>
          import("./predictions/predictions.module").then(
            (m) => m.PredictionsModule
          ),
      },
      {
        path: "holidays",
        loadChildren: () =>
          import("./holidays/holidays.module").then((m) => m.HolidaysModule),
      },
      {
        path: "market-data",
        loadChildren: () =>
          import("./market-data/market-data.module").then(
            (m) => m.MarketDataModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
