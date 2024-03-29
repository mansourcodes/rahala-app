import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../../services/common/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'search',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../search/search.module').then(m => m.SearchPageModule),
            canLoad: [AuthGuard]
          }
        ]
      },
      {
        path: 'quicksearchs',
        children: [
          {
            path: '',
            loadChildren: () => import('../quicksearchs/quicksearchs.module').then(m => m.QuicksearchsPageModule),
            canLoad: [AuthGuard]
          }
        ]
      },
      {
        path: 'saved',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../saved/saved.module').then(m => m.SavedPageModule),
            canLoad: [AuthGuard]
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../settings/settings.module').then(m => m.SettingsPageModule),
            canLoad: [AuthGuard]
          }
        ]
      },
      {
        path: 'trips',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../trips/trips.module').then(m => m.TripsPageModule),
            canLoad: [AuthGuard]
          },
        ]
      },
      {
        path: 'clients',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../clients/clients.module').then(m => m.ClientsPageModule),
            canLoad: [AuthGuard]
          },
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/search',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/search',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
