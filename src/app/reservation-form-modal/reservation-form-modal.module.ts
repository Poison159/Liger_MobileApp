import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservationFormModalPageRoutingModule } from './reservation-form-modal-routing.module';

import { ReservationFormModalPage } from './reservation-form-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservationFormModalPageRoutingModule
  ],
  declarations: [ReservationFormModalPage]
})
export class ReservationFormModalPageModule {}
