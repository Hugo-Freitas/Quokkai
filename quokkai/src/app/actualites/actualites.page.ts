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
      let count = 0;
      res.articles.forEach((article) => {
        count++;
        let date = article.Date_.split('/');
        date[1] = this.getMonth(date[1]);
        this.articles.push({
          title: article.titre,
          date: new Date(date[2], date[1], date[0]),
          link: article.Lien,
          content: article.Resume_,
          region: this.region.name,
          id: count,
          image: article.image,  
          source: article.Source_,
        });
      })
    });
  }

  getMonth(month) {
    if (month === 'janvier') return 1;
    if (month === 'fevrier') return 2;
    if (month === 'mars') return 3;
    if (month === 'avril') return 4;
    if (month === 'mai') return 5;
    if (month === 'juin') return 6;
    if (month === 'juillet') return 7;
    if (month === 'aout') return 8;
    if (month === 'septembre') return 9;
    if (month === 'octobre') return 10;
    if (month === 'novembre') return 11;
    if (month === 'decembre') return 12;
    return 0;
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
