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
import { trigger, transition, animate, style, state, group } from '@angular/animations'


@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        'max-height': '500px', 'opacity': '1', 'visibility': 'visible'
      })),
      state('out', style({
        'max-height': '0px', 'opacity': '0', 'visibility': 'hidden'
      })),
      transition('in => out', [group([
        animate('400ms ease-in-out', style({
          'opacity': '0'
        })),
        animate('600ms ease-in-out', style({
          'max-height': '0px'
        })),
        animate('700ms ease-in-out', style({
          'visibility': 'hidden'
        }))
      ]
      )]),
      transition('out => in', [group([
        animate('5ms ease-in-out', style({
          'visibility': 'visible'
        })),
        animate('600ms ease-in-out', style({
          'max-height': '500px'
        })),
        animate('800ms ease-in-out', style({
          'opacity': '1'
        }))
      ]
      )])
    ])
  ]
})
export class TripsPage implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  loadedTrips: Trip[];
  relevantTrips: Trip[];
  foodOptionsList = [];
  listMeta: LaravelResponseMeta;
  searchTerms: any;
  isLoading = true;
  AdvanceInfoAnimationState = 'out';

  // TODO: apply filters on loadedTrips
  filtersForm = {
    numOfDays: { lower: 3, upper: 16 },
    foodOptions: []
  };


  private routerQueryParamsSub: Subscription;
  private tripsSub: Subscription;
  private listMetaSub: Subscription;

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

    this.initFoodOptionsList();
  }

  initFoodOptionsList() {
    for (let [key, value] of Object.entries(environment.foodOptions)) {
      this.foodOptionsList.push({
        val: key,
        label: value,
        selected: true,
      })
    }
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


  toggleSearchAdvanceInfo() {
    this.AdvanceInfoAnimationState = this.AdvanceInfoAnimationState === 'out' ? 'in' : 'out';
    this.onFilterUpdate();
  }

}
