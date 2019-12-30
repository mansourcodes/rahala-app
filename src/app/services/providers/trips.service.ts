import { Injectable } from '@angular/core';
import { Trip } from '../models/trip.model';

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  // TODO: make observalSubject
  private _trips: Trip[] = [
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
  ];

  get trips() {
    return [...this._trips];
  }

  getTrip(id: string): Trip {
    return this._trips.find(trip => {
      return trip.id === id;
    });
  }
  constructor() {}
}
