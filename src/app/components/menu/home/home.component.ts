import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RecipeService } from 'src/app/services/recipe.service';

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
  constructor(private toastr: ToastrService,
    private router: Router, private recipeService: RecipeService) {
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

  addIngredient():void{
    this.ingredients.push(this.ingredient)
    console.log(this.ingredients)
  }
  removeIngredient(ingredient: Ingredient):void{
   const i = this.ingredients.indexOf(ingredient) 
   if (i >= 0){
     this.ingredients.splice(i, 1)
   }
  }

  getLastFiveRecipes():void{
    this.recipeService.GetLastFiveRecipes().subscribe(data => {
      this.recipeList = data;
    })
  }
}
