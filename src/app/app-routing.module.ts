import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/menu/home/home.component';
import { RecipesComponent } from './components/menu/home/recipes/recipes.component';
import { ViewRecipeComponent } from './components/menu/home/recipes/view-recipe/view-recipe.component';
import { RestaurantsComponent } from './components/menu/home/restaurants/restaurants.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipes/view-recipe/:id', component: ViewRecipeComponent },
  { path: 'restaurants', component: RestaurantsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
