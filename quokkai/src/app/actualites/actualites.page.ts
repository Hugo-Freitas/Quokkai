import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../article';
import { ProfilService } from '../services/profil.service';
import { Region } from '../region';
import { RegionService } from '../region.service';

@Component({
  selector: 'app-actualites',
  templateUrl: './actualites.page.html',
  styleUrls: ['./actualites.page.scss'],
})
export class ActualitesPage implements OnInit {
  regions: Region[] = [];
  region: any = {
    id: '',
    name: '',
  };
  articles: Article[] = [];

  constructor(
    private route: ActivatedRoute,
    private ProfilService: ProfilService,
    private regionService: RegionService
  ) {}

  ngOnInit(): void {
    this.getRegions();
    this.region = this.regions.filter((x) => x.name == this.getRegion())[0];

    this.ProfilService.articles(this.region).subscribe((res) => {
      console.log(res);
      // recup le résultat et tout mettre dans Article[] tant que mood > 50%
    });
  }

  getRegions(): void {
    this.regionService
      .getRegions()
      .subscribe((regions) => (this.regions = regions));
  }

  getRegion(): String {
    return this.route.snapshot.paramMap.get('region');
  }
}
