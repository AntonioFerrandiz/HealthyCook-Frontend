import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RecipeService } from 'src/app/services/recipe.service';
import { ShareIngredientsService } from 'src/app/services/share-ingredients.service';
import { ShareRecipesFoundService } from 'src/app/services/share-recipes-found.service';

@Component({
  selector: 'app-recipes-found',
  templateUrl: './recipes-found.component.html',
  styleUrls: ['./recipes-found.component.css']
})
export class RecipesFoundComponent implements OnInit {
  recipes : any[] = []
  ingredients: any[] = []
  ingredientsNotFound: any[] = []
  recipesFound: any[] = []
  constructor(private shareRecipesFoundService: ShareRecipesFoundService,
    private shareIngredientsService: ShareIngredientsService,
    private recipeService: RecipeService,
    private toastr: ToastrService) { }
  ngOnInit(): void {
    //this.recipes = this.shareRecipesFoundService.recipesFoundList
    //console.log(this.recipes)
    this.ingredients = this.shareIngredientsService.ingredientsList
    //console.log(this.ingredients)
    this.searchRecipes()
   }

   searchRecipes():void{
    var arr = this.ingredients
      var iterador = arr.values()
      for (let ingredient of iterador){
        this.recipeService.SearchRecipeByIngredient(ingredient).subscribe(data => {
          if(data.length == 0){
            this.toastr.error("No se han encontrado recetas que contengan " + ingredient)
            this.ingredientsNotFound.push(ingredient)
          } else {
            this.recipesFound.push(data)  
          }
        }) 
      }
   }
}
