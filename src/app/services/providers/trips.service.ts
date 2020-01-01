import { Injectable } from '@angular/core';
import { Trip, TripInterface } from '../models/trip.model';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { AuthService } from '../common/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
  // TODO: make http request
  private _trips = new BehaviorSubject<Trip[]>([]);

  get trips() {
    return this._trips.asObservable();
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  fetchTrips() {
    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        return this.http.get<{ data: TripInterface[] }>(
          environment.apiURL + `trips`,
          { headers: { Authorization: token } }
        );
      }),
      map(resData => {

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
      tap(trips => {
        this._trips.next(trips);
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

// TODO: fix all form udemy