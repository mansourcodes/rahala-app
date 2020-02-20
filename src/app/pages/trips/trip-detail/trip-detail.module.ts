import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TripDetailPageRoutingModule } from './trip-detail-routing.module';
import { TripDetailPage } from './trip-detail.page';
import { OptionCardComponent } from './option-card/option-card.component';
import { ClientComponentsModule } from '../../clients/client-detail/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientComponentsModule,
    TripDetailPageRoutingModule
  ],
  declarations: [TripDetailPage, OptionCardComponent]
})
export class TripDetailPageModule { }
