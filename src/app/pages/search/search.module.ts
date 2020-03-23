import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
} from '@angular/material';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter'

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';

import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    SearchPageRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatInputModule,
    NgbAlertModule,
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ],
  declarations: [SearchPage]
})
export class SearchPageModule { }
