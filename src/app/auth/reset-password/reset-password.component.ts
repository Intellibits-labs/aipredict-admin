import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpApi } from 'src/app/core/http/http-api';
import { MustMatch } from 'src/app/core/password-match';
import { DataService } from 'src/app/core/services/data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  passwordForm: FormGroup = new FormGroup({});
  submitted = false;
  Id: any;
  token: any;
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toast: ToastService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.passwordForm = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  ngOnInit(): void {
    this.Id = this.activateRoute.snapshot.queryParams['Id'];
    this.token = this.activateRoute.snapshot.queryParams['token'];
  }
  get getpassword() {
    return this.passwordForm.get('password');
  }
  get f() {
    return this.passwordForm.controls;
  }
  loginPage() {
    this.router.navigate(['/auth/login']);
  }
  Send() {
    if (this.passwordForm.valid) {
      this.dataService
        .postMethod(HttpApi.resetPassword + '?token=' + this.token, {
          password: this.passwordForm.value.confirmPassword,
        })
        .subscribe(
          (res: any) => {
            console.log('res ', res);
            this.router.navigate(['/'], {});
          },
          (error: any) => {
            console.log('error ', error);
          }
        );
    }
  }
}
