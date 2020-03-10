import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientDetailPageRoutingModule } from './client-detail-routing.module';

import { ClientDetailPage } from './client-detail.page';
import { ClientComponentsModule } from './components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientDetailPageRoutingModule,
    ClientComponentsModule
  ],
  declarations: [ClientDetailPage]
})
export class ClientDetailPageModule { }
