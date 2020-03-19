import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcknowledgmentsPage } from './acknowledgments.page';

const routes: Routes = [
  {
    path: '',
    component: AcknowledgmentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcknowledgmentsPageRoutingModule {}
