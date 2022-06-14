import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExcludedIngredients } from '../models/excludedIngredients';

@Injectable({
  providedIn: 'root'
})
export class ExcludedIngredientsService {
  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/ExcludedIngredients/';
  }

  saveExcludedIngredients(excludedIngredient: ExcludedIngredients):Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, excludedIngredient)
  }
  GetListExcludedIngredientsByUser(userID: number):Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetListExcludedIngredientsByUser/' + userID)
  }
  deleteExcludedIngredients(excludedIngredientID: number):Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + excludedIngredientID)
  }

}
