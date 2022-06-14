import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/User/'
  }
  SearchUser(userID: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + "SearchUser/" + userID);
  }
}
