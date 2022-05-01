import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RecipeRating } from 'src/app/models/recipe-rating';
import { RecipeDetailsService } from 'src/app/services/recipe-details.service';
import { RecipeRatingService } from 'src/app/services/recipe-rating.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent implements OnInit {
  starRating = 0; 
  hovered = 0;

  recipeID:number;
  recipe: any[] = []
  recipeDetails: any[] = []
  ratingRecipeForm = new FormControl(null, Validators.required);

  constructor(private recipeService: RecipeService, private recipeDetailsService: RecipeDetailsService,
    private aRoue: ActivatedRoute,
    private fb: FormBuilder,
    private recipeRatingService: RecipeRatingService,
    private toastr: ToastrService) {
      this.recipeID = +this.aRoue.snapshot.paramMap.get('id');
      
     }

  ngOnInit(): void {
    this.getRecipe()
    this.getRecipeDetails()
    
  }
  saveRating():void{
    if(this.ratingRecipeForm.value == null){
    } else {
      const recipeRating: RecipeRating = {
        recipeID: this.recipeID,
        rating: this.ratingRecipeForm.value
      }
      this.recipeRatingService.saveRecipeRating(recipeRating).subscribe(data =>{
        this.toastr.success('Gracias por calificar','')
      }, error =>{
        console.log(error)
      })
    }
    
  }
  getRecipe(): void{
    this.recipeService.GetRecipeByID(this.recipeID).subscribe(data =>{
      this.recipe = data
      // console.log(this.recipe)
    })
  }
  getRecipeDetails(): void{
    this.recipeDetailsService.GetRecipeDetails(this.recipeID).subscribe(data => {
      this.recipeDetails = data;
      // console.log(this.recipeDetails)
    })
  }
}
