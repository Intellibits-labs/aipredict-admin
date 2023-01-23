import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppInterceptor } from "./core/http/http.interceptor";
import { Oauth2Interceptor } from "./core/http/oauth2.interceptor";
import { HotToastModule } from "@ngneat/hot-toast";
import { MenuServiceService } from "./core/services/menu-service.service";
import { NgxUiLoaderConfig, NgxUiLoaderModule } from "ngx-ui-loader";
import { MAT_CHIPS_DEFAULT_OPTIONS } from "@angular/material/chips";
import { MaterialModule } from "./core/material/material.module";
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "red",
  bgsOpacity: 0.5,
  bgsPosition: "bottom-right",
  bgsSize: 60,
  bgsType: "ball-scale-multiple",
  blur: 5,
  delay: 0,
  fastFadeOut: true,
  fgsColor: "#5a8eff",
  fgsPosition: "center-center",
  fgsSize: 60,
  fgsType: "ball-scale-multiple",
  gap: 24,
  logoPosition: "center-center",
  logoSize: 120,
  logoUrl: "",
  masterLoaderId: "master",
  overlayBorderRadius: "0",
  overlayColor: "rgba(40,40,40,0.3)",
  pbColor: "#5a8eff",
  pbDirection: "ltr",
  pbThickness: 3,
  hasProgressBar: true,
  text: "",
  textColor: "#FFFFFF",
  textPosition: "center-center",
  maxTime: -1,
  minTime: 300,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    HotToastModule.forRoot(),
  ],
  providers: [
    MenuServiceService,
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: Oauth2Interceptor, multi: true },
    {
      provide: MAT_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        separatorKeyCodes: [],
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
