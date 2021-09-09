import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservationModalPageRoutingModule } from './reservation-modal-routing.module';

import { ReservationModalPage } from './reservation-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservationModalPageRoutingModule
  ],
  declarations: [ReservationModalPage]
})
export class ReservationModalPageModule {}
