import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';

import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ShareComponentsModule } from 'src/app/share/share.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    SearchPageRoutingModule,
    NgbAlertModule,
    ShareComponentsModule,
  ],
  declarations: [SearchPage]
})
export class SearchPageModule { }
