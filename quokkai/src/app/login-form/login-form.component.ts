import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Input() loginInfo: any = { email: '', password: '' };
  @Output() changed = new EventEmitter<boolean>();
  errorMessage = false;

  constructor() {}

  ngOnInit() {}

  login() {
    /* if le login est bon alors on renvoie au profil */
    if (true) {
      this.errorMessage = false;
      this.changed.emit(true);
    }
    /* else message d'erreur */
    else {
      this.errorMessage = true;
    }
  }
}
