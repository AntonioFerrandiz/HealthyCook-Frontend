import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Recipe} from "../models/recipe";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FollowerService {

  myApiUrl: string;
  constructor(private http: HttpClient) {
    this.myApiUrl =  'http://localhost:50947/api/Followers';
  }
  saveFollowerByUserID(recipe: Recipe): Observable<any> {
    return this.http.post(this.myApiUrl, recipe);
  }

  getFollowerByUserID(userId: string): Observable<any> {
    return this.http.get(this.myApiUrl +'/GetFollowersByUser/'+userId)
  }
  getFollowedByUserID(userId: string): Observable<any> {
    return this.http.get(this.myApiUrl +'/GetFollowedsByUser/'+userId)
  }

}
