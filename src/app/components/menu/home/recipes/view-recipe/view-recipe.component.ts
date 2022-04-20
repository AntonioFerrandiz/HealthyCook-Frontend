import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeDetailsService } from 'src/app/services/recipe-details.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent implements OnInit {
  recipeID:number;
  recipe: any[] = []
  recipeDetails: any[] = []
  constructor(private recipeService: RecipeService, private recipeDetailsService: RecipeDetailsService,
    private aRoue: ActivatedRoute) {
      this.recipeID = +this.aRoue.snapshot.paramMap.get('id');
     }

  ngOnInit(): void {
    this.getRecipe()
    this.getRecipeDetails()
  }

  getRecipe(): void{
    this.recipeService.GetRecipeByID(this.recipeID).subscribe(data =>{
      this.recipe = data
      console.log(this.recipe)
    })
  }
  getRecipeDetails(): void{
    this.recipeDetailsService.GetRecipeDetails(this.recipeID).subscribe(data => {
      this.recipeDetails = data;
      console.log(this.recipeDetails)
    })
  }
}
