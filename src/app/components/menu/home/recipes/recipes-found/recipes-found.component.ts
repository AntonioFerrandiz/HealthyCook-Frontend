import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ExcludedIngredientsService } from 'src/app/services/excluded-ingredients.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { ShareIngredientsService } from 'src/app/services/share-ingredients.service';
import { ShareRecipesFoundService } from 'src/app/services/share-recipes-found.service';

@Component({
  selector: 'app-recipes-found',
  templateUrl: './recipes-found.component.html',
  styleUrls: ['./recipes-found.component.css']
})
export class RecipesFoundComponent implements OnInit {
  recipes: any[] = []
  ingredients: any[] = []
  ingredientsNotFound: any[] = []
  recipesFound: any[] = []
  excludedIngredients: any[] = []
  userID: number
  constructor(private excludedIngredientsService: ExcludedIngredientsService,
    private shareIngredientsService: ShareIngredientsService,
    private recipeService: RecipeService,
    private toastr: ToastrService) { }
  ngOnInit(): void {
    this.ingredients = this.shareIngredientsService.ingredientsList
    this.searchRecipes()
    this.userID = 1
  }

  searchRecipes(): void {
    this.excludedIngredientsService.GetListExcludedIngredientsByUser(1).subscribe(data => {
      data.map(i => {
        this.excludedIngredients.push(i.ingredientName)
      })
      var ingredientsArray = this.ingredients
      var ingredientsList = ingredientsArray.values()
      if(this.excludedIngredients.length == 0){
        this.excludedIngredients.push('')
      }
      var excludedIngredientsArray = this.excludedIngredients
      var excludedIngredientsList = excludedIngredientsArray.values()
      
      for (let ingredient of ingredientsList) {
        for(let excludedIngredient of excludedIngredientsList){
          this.recipeService.SearchRecipeByIngredient(ingredient, excludedIngredient).subscribe(data => {
            if(ingredient == excludedIngredient){
              this.toastr.warning('¿Buscando recetas con ingredientes que tú mismo excluiste? 🤔', '')
            } else {
              if (data.length == 0) {
                this.toastr.error("No se han encontrado recetas que contengan " + ingredient)
                this.ingredientsNotFound.push(ingredient)
              } else {
                this.recipesFound.push(data)
                console.log(data)
              }
            }         
          })
        }
      }
    })

  }
}
