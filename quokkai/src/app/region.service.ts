import { Injectable } from '@angular/core';
import { Region } from './region';
import { REGIONS } from './mock-regions';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  constructor() {}

  getRegions(): Observable<Region[]> {
    const regions = of(REGIONS);
    return regions;
  }
}
