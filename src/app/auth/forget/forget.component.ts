import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { NgOtpInputComponent } from 'ng-otp-input';
import { HttpApi } from 'src/app/core/http/http-api';
import { DataService } from 'src/app/core/services/data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss'],
})
export class ForgetComponent implements OnInit {
  @ViewChild(NgOtpInputComponent, { static: false })
  ngOtpInput!: NgOtpInputComponent;

  otpValue: any;
  ConfigOption: any = {
    length: 6,
    allowNumbersOnly: false,
    disableAutoFocus: false,
    inputClass: 'otpInput',
    inputStyles: {
      width: '35px',
      height: '35px',
      background: 'white',
      color: '#5C6574',
      'margin-bottom': '145px',
      'font-size': '20px',
      'margin-top': '20px',
    },
  };
  submitOtp: any;
  public forgetForm: FormGroup = new FormGroup({});
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toast: ToastService,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {
    this.forgetForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
    });
  }

  ngOnInit(): void {}
  get getemail() {
    return this.forgetForm.get('email');
  }
  onOtpChange(ev: any) {
    if (ev.length == 6) {
      this.submitOtp = ev;
      console.log('second 2 ', ev);
    }
  }
  Send() {
    if (this.forgetForm.valid) {
      this.dataService
        .postMethod(HttpApi.forgetPassword, this.forgetForm.value)
        .subscribe(
          (res: any) => {
            console.log('res ', res);
            if (res.status == 'success') {
              this.otpValue = res.otp;

              console.log(res.otp);

              console.log(
                '🚀 ~ 73 ~ ForgetComponent ~ Send ~   this.ngOtpInput',
                this.ngOtpInput
              );
              this.changeDetector.detectChanges();

              this.ngOtpInput?.setValue(res?.otp);
            }
          },
          (error: any) => {
            console.log('error ', error);
            this.toast.showToast(error.message);
          }
        );
    }
  }

  submit() {
    this.dataService
      .postMethod(HttpApi.verifyotp, {
        email: this.forgetForm.value.email,
        otp: this.submitOtp,
      })
      .subscribe(
        (res: any) => {
          console.log('res ', res);
          this.router.navigate(['/auth/password'], {
            queryParams: {
              Id: res.id,
              token: res.resetPasswordToken,
            },
          });
        },
        (error: any) => {
          console.log('error ', error);
          this.toast.showToast(error.message);
        }
      );
  }

  loginPage() {
    this.router.navigate(['/auth/login']);
  }
  back() {
    this.otpValue = '';
  }
}
