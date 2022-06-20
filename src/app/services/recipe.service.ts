import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  nameRecipe!: string;
  descriptionRecipe!: string;
  preparationRecipe!: string;
  myAppUrl: string;
  myApiUrl: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl =  '/api/Recipe/';
   }
   saveRecipe(recipe: Recipe): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, recipe);
  }

  GetRecipeByID(recipeID: number): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl + recipeID)
  }
  ChangePublicationStatus(recipeID:number):Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + 'ChangePublicationStatus/' + recipeID,true)
  }
  GetNumberOfRecipes(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetNumberOfRecipes')
  }
  GetTodaysRecipes(date: string): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetTodaysRecipes/' + date)
  }
  GetLastFiveRecipes(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetLastFiveRecipes')
  }
  getListRecipes(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetListRecipes');
  }

  GetListRecipesPublishedByUser(userID:number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetListRecipesPublishedByUser/' + userID)
  }

  GetListRecipesNoPublishedByUser(userID:number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetListRecipesNoPublishedByUser/' + userID)
  }
  SearchRecipeByIngredient(ingredient: string, excludedIngredient: string): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'SearchRecipeByIngredient/' + `${ingredient}/${excludedIngredient}`)
  }
  deleteRecipe(recipeID:number):Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + recipeID);
  }
}

