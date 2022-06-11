import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RecipeService } from 'src/app/services/recipe.service';
import { ShareIngredientsService } from 'src/app/services/share-ingredients.service';
import { ShareRecipesFoundService } from 'src/app/services/share-recipes-found.service';

export interface Ingredient {
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recipeList: any[] = []
  ingredient: string = ''
  ingredients: any[] = []
  ingredientsList: any[]
  recipesFound: any[] = []
  errorMessage: string;
  searchForm: FormGroup;
  constructor(private toastr: ToastrService,
    private router: Router,
    private recipeService: RecipeService,
    private shareRecipesFoundService: ShareRecipesFoundService,
    private shareIngredientsService: ShareIngredientsService,
    private fb: FormBuilder) {
      this.searchForm = this.fb.group({
        ingredients: ['']
      })
  }

  ngOnInit(): void {
    this.getLastFiveRecipes()
  }
  redirectToDespensa(): void {
    this.toastr.info('Esta ventana se encuentra en construcción, vuelve luego!', 'Holaa!')
  }

  redirectToRecipes(): void {
    this.router.navigate(['/recipes'])
  }

  redirectToRestaurants(): void {
    this.router.navigate(['/restaurants'])
  }

  addIngredient(): void {
    if (this.ingredient === null || this.ingredient.match(/^ *$/) !== null) {
    } else {
      this.ingredients.push(this.ingredient.trim())
    }
  }
  removeIngredient(ingredient: Ingredient): void {
    const i = this.ingredients.indexOf(ingredient)
    if (i >= 0) {
      this.ingredients.splice(i, 1)
    }
  }
  searchRecipe(): void {
    if (this.ingredients.length === 0) {
      this.toastr.warning('Debe ingresar al menos un ingrediente para realizar la busqueda', '')
    }
  }
  getLastFiveRecipes(): void {
    this.recipeService.GetNumberOfRecipes().subscribe(data => {      
      if (data >= 5) {
        this.recipeService.GetLastFiveRecipes().subscribe(data => {
          this.recipeList = data;
        })
      }
      this.errorMessage = "Tenemos pocas recetas para mostrar aquí, te animas a crear más?"
    })
  }
  searchRecipeByIngredient():void {
    if (this.ingredients.length === 0) {
      this.toastr.warning('Debe ingresar al menos un ingrediente para realizar la busqueda', '')
    } else {
      this.shareRecipesFoundService.recipesFoundList = this.recipesFound
      this.shareIngredientsService.ingredientsList = this.ingredients
      this.router.navigate(['/recipes/recipes-found'])
    }
  }
}
