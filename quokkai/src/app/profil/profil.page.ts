import { Component, OnInit, Input } from '@angular/core';
import { ProfilService } from '../services/profil.service';

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

  constructor(private service: ProfilService) {}

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

  test(): void {
    console.log("test")
    this.service.article()/*.subscribe((response) => {
      console.log('Response from the API is ', response)
    }, (error) => {
      console.log("Error is ", error);
    })*/
  }
}
