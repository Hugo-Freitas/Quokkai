import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  @Input() userInfo: any = { email: '', region: '' };
  isConnected = false;
  displayLoginForm = false;
  displayRegistrationForm = false;

  constructor() {}

  loginChanged(loginResult: boolean) {
    this.isConnected = loginResult;
    this.displayLoginForm = false;
    this.displayRegistrationForm = false;
  }

  registertrationChanged() {
    this.isConnected = false;
    this.displayLoginForm = false;
    this.displayRegistrationForm = false;
  }

  ngOnInit(): void {
    /* Charger les infos du profil */
  }
}
