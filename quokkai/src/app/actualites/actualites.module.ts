import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualitesPageRoutingModule } from './actualites-routing.module';

import { ActualitesPage } from './actualites.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualitesPageRoutingModule
  ],
  declarations: [ActualitesPage]
})
export class ActualitesPageModule {}
