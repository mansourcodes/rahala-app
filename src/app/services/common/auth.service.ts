import { Injectable, OnDestroy } from '@angular/core';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { AuthResponseData } from 'src/app/services/models/auth-respons.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private _user = new BehaviorSubject<User>(null);
  private activeLogoutTimer: any;

  get userIsAuthenticated(): Observable<boolean> {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  get userId(): Observable<any> {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return user.id;
        } else {
          return null;
        }
      })
    );
  }

  get token(): Observable<any> {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return user.token;
        } else {
          return null;
        }
      })
    );
  }

  constructor(
    private httpService: HttpService,
    private storageService: StorageService
  ) {}

  // TODO : function need to be tested
  autoLogin() {
    return from(
      this.storageService.get(environment.AuthConstents.AUTH)
    ).pipe(
      map(storedData => {
        if (!storedData) {
          return null;
        }

        const parsedData = storedData;
        const expirationTime = new Date(parsedData.expiresAt);
        if (expirationTime <= new Date()) {
          return null;
        }
        const user = new User(
          parsedData.accessToken,
          parsedData.tokenType,
          parsedData.expiresAt,
          parsedData.id,
          parsedData.email
        );
        return user;
      }),
      tap(user => {
        if (user) {
          this._user.next(user);
          this.autoLogout(user.tokenDuration);
        }
      }),
      map(user => {
        return !!user;
      })
    );
  }

  // TODO: fix return invalid data from server
  signup(email: string, password: string) {
    return this.httpService
      .post('auth/signup', {
        name: email,
        email,
        password,
        password_confirmation: password
      })
      .pipe(tap(this.setUserData.bind(this)));
  }

  // TODO: fix return invalid data from server
  login(email: string, password: string) {
    return this.httpService
      .post('auth/login', {
        email,
        password
      })
      .pipe(tap(this.setUserData.bind(this)));
  }

  logout() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this._user.next(null);
    this.storageService.removeItem(environment.AuthConstents.AUTH);
  }

  ngOnDestroy() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
  }

  private autoLogout(duration: number) {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this.activeLogoutTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  // TODO: expires_at is a date, check!!
  private setUserData(userData: AuthResponseData) {
    const expirationTime = new Date(userData.expires_at);
    const user = new User(
      userData.access_token,
      userData.token_type,
      expirationTime,
      userData.id,
      userData.email
    );
    this._user.next(user);
    this.autoLogout(user.tokenDuration);
    this.storeAuthData(
      userData.access_token,
      userData.token_type,
      expirationTime,
      userData.id,
      userData.email
    );
  }

  private storeAuthData(
    accessToken: string,
    tokenType: string,
    expiresAt: Date,
    id?: string,
    email?: string
  ) {
    const data = {
      accessToken,
      tokenType,
      expiresAt,
      id,
      email
    };
    this.storageService.store(environment.AuthConstents.AUTH, data);
  }
}
