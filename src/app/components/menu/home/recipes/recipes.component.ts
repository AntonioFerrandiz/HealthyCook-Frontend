import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipesListPublished: any[] = []
  userID: number
  numberOfRecipes: number
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getListRecipesVerified()
    this.getNumberOfRecipes()
  }
  getListRecipesVerified():void{
    this.recipeService.getListRecipes().subscribe(data => {
      this.recipesListPublished = data;
      console.log(this.recipesListPublished);
    })
  }
  getNumberOfRecipes():void{
    this.recipeService.GetNumberOfRecipes().subscribe(data => {
      this.numberOfRecipes = data
    })
  }
}
