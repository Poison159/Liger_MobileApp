import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogModPageRoutingModule } from './log-mod-routing.module';

import { LogModPage } from './log-mod.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogModPageRoutingModule
  ],
  declarations: [LogModPage]
})
export class LogModPageModule {}
