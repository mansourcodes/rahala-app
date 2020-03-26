import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuicksearchsPageRoutingModule } from './quicksearchs-routing.module';

import { QuicksearchsPage } from './quicksearchs.page';

import { QuicksearchCardComponent } from './quicksearch-detail/components/quicksearch-card/quicksearch-card.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuicksearchsPageRoutingModule,
  ],
  declarations: [QuicksearchsPage, QuicksearchCardComponent]
})
export class QuicksearchsPageModule { }
