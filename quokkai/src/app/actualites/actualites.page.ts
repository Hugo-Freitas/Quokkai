import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-actualites',
  templateUrl: './actualites.page.html',
  styleUrls: ['./actualites.page.scss'],
})
export class ActualitesPage implements OnInit {
  region?;

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.getRegion();
  }

  getRegion(): void {
    this.region = this.route.snapshot.paramMap.get('region');
  }
}
