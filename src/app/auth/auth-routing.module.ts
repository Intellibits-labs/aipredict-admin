import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('./login/login.module').then((x) => x.LoginModule),
      },
      {
        path: 'forget',
        loadChildren: () =>
          import('./forget/forget.module').then((x) => x.ForgetModule),
      },
      {
        path: 'password',
        loadChildren: () =>
          import('./reset-password/reset-password.module').then(
            (x) => x.ResetPasswordModule
          ),
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
