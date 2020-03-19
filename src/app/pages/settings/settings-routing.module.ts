import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPage } from './settings.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage
  },  {
    path: 'general-settings',
    loadChildren: () => import('./general-settings/general-settings.module').then( m => m.GeneralSettingsPageModule)
  },
  {
    path: 'acknowledgments',
    loadChildren: () => import('./acknowledgments/acknowledgments.module').then( m => m.AcknowledgmentsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {}
