import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './components/menu/menu.component';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/menu/home/home.component';
import { SharedModule } from './shared/shared.module';
import { RecipesComponent } from './components/menu/home/recipes/recipes.component';
import { RestaurantsComponent } from './components/menu/home/restaurants/restaurants.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewRecipeComponent } from './components/menu/home/recipes/view-recipe/view-recipe.component';
import { CreateRecipeComponent } from './components/menu/home/recipes/create-recipe/create-recipe.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RecipesFoundComponent } from './components/menu/home/recipes/recipes-found/recipes-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    UserComponent,
    RecipesComponent,
    RestaurantsComponent,
    ViewRecipeComponent,
    CreateRecipeComponent,
    ProfileComponent,
    RecipesFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule, HttpClientModule, NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
