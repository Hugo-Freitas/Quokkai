import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActualitesPage } from './actualites.page';

const routes: Routes = [
  {
    path: '',
    component: ActualitesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActualitesPageRoutingModule {}
