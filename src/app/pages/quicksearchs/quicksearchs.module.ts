import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuicksearchsPageRoutingModule } from './quicksearchs-routing.module';

import { QuicksearchsPage } from './quicksearchs.page';

import { QuicksearchComponentsModule } from '../quicksearchs/quicksearch-detail/components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuicksearchsPageRoutingModule,
    QuicksearchComponentsModule
  ],
  declarations: [QuicksearchsPage]
})
export class QuicksearchsPageModule { }
