import { Injectable } from "@angular/core";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Injectable({
  providedIn: "root",
})
export class LoaderService {
  loading: any;
  constructor(private ngxService: NgxUiLoaderService) {}

  ngOnInit() {}

  show() {
    this.ngxService.start();
  }
  dismiss() {
    console.log("loader dismiss");
    this.ngxService.stop();
  }
}
