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

  constructor(
    private router: Router,
    private ProfilService: ProfilService
    ) {}

  ngOnInit() {}

  login() {
    /* if le login est bon */
    if (true) {
      this.errorMessage = false;
      /* recup la region par defaut de l'utilisateur */
      this.router.navigate(['/quokkai/actualites/Bretagne']);
    } else {
      /* else message d'erreur */
      this.errorMessage = true;
    }
  }

  test(): void {
    // this.ProfilService.testing();
  }

  redirect(route) {
    this.router.navigate([route]);
  }
}
