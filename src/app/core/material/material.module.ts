import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDatepickerModule } from "@angular/material/datepicker";

import { MatNativeDateModule, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
//  import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatBadgeModule } from "@angular/material/badge";
import { MatChipsModule } from "@angular/material/chips";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatListModule } from "@angular/material/list";
import { MatDialogModule } from "@angular/material/dialog";
import { MatRippleModule } from "@angular/material/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
const modulesArray = [
  MatButtonModule,
  MatInputModule,
  MatDatepickerModule,
  MatSnackBarModule,
  MatNativeDateModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTableModule,
  MatSelectModule,
  MatListModule,
  MatPaginatorModule,
  MatChipsModule,
  MatGridListModule,
  MatBadgeModule,
  MatDialogModule,
  MatRippleModule,
  MatProgressSpinnerModule,
  MatAutocompleteModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...modulesArray],
  exports: [...modulesArray],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "en-GB" },
    // { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
})
export class MaterialModule {}
