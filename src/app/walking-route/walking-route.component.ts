/// <reference types="@types/googlemaps" />

import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DogsRouteService} from '../dogs-route.service';
import {WalkingRoute} from '../models/walkingRoute';
import {Location} from '@angular/common';

@Component({
  selector: 'app-walking-route',
  templateUrl: './walking-route.component.html',
  styleUrls: ['./walking-route.component.css']
})
export class WalkingRouteComponent implements OnInit {
  @Input() animalRoute;
  map: google.maps.Map;
  animalWalkCoords = [];
  snacks = 0;
  lastAltitude = 0;
  momentum = 0;
  loading = false;

  constructor(private route: ActivatedRoute, private routeService: DogsRouteService, private location: Location) {
  }

  ngOnInit() {
    this.loading = true;
    this.getRouteData();
    this.getMapCoords();
  }

  getRouteData(): void {
    this.route.paramMap.subscribe(params => {
      this.animalRoute = params.get('routeId');
    });
  }

  getMapCoords(): void {
    this.routeService.getRoute(this.animalRoute).subscribe((res: WalkingRoute) => {
      res.locations.forEach((entry, index) => {
        this.animalWalkCoords.push({lat: entry.latitude, lng: entry.longitude});
        this.calculateSnacks(entry, index);
      });
      this.showMap();
      this.loading = false;
    });
  }

  /*
  Newton is very snack driven, so for every metre you go uphill, he must be given one snack.
  However, for every metre you go downhill, the dog can store that momentum to eventually walk back up one metre uphill.
  Walking on even ground requires no snacks because he just kinda glides along.
   */
  calculateSnacks(entry, index) {
    if (index === 0) { // first entry, add snacks
      this.snacks = this.snacks + entry.altitude;

    } else if (entry.altitude > this.lastAltitude) { // going uphill
      if (this.momentum > 0) {
        if ((this.momentum - entry.altitude) >= 0) { // still have momentum, no need to snack
          this.momentum = this.momentum - entry.altitude;
        } else { // momentum is not big enough, need snacks
          this.snacks = this.snacks + Math.abs(this.momentum - (entry.altitude - this.lastAltitude));
          this.momentum = 0;
        }
      } else {
        this.snacks = this.snacks + (entry.altitude - this.lastAltitude);
      }
    } else if (entry.altitude < this.lastAltitude) { // going downhill
      this.momentum = this.momentum + Math.abs(entry.altitude - this.lastAltitude);
    }
    this.lastAltitude = entry.altitude;
  }

  showMap(): void {
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 18,
      center: this.animalWalkCoords[0],
      mapTypeId: 'terrain'
    });

    const lineSymbol = {
      path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
      scale: 4,
      strokeColor: '#df8f32'
    };
    const walkLine = new google.maps.Polyline({
      path: this.animalWalkCoords,
      icons: [{
        icon: lineSymbol,
        offset: '100%'
      }],
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
      map: this.map
    });
    this.animateCircle(walkLine);
  }

  animateCircle(line) {
    let count = 0;
    window.setInterval(() => {
      count = (count + 1) % 200;

      const icons = line.get('icons');
      icons[0].offset = (count / 2) + '%';
      line.set('icons', icons);
    }, 30);
  }

  goBack() {
    this.location.back();
  }
}
