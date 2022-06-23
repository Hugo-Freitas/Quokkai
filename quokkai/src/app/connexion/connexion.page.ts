import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {
  @Input() loginInfo: any = { email: '', password: '' };
  errorMessage = false;

  constructor(private router: Router) {}

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

  redirect(route) {
    this.router.navigate([route]);
  }
}
