import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MdpOubliePageRoutingModule } from './mdp-oublie-routing.module';

import { MdpOubliePage } from './mdp-oublie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MdpOubliePageRoutingModule
  ],
  declarations: [MdpOubliePage]
})
export class MdpOubliePageModule {}
