import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfilPageRoutingModule } from './profil-routing.module';

import { ProfilPage } from './profil.page';
import { LoginFormComponent } from '../login-form/login-form.component';
import { RegistrationFormComponent } from '../registration-form/registration-form.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ProfilPageRoutingModule],
  declarations: [ProfilPage, LoginFormComponent, RegistrationFormComponent],
})
export class ProfilPageModule {}
