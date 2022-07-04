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
        this.articles.push({
          title: article.titre,
          date: new Date(date[2], date[1], date[0]),
          link: article.lien,
          content: article.Resume_,
          region: this.region.name,
          id: count,
          image: article.image,
          source: article.Source_,
        });
      })
      this.articles.sort((article1, article2) => {
        return article2.date.getTime() - article1.date.getTime();
      })
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
