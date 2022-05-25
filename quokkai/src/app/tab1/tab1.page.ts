import { Component, OnInit } from '@angular/core';
import { Region } from '../region';
import { RegionService } from '../region.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
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
