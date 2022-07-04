import { Component, OnInit, Input } from '@angular/core';
import { Region } from '../region';
import { RegionService } from '../region.service';
import { Router } from '@angular/router';
import { ProfilService } from '../services/profil.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    private ProfilService: ProfilService
    ) {}

  ngOnInit() {
    this.getRegions();
  }

  getRegions(): void {
    this.regionService
      .getRegions()
      .subscribe((regions) => (this.regions = regions));
  }


  redirect(route) {
    this.router.navigate([route]);
  }

  inscription(): void {

    let mail = false
    let region = false
    let pwd = false
    let pwdconf = false

    if (this.registrationInfo.email == ''){ mail = true }
    if (this.registrationInfo.region == ''){ region = true }
    if (this.registrationInfo.password == ''){ pwd = true }
    if (this.registrationInfo.confirmPassword == ''){ pwdconf = true }

    let count = 0

    if (mail==true){count++}
    if (region==true){count++}
    if (pwd==true){count++}
    if (pwdconf==true){count++}

    if (count > 1){this.message = 'Veuillez remplir tous les champs.'; this.errorMessage = true ;}

    if (count == 1){
      if (mail == false){ this.message = 'Veuillez rentrer votre email.'; this.errorMessage = true ;}
      if (region == false){ this.message = 'Veuillez rentrer votre region.'; this.errorMessage = true ;}
      if (pwd == false){ this.message = 'Veuillez créer votre mot de passe.'; this.errorMessage = true ;}
      if (pwdconf == false){ this.message = 'Veuillez confirmer votre mot de passe.'; this.errorMessage = true ;}
    }

    if (count == 0){
      let valid = true ;
      let email = this.registrationInfo.email
      let email1 = email.split('@') ;
      let email2 = email.split('.') ;
      
      if ((email1.length <= 1) || (email2.length <= 1)){
        valid = false ;
      }

      if ((email.includes('..')) || (email.includes('.@'))){
        valid = false
      }

      if (valid==false){ this.message = 'Veuillez rentrer une adresse mail valide'; this.errorMessage = true ;}
      else {
        let password = this.registrationInfo.password
        if (password != this.registrationInfo.confirmPassword){
          this.message = 'Votre mot de passe ne correspond pas.'; 
          this.errorMessage = true ;
        } else {
          if (password.length < 2){this.message = 'Votre mot de passe doit faire minimum 8 caractères'; this.errorMessage = true ;}
          else if (!/\d/.test(password)){this.message = 'Votre mot de passe doit contenir au moins un chiffre.'; this.errorMessage = true ;}
          else {
            this.ProfilService.inscription(this.registrationInfo).subscribe((res)=>{
              if (res.status == 409) {
                this.errorMessage = true;
                this.message = 'Un compte avec cet email existe déjà !';
              } else if (res.status == 200) {
                this.errorMessage = false;
                this.registrationInfo.email = '';
                this.registrationInfo.password = '';
                this.registrationInfo.confirmPassword = '';
                this.registrationInfo.region = '';
                alert("Inscription effectuée ! Vous allez être redirigé vers la page de connexion. (à changer en pop up)")
                this.router.navigate(['/']);
              }
            })
          }
        }
      }
    }
  }
}

