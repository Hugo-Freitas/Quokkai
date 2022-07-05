import { Component, OnInit, Input } from '@angular/core';
import { Region } from '../region';
import { RegionService } from '../region.service';
import { Router } from '@angular/router';
import { ProfilService } from '../services/profil.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {
  @Input() registrationInfo: any = {
    email: '',
    region: '',
    password: '',
    confirmPassword: '',
  };
  errorMessage = false;
  message = '' ;
  regions: Region[] = [];

  constructor(
    private regionService: RegionService, 
    private router: Router,
    private ProfilService: ProfilService,
    private modalCtrl: ModalController
    ) {}

  ngOnInit() {
    this.getRegions();
  }

  async _openModal(title, content) {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      backdropDismiss: false,
      componentProps: {
        "title": title,
        "content": content,
      },
    });
    modal.onDidDismiss().then(() => {
      this.router.navigate(['/']);
    })
    return await modal.present();
  }

  getRegions(): void {
    this.regionService
      .getRegions()
      .subscribe((regions) => (this.regions = regions));
  }

  redirect(route) {
    this.router.navigate([route]);
  }

  checkEmailFormat(): boolean {
    const email1 = this.registrationInfo.email.split('@');
    const email2 = this.registrationInfo.email.split('.');

    if (
      email1.length <= 1 ||
      email2.length <= 1 ||
      this.registrationInfo.email.includes('..') ||
      this.registrationInfo.email.includes('.@')
    ) {
      this.message = 'Veuillez rentrer une adresse mail valide';
      return true;
    }
    return false;
  }

  checkPasswordFormat(): boolean {
    if (this.registrationInfo.password != this.registrationInfo.confirmPassword) {
      this.message = 'Votre mot de passe ne correspond pas.';
      return true;
    } else {
      if (this.registrationInfo.password.length < 2) {
        this.message = 'Votre mot de passe doit faire minimum 8 caractères';
        return true;
      } else if (!/\d/.test(this.registrationInfo.password)) {
        this.message =
          'Votre mot de passe doit contenir au moins un chiffre.';
        return true;
      }
    }
    return false;
  }

  inscription(): void {

    this.errorMessage =
      this.registrationInfo.email === '' ||
      this.registrationInfo.region === '' ||
      this.registrationInfo.password === '' ||
      this.registrationInfo.confirmPassword === '';

    let count = 0;

    if (this.registrationInfo.email === ''){ count++; }
    if (this.registrationInfo.region === ''){ count++; }
    if (this.registrationInfo.password === ''){ count++; }
    if (this.registrationInfo.confirmPassword === ''){ count++; }

    if (this.errorMessage) {
      if (count > 1) {
        this.message = 'Veuillez remplir tous les champs.';
      } else if (count === 1) {
        if (this.registrationInfo.email === '') { this.message = 'Veuillez rentrer votre email.'; } 
        else if (this.registrationInfo.region === '') { this.message = 'Veuillez rentrer votre region.'; } 
        else if (this.registrationInfo.password === '') { this.message = 'Veuillez créer votre mot de passe.'; } 
        else if (this.registrationInfo.confirmPassword === '') { this.message = 'Veuillez confirmer votre mot de passe.'; }
      }
    } else if (!this.errorMessage) {
        this.errorMessage = this.checkEmailFormat() || this.checkPasswordFormat();
        if (!this.errorMessage) {
          this.ProfilService.inscription(this.registrationInfo).subscribe(
            (res) => {
              if (res.status === 409) {
                this.errorMessage = true;
                this.message = 'Un compte avec cet email existe déjà !';
              } else if (res.status === 200) {
                this.errorMessage = false;
                this.registrationInfo.email = '';
                this.registrationInfo.password = '';
                this.registrationInfo.confirmPassword = '';
                this.registrationInfo.region = '';
                this._openModal(
                  'Inscription effectuée !',
                  'Vous allez être redirigé vers la page de connexion.'
                );
              }
            }
          );
        }
      }
  }
}

