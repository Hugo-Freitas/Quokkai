import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfilService } from '../services/profil.service';

@Component({
  selector: 'app-mdp-oublie',
  templateUrl: './mdp-oublie.page.html',
  styleUrls: ['./mdp-oublie.page.scss'],
})
export class MdpOubliePage implements OnInit {
  @Input() email?: string;
  errorMessage = false;
  validationMessage = false;

  constructor(private router: Router, private ProfilService: ProfilService) {}

  ngOnInit() {}

  forgottenPassword(): void {
    const info = {
      email: this.email
    }
    this.ProfilService.mdpOublie(info).subscribe((res) => {
      this.validationMessage = res.status === 204;
      this.errorMessage = res.status === 401;
    });
  }

  redirect(route) {
    this.router.navigate([route]);
  }
}
