import { Injectable } from '@angular/core';
import { Trip, TripInterface } from '../models/trip.model';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { take, map, tap, delay, switchMap, retry, catchError } from 'rxjs/operators';
import { AuthService } from '../common/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LaravelResponseMeta, LaravelResponseMetaInterface } from '../models/LaravelResponseMeta.model'
import { Client } from '../models/client.model';
import { SearchFrom } from 'src/app/services/models/searchForm.model';



@Injectable({
  providedIn: 'root'
})
export class TripsService {
  private _trips = new BehaviorSubject<Trip[]>([]);
  private _meta = new BehaviorSubject<LaravelResponseMeta>(new LaravelResponseMeta(0));

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

  fetchTrips(query?: SearchFrom) {

    let nextPageTrips: Trip[];
    let resMeta: LaravelResponseMeta;
    if (!query.page) {
      query.page = 1;
    } else {
      query.page++;
    }

    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        if (!token) {
          throw new Error('No user found!');
        }
        let params = new HttpParams();
        if (query.page) { params = params.append('page', query.page.toString()); }
        if (query.travelBy && query.travelBy !== 'all') { params = params.append('travel_by', query.travelBy); }
        if (query.city && query.city !== 'all') { params = params.append('cities', query.city); }

        if (query.dateFrom && query.dateTo) {
          const dateRange = query.dateFrom.toISOString().slice(0, 10) + ',' + query.dateTo.toISOString().slice(0, 10);
          params = params.append('travel_date', dateRange);
          params = params.append('return_date', dateRange);
        }

        return this.http.get<{ data: TripInterface[], links, meta: LaravelResponseMetaInterface }>(
          environment.apiURL + `trips`
          , { params, headers: { Authorization: token } }
        ).pipe(
          retry(1),
          catchError(this.handleError)
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
        );
        this._meta.next(meta);

        const trips = [];
        for (const key in resData.data) {
          if (resData.data.hasOwnProperty(key)) {
            trips.push(
              new Trip(
                resData.data[key],
                new Client(
                  resData.data[key].client.id,
                  resData.data[key].client.client_name,
                  resData.data[key].client.client_alian,
                  resData.data[key].client.logo_img,
                  resData.data[key].client.contact
                )
              )
            );
          }
        }
        return trips;
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
          tripResponse.data,
          new Client(
            tripResponse.data.client.id,
            tripResponse.data.client.client_name,
            tripResponse.data.client.client_alian,
            tripResponse.data.client.logo_img,
            tripResponse.data.client.contact
          )
        );
      })
    );
  }

  handleError(error) {

    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // quicksearch-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status} - Message: ${error.message}`;
    }

    window.location.href = '/slides';
    return throwError(errorMessage);
  }
}
