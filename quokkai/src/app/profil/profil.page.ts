import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  @Input() userInfo: any = { email: 'cloclo@quokkai.fr', region: 'Bretagne' };

  constructor(private router: Router) {}

  disconnect() {
      this.router.navigate(['']);
  }

  ngOnInit(): void {
  }
}
