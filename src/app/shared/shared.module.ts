import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HeaderComponent } from "./header/header.component";
import { MaterialModule } from "../core/material/material.module";
import { UsereditModalComponent } from "./useredit-modal/useredit-modal.component";
import { FormsModule } from "@angular/forms";
const component = [HeaderComponent, UsereditModalComponent];
@NgModule({
  declarations: [...component],
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [...component],
})
export class SharedModule {}
