import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  RouterModule,
  Routes
} from '@angular/router';
import { AuthGuard } from './services/common/auth.guard';

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
          ),
        canLoad: [AuthGuard]
      },
      {
        path: ':tripId',
        loadChildren: () =>
          import('./pages/trips/trip-detail/trip-detail.module').then(
            m => m.TripDetailPageModule
          ),
        canLoad: [AuthGuard]
      }
    ]
  },
  {
    path: 'slides',
    loadChildren: () => import('./pages/slides/slides.module').then(m => m.SlidesPageModule)
  },  {
    path: 'clients',
    loadChildren: () => import('./pages/clients/clients.module').then( m => m.ClientsPageModule)
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
export class AppRoutingModule { }
