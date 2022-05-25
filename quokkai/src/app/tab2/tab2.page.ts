import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  region?;

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.getRegion();
  }

  getRegion(): void {
    this.region = this.route.snapshot.paramMap.get('region');
  }
}
