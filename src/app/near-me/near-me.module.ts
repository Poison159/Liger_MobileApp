import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonicRatingModule } from 'ionic4-rating';
import { NearMePageRoutingModule } from './near-me-routing.module';

import { NearMePage } from './near-me.page';

@NgModule({
  imports: [
    
    CommonModule,
    FormsModule,
    IonicModule,
    NearMePageRoutingModule
  ],
  declarations: [NearMePage]
})
export class NearMePageModule {}
