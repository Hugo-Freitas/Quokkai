import { Component, OnInit } from '@angular/core';
import { Region } from '../region';
import { RegionService } from '../region.service';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.page.html',
  styleUrls: ['./regions.page.scss'],
})
export class RegionsPage implements OnInit {
  regions: Region[] = [];

  constructor(private regionService: RegionService) {}

  ngOnInit(): void {
    this.getRegions();
  }

  getRegions(): void {
    this.regionService
      .getRegions()
      .subscribe((regions) => (this.regions = regions));
  }
}
