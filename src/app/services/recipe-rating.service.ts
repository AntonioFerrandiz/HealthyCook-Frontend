import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RecipeRating } from '../models/recipe-rating';

@Injectable({
  providedIn: 'root'
})
export class RecipeRatingService {
  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/RecipeRating/'
  }

  saveRecipeRating(recipeRating: RecipeRating): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl,recipeRating)
  }
  GetRatingByRecipe(recipeID: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetRatingByRecipe/' + recipeID)
  }
  GetAverageRatingOfRecipe(recipeID: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetAverageRatingOfRecipe/' + recipeID)
  }
}
