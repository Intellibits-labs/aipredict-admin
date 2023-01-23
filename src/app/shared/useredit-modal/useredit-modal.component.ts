import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-useredit-modal",
  templateUrl: "./useredit-modal.component.html",
  styleUrls: ["./useredit-modal.component.scss"],
})
export class UsereditModalComponent {
  userName: any;
  constructor(
    public dialogRef: MatDialogRef<UsereditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    console.log(this.data.isData);
    this.userName = this.data?.isData?.name;
  }

  cancelClick() {
    this.dialogRef.close();
  }
}
