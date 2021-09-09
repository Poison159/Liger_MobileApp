import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogModPage } from './log-mod.page';

const routes: Routes = [
  {
    path: '',
    component: LogModPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogModPageRoutingModule {}
