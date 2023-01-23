import { Injectable } from "@angular/core";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { HotToastService } from "@ngneat/hot-toast";
export interface ToastVar {
  message: string;
  type: "SUCCESS" | "ERROR";
}
@Injectable({
  providedIn: "root",
})
export class ToastService {
  constructor(private toast: HotToastService, private _snackBar: MatSnackBar) {}

  showToast(toastVar: ToastVar) {
    // if (toastVar.type == "SUCCESS") {
    //   this.toast.success(toastVar.message, {
    //     dismissible: false,
    //     duration: 3000,
    //     position: "top-center",
    //     autoClose: false,
    //   });
    // } else if (toastVar.type == "ERROR") {
    //   this.toast.error(toastVar.message, {
    //     dismissible: false,
    //     duration: 3000,
    //     position: "top-center",
    //     autoClose: false,
    //   });
    // }
    if (toastVar.type == "SUCCESS") {
      this._snackBar.open(toastVar.message, "Done", {
        horizontalPosition: "center",
        verticalPosition: "top",
        duration: 3000,
        panelClass: "snackbar-success",
      });
    } else if (toastVar.type == "ERROR") {
      this._snackBar.open(toastVar.message, "Try again!", {
        horizontalPosition: "center",
        verticalPosition: "top",
        duration: 3000,
        panelClass: "snackbar-failed",
      });
    }
  }
}
