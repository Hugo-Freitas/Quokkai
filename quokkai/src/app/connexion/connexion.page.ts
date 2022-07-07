import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProfilService } from '../services/profil.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {
  @Input() loginInfo: any = { email: '', password: '' };
  errorMessage = false;
  message: string = '';

  constructor(
    private router: Router,
    private ProfilService: ProfilService
    ) {}

  ngOnInit() {}

  login() {
    
    this.errorMessage = this.loginInfo.email === '' || this.loginInfo.password === '';

    if (!this.errorMessage) {
      this.ProfilService.connexion(this.loginInfo).subscribe((res) => {
        if (res.status === 404) {
          this.message = 'Données incorrectes.';
          this.errorMessage = true;
        } else if (res.status === 200) {
          this.loginInfo.email = '';
          this.loginInfo.password = '';
          this.errorMessage = false;
          this.router.navigate(['/quokkai/actualites/' + res.region]);
        }
      });
    } else {
      if (this.loginInfo.email === '' && this.loginInfo.password !== '') {
        this.message = 'Veuillez entrer un email.';
      } else if (this.loginInfo.email !== '' && this.loginInfo.password === '') {
        this.message = 'Veuillez entrer un mot de passe.';
      } else if (this.loginInfo.email === '' && this.loginInfo.password === '') {
        this.message = 'Veuillez remplir les champs.';
      } else {
      }
    }
  }

  redirect(route) {
    this.router.navigate([route]);
  }
}
