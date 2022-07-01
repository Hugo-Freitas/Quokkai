import { Component, OnInit, Input } from '@angular/core';
import { Region } from '../region';
import { RegionService } from '../region.service';
import { Router } from '@angular/router';
import { ProfilService } from '../services/profil.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor(
    private regionService: RegionService, 
    private router: Router,
    private ProfilService: ProfilService
    ) {}

  ngOnInit() {
    this.getRegions();
  }

  getRegions(): void {
    this.regionService
      .getRegions()
      .subscribe((regions) => (this.regions = regions));
  }


  redirect(route) {
    this.router.navigate([route]);
  }

  inscription(): void {
    if ((this.registrationInfo.email != '') && 
    (this.registrationInfo.region != '') && 
    (this.registrationInfo.password != '') && 
    (this.registrationInfo.confirmPassword != '')){
      if (this.registrationInfo.password == this.registrationInfo.confirmPassword){

        this.ProfilService.inscription(this.registrationInfo).subscribe((res)=>{
          console.log(res,'res==>');
        })

        this.router.navigate(['']);

      } else {
        this.errorMessage = true ;
      }
    }
    else {
      this.errorMessage = true ;
    }
  }

}
