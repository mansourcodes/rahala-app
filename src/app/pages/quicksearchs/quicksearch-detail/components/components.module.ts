import { NgModule } from '@angular/core';
import { QuicksearchCardComponent } from './quicksearch-card/quicksearch-card.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [
    QuicksearchCardComponent,
  ],
  exports: [
    QuicksearchCardComponent,
  ]
})
export class QuicksearchComponentsModule { }
