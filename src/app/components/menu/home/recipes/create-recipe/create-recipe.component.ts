import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ingredient } from 'src/app/models/ingredient';
import { IngredientTypes } from 'src/app/models/ingredient-types';
import { Recipe } from 'src/app/models/recipe';
import { RecipeDetails } from 'src/app/models/recipeDetails';
import { RecipeDetailsService } from 'src/app/services/recipe-details.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {

  showRecipeForm = true;
  showRecipeDetailsForm = false;
  showRecipeIngredientForm = false;
  dataRecipe: FormGroup;
  recipeID: number;
  nameRecipe: string;
  descriptionRecipe: string;
  preparationRecipe: string;
  recipeDetails: FormGroup;
  recipeIngredients: FormGroupName;
  listIngredientTypes: IngredientTypes[] = []
  ingredientTypesNames: any[] = []

  constructor(private fb: FormBuilder,
    private router: Router,
    private recipeService: RecipeService,
    private recipeDetailsService: RecipeDetailsService,
    private toast: ToastrService) {
    this.dataRecipe = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      preparation: ['', [Validators.required]],
      dateCreated: ['']
    })

    this.recipeDetails = this.fb.group({
      preparationTime: ['', [Validators.required]],
      timePeriod: ['', [Validators.required]],
      servings: ['', [Validators.required]],
      calories: ['', [Validators.required]],
      difficulty: ['', [Validators.required]],
      recipeVideoURL: [''],
      id: [''],
      recipeIngredients: fb.group({
        ingredientNameType: [''],
        ingredientsList: this.fb.array([
          this.addIngredientsFormGroup()
        ])
      })
    })

  }

  ngOnInit(): void { }

  public addIngredientsFormGroup(): FormGroup {
    return this.fb.group({
      ingredientName: [''],
      quantity: [''],
      unity: [''],
    })
  }

  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  formatDate(date: Date) {
    return (
      [
        this.padTo2Digits(date.getDate()),
        this.padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
      ].join('-')
    );
  }

  registerRecipe() {
    const now = new Date();
    const recipe: Recipe = {
      name: this.dataRecipe.value.name,
      description: this.dataRecipe.value.description,
      preparation: this.dataRecipe.value.preparation,
      dateCreated: this.formatDate(now)
    }

    this.recipeService.saveRecipe(recipe).subscribe(data => {
      this.recipeID = data.message;
      this.showRecipeForm = false; this.showRecipeDetailsForm = true
    }, error => { this.toast.error('Hubo un error al continuar, intente más tarde', 'Error') })
  }

  get getIngredients(): FormArray { return <FormArray>this.recipeDetails.get('recipeIngredients.ingredientsList') }

  addIngredient(): void { this.getIngredients.push(this.addIngredientsFormGroup()) }

  reset(): void {
    this.getIngredients.clear()
    this.recipeDetails.get('recipeIngredients.ingredientNameType').reset()
    this.addIngredient()
  }

  addIngredientTypeList(): void {
    const ingredientType = this.recipeDetails.get('recipeIngredients.ingredientNameType').value
    const ingredientArray = this.recipeDetails.get('recipeIngredients.ingredientsList').value;
    const ingArray: Ingredient[] = []

    ingredientArray.forEach((element, index) => {
      const ingredient: Ingredient = new Ingredient(element.ingredientName,
        element.quantity,
        element.unity)
      ingArray.push(ingredient);

    })

    const ingredientTypes: IngredientTypes = new IngredientTypes(ingredientType, ingArray)
    this.listIngredientTypes.push(ingredientTypes)
    this.ingredientTypesNames.push(ingredientTypes.name)
    this.reset()
  }

  changePublicationStatus(): void { this.recipeService.ChangePublicationStatus(this.recipeID).subscribe() }

  registerRecipeDetails(): void {
    const recipeDetails: RecipeDetails = {
      preparationTime: this.recipeDetails.value.preparationTime,
      timePeriod: this.recipeDetails.value.timePeriod,
      servings: this.recipeDetails.value.servings,
      calories: this.recipeDetails.value.calories,
      difficulty: this.recipeDetails.value.difficulty,
      recipeVideoURL: this.recipeDetails.value.recipeVideoURL,
      recipeId: this.recipeID,
      ingredientTypes: this.listIngredientTypes
    }
    this.recipeDetailsService.saveRecipeDetails(recipeDetails).subscribe(data => {
      console.log('dataaa  ', data)
      this.changePublicationStatus()
      this.toast.success('Receta publicada exitosamente', '')
      this.router.navigate(['/recipes'])
    }, error => { this.toast.error('Hubo un error al subir la receta, intente más tarde', 'Error') })
  }
  
}