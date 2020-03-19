import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcknowledgmentsPageRoutingModule } from './acknowledgments-routing.module';

import { AcknowledgmentsPage } from './acknowledgments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcknowledgmentsPageRoutingModule
  ],
  declarations: [AcknowledgmentsPage]
})
export class AcknowledgmentsPageModule {}
