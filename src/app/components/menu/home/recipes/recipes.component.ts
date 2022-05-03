import { Component, OnInit } from '@angular/core';
import { RecipeDetailsService } from 'src/app/services/recipe-details.service';
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
  recipesID: any[] = []
  recipesDetails: any[] = []
  constructor(private recipeService: RecipeService,
     private recipeDetailsService: RecipeDetailsService) { }

  ngOnInit(): void {
    this.numberOfRecipes = 0
    this.getListRecipesVerified()
    this.getNumberOfRecipes()
    const now = new Date()
    console.log(this.formatDate(now))
    
  }
  getListRecipesVerified():void{
    this.recipeService.getListRecipes().subscribe(data => {
      this.recipesListPublished = data;
      // console.log(this.recipesListPublished);
      console.log(data)
      for (let index = 0; index < data.length; index++) {
        this.recipesID.push(data[index].id)
        this.recipeDetailsService.GetRecipeDetails(data[index].id).subscribe(data => {
          this.recipesDetails.push(data)
          // console.log(this.recipesDetails)
        })
      }
      // console.log(this.recipesID)
    })
  }
  
  getNumberOfRecipes():void{
    this.recipeService.GetNumberOfRecipes().subscribe(data => {
      this.numberOfRecipes = data
    })
  }

  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
  
  formatDate(date: Date) {
    return (
      [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate()),
      ].join('-')
    );
  }
}
