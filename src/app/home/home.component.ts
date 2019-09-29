import {Component, OnInit} from '@angular/core';
import {Walk} from '../models/walk';
import {DogsRouteService} from '../dogs-route.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Dogs app';
  walksArray: Walk[] = [];
  loading = false;

  constructor(private routeService: DogsRouteService) {
  }

  ngOnInit() {
    this.loading = true;
    this.routeService.getAllRoutes().subscribe((res: Walk) => {
      this.walksArray = this.walksArray.concat(res);
      this.loading = false;
    });


  }

}
