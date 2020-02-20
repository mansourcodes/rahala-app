import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TripsPageRoutingModule } from './trips-routing.module';
import { TripsPage } from './trips.page';
import { ClientComponentsModule } from '../clients/client-detail/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientComponentsModule,
    TripsPageRoutingModule
  ],
  declarations: [TripsPage]
})
export class TripsPageModule { }
