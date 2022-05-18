import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RecipesSaved } from '../models/recipes-saved';

@Injectable({
  providedIn: 'root'
})
export class RecipesSavedService {

  myAppUrl: string;
  myApiUrl: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl =  '/api/RecipesSaved/';
   }

   saveRecipesSaved(recipesSaved: RecipesSaved): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, recipesSaved)
   }

   GetRecipesSavedByUserID(userID: Number): Observable<any>{
     return this.http.get(this.myAppUrl + this.myApiUrl + `GetRecipesSavedByUserID/${userID}`)
   }

}
