import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

export interface DialogData {
  isData: string;
  isNumber: number;
  isArrayLength: number;
}

@Component({
  selector: "app-import-loader",
  templateUrl: "./import-loader.component.html",
  styleUrls: ["./import-loader.component.scss"],
})
export class ImportLoaderComponent {
  arrayLength: number = 0;
  constructor(
    public dialogRef: MatDialogRef<ImportLoaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.arrayLength = this.data.isArrayLength;
  }
  ngOnInit(): void {}
  getLoadingBarWidth() {
    return Math.floor(
      ((this.data.isNumber + 1) / this.data.isArrayLength) * 100
    );
  }
}
