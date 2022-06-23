import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  @Input() userInfo: any = { email: '', region: '' };

  constructor(private router: Router) {}

  disconnect() {
    /* déconnecter l'utilisateur */
      this.router.navigate(['']);
  }

  ngOnInit(): void {
    /* Charger les infos du profil */
    /* Verif si le gars est bien co */
  }
}
