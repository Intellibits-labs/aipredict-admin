import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HeaderComponent } from "./header/header.component";
import { MaterialModule } from "../core/material/material.module";
import { UsereditModalComponent } from "./useredit-modal/useredit-modal.component";
import { FormsModule } from "@angular/forms";
import { UploadCsvComponent } from "./upload-csv/upload-csv.component";
import { NodatafoundComponent } from "./nodatafound/nodatafound.component";
import { ImportLoaderComponent } from "./import-loader/import-loader.component";
const component = [
  HeaderComponent,
  UsereditModalComponent,
  UploadCsvComponent,
  NodatafoundComponent,
  ImportLoaderComponent,
];
@NgModule({
  declarations: [...component],
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [...component],
})
export class SharedModule {}
