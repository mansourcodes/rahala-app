import { Injectable } from '@angular/core';
import { Trip } from '../models/trip.model';
import { BehaviorSubject } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  // TODO: make http request
  private tripsBehSub = new BehaviorSubject<Trip[]>([
    new Trip(
      '1',
      'R232',
      '02-02-2020',
      '1',
      'Travel to maka 02022020 bu bus',
      'Manama',
      'BUS',
      'All',
      '02-02-2020',
      '9'
    ),
    new Trip(
      '4',
      'R232',
      '02-02-2020',
      '1',
      'Travel to maka 02022020 bu bus',
      'Manama',
      'BUS',
      'All',
      '02-02-2020',
      '9'
    ),
    new Trip(
      '3',
      'R232',
      '02-02-2020',
      '1',
      'Travel to maka 02022020 bu bus',
      'Manama',
      'BUS',
      'All',
      '02-02-2020',
      '9'
    ),
    new Trip(
      '2',
      'R232',
      '02-02-2020',
      '1',
      'Travel to maka 02022020 bu bus',
      'Manama',
      'BUS',
      'All',
      '02-02-2020',
      '9'
    )
  ]);

  get trips() {
    return this.tripsBehSub.asObservable();
  }

  constructor() { }

  getTrip(id: string) {
    return this.trips.pipe(
      take(1),
      map(trips => {
        return { ...trips.find(trip => trip.id === id) };
      })
    );
  }
}
