import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RecipeService } from 'src/app/services/recipe.service';
import { RecipesSavedService } from 'src/app/services/recipes-saved.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: any[] = []
  dateCreated: String
  formatedDate: String
  userID: number
  publishedRecipesCount: Number;
  publishedRecipesList: any[] = [];
  savedRecipesCount: Number;
  savedRecipe: any[] = []
  savedRecipesList: any[] = [];
  constructor(private userService: UserServiceService,
              private recipeService: RecipeService,
              private recipesSaved: RecipesSavedService,
              private toastr: ToastrService) { 
    this.userID = 1
  }

  ngOnInit(): void {
    this.getUserInformation()
    this.getRecipesPublishedByUser()
    this.getRecipesSavedByUser()
  }
  getUserInformation():void {
    this.userService.SearchUser(this.userID).subscribe(data => {
      this.userData = data
      this.dateCreated = data['dateCreated'].toString().split('T')
      this.formatedDate = this.dateCreated[0]
    })
  }
  getRecipesPublishedByUser():void{
    this.recipeService.GetListRecipesPublishedByUser(this.userID).subscribe(data => {
      this.publishedRecipesCount = data.length
      this.publishedRecipesList = data
      
    })
  }
  deleteRecipe(recipeID:number):void{
    this.recipeService.deleteRecipe(recipeID).subscribe(data=>{
      this.toastr.success('Receta eliminada exitosamente', '')
      this.getRecipesPublishedByUser()
    })
  }
  getRecipesSavedByUser():void{
    this.recipesSaved.GetRecipesSavedByUserID(this.userID).subscribe(data => {
      this.savedRecipesCount = data.length
      this.savedRecipe = data
      console.log(data)
      for (let i = 0; i < data.length; i++) {
        this.recipeService.GetRecipeByID(data[i].recipeSavedID).subscribe(data => {
          this.savedRecipesList.push(data)
        })
      }
    })
  }

  deleteRecipeSaved(recipeSavedID: number):void{
    this.recipesSaved.RemoveRecipeSaved(recipeSavedID).subscribe(data => {
      this.toastr.success('Receta eliminada exitosamente de la lista de favoritos', '')     
    })
  }
}
