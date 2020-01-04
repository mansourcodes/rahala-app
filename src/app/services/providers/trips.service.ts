import { Injectable } from '@angular/core';
import { Trip, TripInterface } from '../models/trip.model';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { AuthService } from '../common/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LaravelResponseMeta, LaravelResponseMetaInterface } from '../models/LaravelResponseMeta.model'

// [
//   new Trip(
//     '1',
//     'R232',
//     '02-02-2020',
//     '1',
//     'Travel to maka 02022020 bu bus',
//     'Manama',
//     'BUS',
//     'All',
//     '02-02-2020',
//     '9'
//   ),
//   new Trip(
//     '4',
//     'R232',
//     '02-02-2020',
//     '1',
//     'Travel to maka 02022020 bu bus',
//     'Manama',
//     'BUS',
//     'All',
//     '02-02-2020',
//     '9'
//   ),
//   new Trip(
//     '3',
//     'R232',
//     '02-02-2020',
//     '1',
//     'Travel to maka 02022020 bu bus',
//     'Manama',
//     'BUS',
//     'All',
//     '02-02-2020',
//     '9'
//   ),
//   new Trip(
//     '2',
//     'R232',
//     '02-02-2020',
//     '1',
//     'Travel to maka 02022020 bu bus',
//     'Manama',
//     'BUS',
//     'All',
//     '02-02-2020',
//     '9'
//   )
// ]



@Injectable({
  providedIn: 'root'
})
export class TripsService {
  private _trips = new BehaviorSubject<Trip[]>([]);
  private _meta = new BehaviorSubject<LaravelResponseMeta>(new LaravelResponseMeta(1));

  get trips() {
    return this._trips.asObservable();
  }

  get meta() {
    return this._meta.asObservable();
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  fetchTrips(query?) {

    let nextPageTrips: Trip[];
    let resMeta: LaravelResponseMeta;
    if (!query.page) query.page = 1;


    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        return this.http.get<{ data: TripInterface[], links, meta: LaravelResponseMetaInterface }>(
          environment.apiURL + `trips?page=${query.page}`,
          { headers: { Authorization: token } }
        );
      }),
      map(resData => {

        const meta = new LaravelResponseMeta(
          resData.meta.current_page,
          resData.meta.from,
          resData.meta.last_page,
          resData.meta.path,
          resData.meta.per_page,
          resData.meta.to,
          resData.meta.total
        )
        this._meta.next(meta);

        const trips = [];
        for (const key in resData.data) {
          if (resData.data.hasOwnProperty(key)) {
            trips.push(
              new Trip(
                resData.data[key].id,
                resData.data[key].code,
                resData.data[key].created_date,
                resData.data[key].client_id,
                resData.data[key].name,
                resData.data[key].cities,
                resData.data[key].travel_by,
                resData.data[key].food_options,
                resData.data[key].travel_date,
                resData.data[key].num_of_days
              )
            );
          }
        }
        return trips;
        // return [];
      }),
      switchMap(trips => {
        nextPageTrips = trips;
        return this.trips;
      }),
      take(1),
      tap(trips => {
        this._trips.next(trips.concat(nextPageTrips));
        return resMeta;
      })
    );
  }

  getTrip(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        return this.http.get<{ data: TripInterface }>(
          environment.apiURL + `trips/${id}`,
          { headers: { Authorization: token } }
        );
      }),
      map(tripResponse => {

        return new Trip(
          tripResponse.data.id,
          tripResponse.data.code,
          tripResponse.data.created_date,
          tripResponse.data.client_id,
          tripResponse.data.name,
          tripResponse.data.cities,
          tripResponse.data.travel_by,
          tripResponse.data.food_options,
          tripResponse.data.travel_date,
          tripResponse.data.num_of_days
        );
      })
    );
  }

}
