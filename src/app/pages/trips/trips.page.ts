import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TripsService } from 'src/app/services/providers/trips.service';
import { Trip } from 'src/app/services/models/trip.model';
import { Subscription } from 'rxjs';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss']
})
export class TripsPage implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  isLoading = true;
  current_page = 1;
  loadedTrips: Trip[];
  private tripsSub: Subscription;


  constructor(
    private tripService: TripsService,
  ) { }

  ngOnInit() {
    this.tripsSub = this.tripService.trips.subscribe(trips => {
      this.loadedTrips = trips;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.tripService.fetchTrips({ page: this.current_page }).subscribe(() => {
      this.isLoading = false;
      this.current_page++;
    });
  }

  // TODO: append data to loadedTrips
  loadMoreTrips(event) {

    this.tripService.fetchTrips({ page: this.current_page }).subscribe(() => {
      event.target.complete();
      this.current_page++;
      // setTimeout(() => {
      //   event.target.complete();
      // }, 2000);


      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // if (3 == 1000) {
      //   event.target.disabled = true;
      // }
    });

  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  ngOnDestroy() {
    if (this.tripsSub) {
      this.tripsSub.unsubscribe();
    }
  }
}
