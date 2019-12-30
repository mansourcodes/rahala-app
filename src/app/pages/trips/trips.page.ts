import { Component, OnInit, OnDestroy } from '@angular/core';
import { TripsService } from 'src/app/services/providers/trips.service';
import { Trip } from 'src/app/services/models/trip.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss']
})
export class TripsPage implements OnInit, OnDestroy {
  loadedTrips: Trip[];
  private tripsSub: Subscription;

  constructor(private tripService: TripsService) {}

  ngOnInit() {
    this.tripsSub = this.tripService.trips.subscribe(trips => {
      this.loadedTrips = trips;
    });
  }

  ngOnDestroy() {
    if (this.tripsSub) {
      this.tripsSub.unsubscribe();
    }
  }
}
