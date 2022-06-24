import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnexionPage } from './connexion.page';

const routes: Routes = [
  {
    path: '',
    component: ConnexionPage,
  },
  {
    path: '',
    redirectTo: '/connexion',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnexionPageRoutingModule {}
