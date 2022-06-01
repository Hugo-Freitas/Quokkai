import { Component, OnInit, Input, Output, EventEmitter, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit, AfterViewChecked {
  @Input() loginInfo: any = { email: '', password: '' };
  @Output() changed = new EventEmitter<boolean>();
  errorMessage = false;

  constructor() {}

  ngOnInit() {}

  ngAfterViewChecked() {
    this.errorMessage = false;
  }

  login() {
    /* if le login est bon alors on renvoie au profil */
    if (true) {
      this.errorMessage = false;
      this.changed.emit(true);
    } else {
    /* else message d'erreur */
      this.errorMessage = true;
    }
  }
}
