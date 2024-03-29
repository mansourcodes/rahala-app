import { Component, OnInit, OnDestroy } from '@angular/core';
import { Trip } from 'src/app/services/models/trip.model';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TripsService } from 'src/app/services/providers/trips.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.page.html',
  styleUrls: ['./trip-detail.page.scss']
})
export class TripDetailPage implements OnInit, OnDestroy {
  trip: Trip;
  private tripSub: Subscription;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private tripsService: TripsService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('tripId')) {
        this.navCtrl.navigateBack('/trips');
        return;
      }
      this.tripSub = this.tripsService
        .getTrip(paramMap.get('tripId'))
        .subscribe(trip => {
          this.trip = trip;
          this.isLoading = false;
        });
    });
  }


  ngOnDestroy() {
    if (this.tripSub) {
      this.tripSub.unsubscribe();
    }
  }
}
