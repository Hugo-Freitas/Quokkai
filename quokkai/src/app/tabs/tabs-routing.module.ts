import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'regions',
        loadChildren: () =>
          import('../regions/regions.module').then((m) => m.RegionsPageModule),
      },
      {
        path: 'actualites/:region',
        loadChildren: () =>
          import('../actualites/actualites.module').then(
            (m) => m.ActualitesPageModule
          ),
      },
      {
        path: 'profil',
        loadChildren: () =>
          import('../profil/profil.module').then((m) => m.ProfilPageModule),
      },
      {
        path: '',
        redirectTo: '/quokkai/regions',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/quokkai/regions',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
