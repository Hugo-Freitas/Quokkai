import { Component, OnInit, Input } from '@angular/core';
import { ProfilService } from '../services/profil.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  @Input() userInfo: any = { email: 'cloclo@quokkai.fr', region: 'Bretagne' };


  constructor(private service: ProfilService, private router: Router) {}


  disconnect() {
    /* déconnecter l'utilisateur */
      this.router.navigate(['']);
  }

  ngOnInit(): void {
    /* Charger les infos du profil */
    /* Verif si le gars est bien co */
  }
}
