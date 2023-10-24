import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/menu/home/home.component';
import { CreateRecipeComponent } from './components/menu/home/recipes/create-recipe/create-recipe.component';
import { RecipesFoundComponent } from './components/menu/home/recipes/recipes-found/recipes-found.component';
import { RecipesComponent } from './components/menu/home/recipes/recipes.component';
import { ViewRecipeComponent } from './components/menu/home/recipes/view-recipe/view-recipe.component';
import { RestaurantsComponent } from './components/menu/home/restaurants/restaurants.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { SearchRecipesComponent } from './components/menu/home/recipes/search-recipes/search-recipes.component';
import { HelpComponent } from './components/menu/home/recipes/help-seccion/help.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipes/view-recipe/:id', component: ViewRecipeComponent },
  { path: 'recipes/create-recipe', component: CreateRecipeComponent },
  { path: 'recipes/recipes-found', component: RecipesFoundComponent},
  { path: 'restaurants', component: RestaurantsComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'search', component: SearchRecipesComponent},
  { path: 'help', component: HelpComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
