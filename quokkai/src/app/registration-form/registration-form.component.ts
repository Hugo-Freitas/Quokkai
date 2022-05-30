import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Region } from '../region';
import { RegionService } from '../region.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  @Input() registrationInfo: any = { email: '', region: '', password: '' };
  @Output() changed = new EventEmitter<boolean>();
  errorMessage = false;
  regions: Region[] = [];

  constructor(private regionService: RegionService) {}

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
      this.changed.emit();
    } else {
    /* else message d'erreur */
      this.errorMessage = true;
    }
  }
}
