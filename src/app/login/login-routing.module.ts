import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogInPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LogInPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
