import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PagesRoutingModule } from "./pages-routing.module";
import { LogoutDialog, PagesComponent } from "./pages.component";
import { UsersComponent } from "./users/users.component";
import { MaterialModule } from "../core/material/material.module";
import { SharedModule } from "../shared/shared.module";
import { PredictorComponent } from "./predictor/predictor.component";

@NgModule({
  declarations: [
    PagesComponent,
    UsersComponent,
    LogoutDialog,
    PredictorComponent,
  ],
  imports: [CommonModule, PagesRoutingModule, MaterialModule, SharedModule],
})
export class PagesModule {}
