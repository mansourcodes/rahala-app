import { Injectable } from '@angular/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { take, map, tap, delay, switchMap, retry, catchError } from 'rxjs/operators';
import { AuthService } from '../common/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LaravelResponseMeta, LaravelResponseMetaInterface } from '../models/LaravelResponseMeta.model'
import { Client, ClientInterface } from '../models/client.model';
import { SearchFrom } from 'src/app/services/models/searchForm.model';



@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private _clients = new BehaviorSubject<Client[]>([]);
  private _meta = new BehaviorSubject<LaravelResponseMeta>(new LaravelResponseMeta(1));

  get clients() {
    return this._clients.asObservable();
  }

  get meta() {
    return this._meta.asObservable();
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  fetchClients(query?: { page: number }) {

    let nextPageClients: Client[];
    let resMeta: LaravelResponseMeta;
    if (!query.page) { query.page = 1; }

    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        if (!token) {
          throw new Error('No user found!');
        }
        let params = new HttpParams();
        if (query.page) { params = params.append('page', query.page.toString()); }

        return this.http.get<{ data: ClientInterface[], links, meta: LaravelResponseMetaInterface }>(
          environment.apiURL + `clients`
          , { params, headers: { Authorization: token } }
        ).pipe(
          retry(1),
          catchError(this.handleError)
        );
      }),
      map(resData => {
        console.log(resData);

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

        const clients = [];
        for (const key in resData.data) {
          if (resData.data.hasOwnProperty(key)) {
            clients.push(
              new Client(
                resData.data[key].id,
                resData.data[key].client_name,
                resData.data[key].client_alian,
                resData.data[key].logo_img,
                resData.data[key].contact_wp_1,
                resData.data[key].contact_wp_2,
                resData.data[key].locations

              )
            );
          }
        }
        return clients;
      }),
      switchMap(clients => {
        nextPageClients = clients;
        return this.clients;
      }),
      take(1),
      tap(clients => {
        this._clients.next(clients.concat(nextPageClients));
        return resMeta;
      })
    );
  }

  getClient(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        return this.http.get<{ data: ClientInterface }>(
          environment.apiURL + `clients/${id}`,
          { headers: { Authorization: token } }
        );
      }),
      map(clientResponse => {

        return new Client(
          clientResponse.data.id,
          clientResponse.data.client_name,
          clientResponse.data.client_alian,
          clientResponse.data.logo_img,
          clientResponse.data.contact_wp_1,
          clientResponse.data.contact_wp_2,
          clientResponse.data.locations
        );
      })
    );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
