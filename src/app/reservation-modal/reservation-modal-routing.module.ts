import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservationModalPage } from './reservation-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ReservationModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationModalPageRoutingModule {}
