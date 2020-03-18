import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuicksearchsPage } from './quicksearchs.page';

const routes: Routes = [
  {
    path: '',
    component: QuicksearchsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuicksearchsPageRoutingModule {}
