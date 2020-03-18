import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { take, map, tap, switchMap, retry, catchError } from 'rxjs/operators';
import { AuthService } from '../common/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LaravelResponseMeta, LaravelResponseMetaInterface } from '../models/LaravelResponseMeta.model'
import { Quicksearch, QuicksearchInterface } from '../models/quicksearch.model';



@Injectable({
  providedIn: 'root'
})
export class QuicksearchsService {
  private _quicksearchs = new BehaviorSubject<Quicksearch[]>([]);
  private _meta = new BehaviorSubject<LaravelResponseMeta>(new LaravelResponseMeta(0));

  get quicksearchs() {
    return this._quicksearchs.asObservable();
  }

  get meta() {
    return this._meta.asObservable();
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  fetchQuicksearchs(query?: { page: number }) {

    let nextPageQuicksearchs: Quicksearch[];
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

        return this.http.get<{ data: QuicksearchInterface[], links, meta: LaravelResponseMetaInterface }>(
          environment.apiURL + `quicksearchs`
          , { params, headers: { Authorization: token } }
        ).pipe(
          retry(1),
          catchError(this.handleError),
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

        const quicksearchs = [];
        for (const key in resData.data) {
          if (resData.data.hasOwnProperty(key)) {
            quicksearchs.push(
              new Quicksearch(
                resData.data[key].id,
                resData.data[key].search_label,
                resData.data[key].cities,
                resData.data[key].travel_by,
                resData.data[key].date_from,
                resData.data[key].date_to,
                resData.data[key].background_img,
                resData.data[key].background_color,
                resData.data[key].order

              )
            );
          }
        }
        return quicksearchs;
      }),
      switchMap(quicksearchs => {
        nextPageQuicksearchs = quicksearchs;
        return this.quicksearchs;
      }),
      take(1),
      tap(quicksearchs => {
        this._quicksearchs.next(quicksearchs.concat(nextPageQuicksearchs));
        return resMeta;
      })
    );
  }

  getQuicksearch(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        return this.http.get<{ data: QuicksearchInterface }>(
          environment.apiURL + `quicksearchs/${id}`,
          { headers: { Authorization: token } }
        );
      }),
      map(quicksearchResponse => {

        return new Quicksearch(
          quicksearchResponse.data.id,
          quicksearchResponse.data.search_label,
          quicksearchResponse.data.cities,
          quicksearchResponse.data.travel_by,
          quicksearchResponse.data.date_from,
          quicksearchResponse.data.date_to,
          quicksearchResponse.data.background_img,
          quicksearchResponse.data.background_color,
          quicksearchResponse.data.order
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
