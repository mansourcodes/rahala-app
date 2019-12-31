import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from 'src/app/services/models/auth-respons.interface';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  post(serviceName: string, data: any): any {
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredintials: false
    };

    const url = environment.apiURL + serviceName;
    console.log('http post:' + serviceName);
    return this.http.post(url, JSON.stringify(data), options);
  }

  get(serviceName: string, data: any): any {
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredintials: false
    };

    const url = environment.apiURL + serviceName;
    console.log('http post:' + serviceName);
    return this.http.get(url, JSON.stringify(data), options);
  }
}
