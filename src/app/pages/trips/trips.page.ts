import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TripsService } from 'src/app/services/providers/trips.service';
import { Trip } from 'src/app/services/models/trip.model';
import { Subscription } from 'rxjs';
import { IonInfiniteScroll, MenuController } from '@ionic/angular';
import { LaravelResponseMeta } from 'src/app/services/models/LaravelResponseMeta.model';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss']
})
export class TripsPage implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  isLoading = true;
  loadedTrips: Trip[];
  relevantTrips: Trip[];
  listMeta: LaravelResponseMeta;
  routerQueryParams: Params;

  private routerQueryParamsSub: Subscription;
  private tripsSub: Subscription;
  private listMetaSub: Subscription;

  // TODO: apply filters on loadedTrips
  public filtersForm = {
    numOfDays: { lower: 3, upper: 16 },
    foodOptions: []
  };

  public foodOptionsList = [
    { id: 1, val: 'Pepperoni', selected: true },
    { id: 2, val: 'Sausage', selected: true },
    { id: 3, val: 'Mushroom', selected: true }
  ];

  constructor(
    private tripService: TripsService,
    private menu: MenuController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.tripsSub = this.tripService.trips.subscribe(trips => {
      this.loadedTrips = trips;
      this.relevantTrips = this.loadedTrips;
    });
    this.listMetaSub = this.tripService.meta.subscribe(meta => {
      this.listMeta = meta;
    });
    this.routerQueryParamsSub = this.route.queryParams.subscribe(params => {
      this.routerQueryParams = params;
    });
  }

  onFilterUpdate() {
    this.relevantTrips = this.loadedTrips.filter(
      trip => {
        if (trip.numOfDays >= this.filtersForm.numOfDays.lower &&
          trip.numOfDays <= this.filtersForm.numOfDays.upper
        ) {
          return true;
        }
        return false;
      }
    );
  }

  ionViewWillEnter() {
    this.isLoading = true;
    //TODO: apply routerQueryParams 
    this.tripService.fetchTrips({ page: this.listMeta.currentPage }).subscribe(() => {
      this.isLoading = false;
    });
  }

  loadMoreTrips(event) {
    this.tripService.fetchTrips({ page: this.listMeta.currentPage + 1 }).subscribe(resMeta => {
      event.target.complete();
      this.onFilterUpdate();
      if (this.listMeta.currentPage == this.listMeta.lastPage) {
        event.target.disabled = true;
      }
    });
  }

  openFiltersManu() {
    this.menu.open('filterManu');
  }

  closeFiltersManu() {
    this.menu.close('filterManu');
  }

  ngOnDestroy() {
    if (this.tripsSub) {
      this.tripsSub.unsubscribe();
    }
    if (this.listMetaSub) {
      this.listMetaSub.unsubscribe();
    }
    if (this.routerQueryParamsSub) {
      this.routerQueryParamsSub.unsubscribe();
    }
  }


}
