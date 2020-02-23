import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TripsService } from 'src/app/services/providers/trips.service';
import { Trip } from 'src/app/services/models/trip.model';
import { Subscription } from 'rxjs';
import { IonInfiniteScroll, MenuController } from '@ionic/angular';
import { LaravelResponseMeta } from 'src/app/services/models/LaravelResponseMeta.model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { SearchFrom, SearchFromInterface } from 'src/app/services/models/searchForm.model';
import { environment } from 'src/environments/environment';


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
  searchTerms: any;

  private routerQueryParamsSub: Subscription;
  private tripsSub: Subscription;
  private listMetaSub: Subscription;

  // TODO: apply filters on loadedTrips
  public filtersForm = {
    numOfDays: { lower: 3, upper: 16 },
    foodOptions: []
  };

  //TODO: get foodoptions list
  public foodOptionsList = [
    { id: 1, val: 'Pepperoni', selected: true },
    { id: 2, val: 'Sausage', selected: true },
    { id: 3, val: 'Mushroom', selected: true }
  ];

  constructor(
    private tripService: TripsService,
    private menu: MenuController,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.routerQueryParamsSub = this.route.queryParams.pipe(map(paramsString => {
      let searchTermsObj: SearchFromInterface;
      try {
        searchTermsObj = JSON.parse(paramsString.searchTerms);
      } catch (error) {
        searchTermsObj = {
          travelBy: 'all',
          city: 'all',
          dateFrom: '1970-01-01',
          dateTo: '2090-01-01',
        };
      }

      //TODO: delete this test code
      if (!environment.production) {
        searchTermsObj.dateFrom = '1970-01-01';
        searchTermsObj.dateTo = '2090-01-01';
      }

      const searchTerms = new SearchFrom(
        searchTermsObj.travelBy,
        searchTermsObj.city,
        new Date(searchTermsObj.dateFrom),
        new Date(searchTermsObj.dateTo),
        1
      );

      return searchTerms;

    })).subscribe(searchTerms => {
      this.searchTerms = searchTerms;
    });
    this.tripsSub = this.tripService.trips.subscribe(trips => {
      this.loadedTrips = trips;
      this.relevantTrips = this.loadedTrips;
    });
    this.listMetaSub = this.tripService.meta.subscribe(meta => {
      this.listMeta = meta;
    });
  }

  onFilterUpdate() {
    this.relevantTrips = this.loadedTrips.filter(
      //TODO: filter by food options
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
    const query = { ...this.searchTerms };
    query.page = this.listMeta.currentPage;
    this.tripService.fetchTrips(query).subscribe(() => {
      this.isLoading = false;
    });
  }

  // TODO: fix bug - when one trip only , loaded again after scralling
  loadMoreTrips(event) {
    this.tripService.fetchTrips(this.searchTerms).subscribe(resMeta => {
      event.target.complete();
      this.onFilterUpdate();
      if (this.listMeta.currentPage === this.listMeta.lastPage) {
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

  getTravelByIcon(TravelBy: string) {
    return Trip.travelByIcon(TravelBy);
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
