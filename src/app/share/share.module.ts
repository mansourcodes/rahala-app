import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RangeDatePickerComponent } from './range-date-picker/range-date-picker.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        NgbDatepickerModule,
    ],
    declarations: [
        RangeDatePickerComponent,
    ],
    exports: [
        RangeDatePickerComponent,
    ]
})
export class ShareComponentsModule { }
