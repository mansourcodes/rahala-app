import { Component, OnInit } from '@angular/core';
import { TripsService } from 'src/app/services/providers/trips.service';
import { Trip } from 'src/app/services/models/trip.model';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss']
})
export class TripsPage implements OnInit {
  loadedTrips: Trip[];

  constructor(
    private tripService: TripsService
  ) {}

  ngOnInit() {
    this.loadedTrips = this.tripService.trips;
  }
}
