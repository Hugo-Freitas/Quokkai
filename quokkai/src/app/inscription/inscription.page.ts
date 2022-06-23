import { Component, OnInit, Input } from '@angular/core';
import { Region } from '../region';
import { RegionService } from '../region.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {
  @Input() registrationInfo: any = {
    email: '',
    region: '',
    password: '',
    confirmPassword: '',
  };
  errorMessage = false;
  regions: Region[] = [];

  constructor(private regionService: RegionService, private router: Router) {}

  ngOnInit() {
    this.getRegions();
  }

  getRegions(): void {
    this.regionService
      .getRegions()
      .subscribe((regions) => (this.regions = regions));
  }

  register() {
    /* if le login est bon alors on renvoie au profil */
    if (true) {
      this.errorMessage = false;
      this.router.navigate(['']);
    } else {
      /* else message d'erreur */
      this.errorMessage = true;
    }
  }

  redirect(route) {
    this.router.navigate([route]);
  }
}
