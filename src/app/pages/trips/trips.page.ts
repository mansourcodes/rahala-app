import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TripsService } from 'src/app/services/providers/trips.service';
import { Trip } from 'src/app/services/models/trip.model';
import { Subscription } from 'rxjs';
import { IonInfiniteScroll } from '@ionic/angular';
import { LaravelResponseMeta } from 'src/app/services/models/LaravelResponseMeta.model';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss']
})
export class TripsPage implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  isLoading = true;
  loadedTrips: Trip[];
  listMeta: LaravelResponseMeta;
  private tripsSub: Subscription;
  private listMetaSub: Subscription;

  // TODO: add filters  

  constructor(
    private tripService: TripsService,
  ) { }

  ngOnInit() {
    this.tripsSub = this.tripService.trips.subscribe(trips => {
      this.loadedTrips = trips;
    });
    this.listMetaSub = this.tripService.meta.subscribe(meta => {
      this.listMeta = meta;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.tripService.fetchTrips({ page: this.listMeta.currentPage }).subscribe(() => {
      this.isLoading = false;
    });
  }

  loadMoreTrips(event) {
    this.tripService.fetchTrips({ page: this.listMeta.currentPage + 1 }).subscribe(resMeta => {
      event.target.complete();

      if (this.listMeta.currentPage == this.listMeta.lastPage) {
        event.target.disabled = true;
      }
    });
  }

  ngOnDestroy() {
    if (this.tripsSub) {
      this.tripsSub.unsubscribe();
    }
    if (this.listMetaSub) {
      this.listMetaSub.unsubscribe();
    }
  }
}
