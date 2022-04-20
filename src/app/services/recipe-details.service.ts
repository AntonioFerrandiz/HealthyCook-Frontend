import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RecipeDetails } from '../models/recipeDetails';

@Injectable({
  providedIn: 'root'
})
export class RecipeDetailsService {
  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/RecipeDetails/';
  }

  saveRecipeDetails(recipe: RecipeDetails): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, recipe);
  }

  GetRecipeDetails(recipeId: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetRecipeDetails/' + recipeId)
  }
}
