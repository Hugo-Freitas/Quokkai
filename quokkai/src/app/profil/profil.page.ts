import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  @Input() userInfo: any = { email: 'hugofreitascostinha@hotmail.com', region: 'Île-de-France' };

  constructor(private router: Router) {}

  disconnect() {
      this.router.navigate(['']);
  }

  ngOnInit(): void {
  }
}
