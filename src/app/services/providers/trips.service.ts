import { Injectable } from '@angular/core';
import { Trip, TripInterface } from '../models/trip.model';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { HttpService } from '../common/http.service';
import { AuthService } from '../common/auth.service';

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
    private httpService: HttpService,
    private authService: AuthService
  ) {}

  fetchTrips() {
    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        return this.httpService.get<{ [key: string]: TripInterface }>(
          'trips',
          { token }
        );
      }),
      map(resData => {
        const trips = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            trips.push(
              new Trip(
                resData[key].id,
                resData[key].code,
                resData[key].createdDate,
                resData[key].clientId,
                resData[key].name,
                resData[key].cities,
                resData[key].travelBy,
                resData[key].foodOptions,
                resData[key].travelDate,
                resData[key].numOfDays
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

  getPlace(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        return this.httpService.get<TripInterface>(`trip/${id}`, {
          token
        });
      }),
      map(tripData => {
        return new Trip(
          tripData.id,
          tripData.code,
          tripData.createdDate,
          tripData.clientId,
          tripData.name,
          tripData.cities,
          tripData.travelBy,
          tripData.foodOptions,
          tripData.travelDate,
          tripData.numOfDays
        );
      })
    );
  }

  getTrip(id: string) {
    return this.trips.pipe(
      take(1),
      map(trips => {
        return { ...trips.find(trip => trip.id === id) };
      })
    );
  }
}

// TODO: fix all form udemy