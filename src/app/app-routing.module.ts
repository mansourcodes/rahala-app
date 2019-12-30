import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  RouterModule,
  Routes
} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'trips',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/trips/trips.module').then(
            m => m.TripsPageModule
          )
      },
      {
        path: ':tripId',
        loadChildren: () =>
          import('./pages/trips/trip-detail/trip-detail.module').then(
            m => m.TripDetailPageModule
          )
      }
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
