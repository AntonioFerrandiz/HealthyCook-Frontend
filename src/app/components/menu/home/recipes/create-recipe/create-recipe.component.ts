import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  dataRecipe: FormGroup;
  recipeID: number;
  nameRecipe: string;
  descriptionRecipe: string;
  preparationRecipe: string;
  recipeDetails: FormGroup;

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
      id: ['']
    })
  }

  ngOnInit(): void { }

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
    console.log(recipe)
    this.recipeService.saveRecipe(recipe).subscribe(data => {
      this.recipeID = data.message;
      this.showRecipeForm = false; this.showRecipeDetailsForm = true
    }, error => {
      this.toast.error('Hubo un error al continuar, intente más tarde', 'Error')
    })
  }

  registerRecipeDetails(): void {
    const recipeDetails: RecipeDetails = {
      preparationTime: this.recipeDetails.value.preparationTime,
      timePeriod: this.recipeDetails.value.timePeriod,
      servings: this.recipeDetails.value.servings,
      calories: this.recipeDetails.value.calories,
      difficulty: this.recipeDetails.value.difficulty,
      recipeVideoURL: this.recipeDetails.value.recipeVideoURL,
      recipeId: this.recipeID
    }
    console.log(recipeDetails)
    this.recipeDetailsService.saveRecipeDetails(recipeDetails).subscribe(data => {
      this.changePublicationStatus()
      this.toast.success('Receta publicada exitosamente','')
      this.router.navigate(['/recipes'])
    }, error => {
      this.toast.error('Hubo un error al subir la receta, intente más tarde', 'Error')
    })
  }
  changePublicationStatus(): void {
    this.recipeService.ChangePublicationStatus(this.recipeID).subscribe(data => {
      console.log('Se cambio el estado de publicación de la receta con ID: ', this.recipeID)
    })
  }
}
