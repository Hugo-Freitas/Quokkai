import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mdp-oublie',
  templateUrl: './mdp-oublie.page.html',
  styleUrls: ['./mdp-oublie.page.scss'],
})
export class MdpOubliePage implements OnInit {
  @Input() email?: string;
  errorMessage = false;
  validationMessage = false;

  constructor(private router: Router) {}

  ngOnInit() {}

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

  redirect(route) {
    this.router.navigate([route]);
  }
}
