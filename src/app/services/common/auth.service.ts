import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userIsAuth = false;


  // auth service https://www.youtube.com/watch?v=GQDrfe2Xlvk&list=PL5H08dQvT7XTqXfjRC4sAb4Tw1WGz2YBV&index=4&t=0s
  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router
  ) { }

  get userIsAuth() {
    return this._userIsAuth;
  }

  // TODO: update _userIsAuth ,, use udemy auth
  login(postData: any): Observable<any> {
    this._userIsAuth = true;
    return this.httpService.post('auth/login', postData);
  }

  signup(postData: any): Observable<any> {
    this._userIsAuth = true;
    return this.httpService.post('auth/signup', postData);
  }

  logout() {
    this._userIsAuth = false;
    this.storageService.removeItem(environment.AuthConstents.AUTH).then(res => {
      this.router.navigate(['']);
    });
  }
}
