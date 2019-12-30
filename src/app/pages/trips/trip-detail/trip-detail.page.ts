import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/services/models/trip.model';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TripsService } from 'src/app/services/providers/trips.service';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.page.html',
  styleUrls: ['./trip-detail.page.scss']
})
export class TripDetailPage implements OnInit {
  trip: Trip;
  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private tripsService: TripsService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('tripId')) {
        this.navCtrl.navigateBack('/tabs');
        return;
      }
      this.trip = this.tripsService.getTrip(paramMap.get('tripId'));
      console.log(this.trip);
    });
  }
}
