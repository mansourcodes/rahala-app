import { NgModule } from '@angular/core';
import { AvatarComponent } from './avatar/avatar.component';
import { ClientCardComponent } from './client-card/client-card.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [
    AvatarComponent,
    ClientCardComponent,
  ],
  exports: [
    AvatarComponent,
    ClientCardComponent,
  ]
})
export class ClientComponentsModule { }
