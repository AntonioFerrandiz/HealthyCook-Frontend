import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipesListPublished: any[] = []
  userID!: number
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getListRecipesVerified()
  }
  getListRecipesVerified():void{
    this.recipeService.getListRecipes().subscribe(data => {
      this.recipesListPublished = data;
      console.log(this.recipesListPublished);
    })
  }
}
