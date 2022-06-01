import { Component, Input, OnInit, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-mdp-oublie',
  templateUrl: './mdp-oublie.page.html',
  styleUrls: ['./mdp-oublie.page.scss'],
})
export class MdpOubliePage implements OnInit, AfterViewChecked {
  @Input() email?: string;
  errorMessage = false;
  validationMessage = false;

  constructor() {}

  ngOnInit() {}

  ngAfterViewChecked() {
    this.errorMessage = false;
    this.validationMessage = false;
  }

  forgottenPassword(): void {
    /* if l'email existe bien */
    if (true) {
      this.validationMessage = true;
      this.errorMessage = false;
    } else {
      /* else message d'erreur */
      this.errorMessage = true;
      this.validationMessage = false;
    }
  }
}
