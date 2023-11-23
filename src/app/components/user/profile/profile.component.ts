import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ExcludedIngredients } from 'src/app/models/excludedIngredients';
import { ExcludedIngredientsService } from 'src/app/services/excluded-ingredients.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { RecipesSavedService } from 'src/app/services/recipes-saved.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { FollowerService } from "../../../services/follower.service";

import { MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../../menu/account/register-dialog/register-dialog.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  items = [];

  userData: any[] = []
  dateCreated: String
  formatedDate: String
  userID: number
  publishedRecipesCount: Number;
  publishedRecipesList: any[] = [];
  savedRecipesCount: Number;
  savedRecipe: any[] = []
  savedRecipesList: any[] = [];
  ingredientsExcludedCount: Number;
  ingredientsExcludedList: any[] = [];
  followers:any[]=[];
  dataExcludedIngredient: FormGroup;
  constructor(private fb: FormBuilder,
              private userService: UserServiceService,
              private recipeService: RecipeService,
              private recipesSaved: RecipesSavedService,
              private excludedIngredientService: ExcludedIngredientsService,
              private toastr: ToastrService,
              private followerService: FollowerService,
              public dialog: MatDialog,) {
    this.userID = 1
    this.dataExcludedIngredient = this.fb.group({
      excludedIngredient: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.publishedRecipesCount = 0
    this.savedRecipesCount = 0
    this.ingredientsExcludedCount = 0
    this.getUserInformation()
    this.getRecipesPublishedByUser()
    this.getRecipesSavedByUser()
    this.getExcludedIngredients()
    this.GetUserFollowers()
  }
  GetUserFollowers():void {
    this.followerService.getFollowerByUserID(localStorage.getItem("sesion")).subscribe(data => {
      this.followers = data
      this.items = this.followers;
      console.log(this.followers);
    })
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
    }, error => {
      this.toastr.error('Hubo un error, intenta más tarde.', 'Error')
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
      this.getRecipesSavedByUser()
    })
  }

  addExcludedIngredient(){
    const excludedIngredients: ExcludedIngredients = {
      ingredientName: this.dataExcludedIngredient.value.excludedIngredient,
    }

    this.excludedIngredientService.saveExcludedIngredients(excludedIngredients).subscribe(data => {
      this.toastr.success('El ingrediente se agrego a la lista de ingredientes excluidos')
      this.getExcludedIngredients()
    }, error => {
      if(error.status === 400){
        this.toastr.warning(`${excludedIngredients.ingredientName} ya se encuentra en tu lista`, 'Error')
      }else {
        this.toastr.error('Hubo un error, intenta más tarde.', 'Error')
      }
    })
  }
  getExcludedIngredients(){
    this.excludedIngredientService.GetListExcludedIngredientsByUser(this.userID).subscribe(data => {
      this.ingredientsExcludedList = data
      this.ingredientsExcludedCount = data.length
    })
  }
  deleteExcludedIngredient(excludedIngredientID:number){
    console.log(excludedIngredientID)
    this.excludedIngredientService.deleteExcludedIngredients(excludedIngredientID).subscribe(data =>{
      this.toastr.success('Ingrediente eliminado exitosamente de la lista de ingredientes excluidos', '')
      this.getExcludedIngredients()
    }, error => {
      this.toastr.error('Hubo un error, intenta más tarde.', 'Error')
    })
  }
  openRegisterDialog() {
    const dialogRef = this.dialog.open(RegisterDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); // resultado cuando se cierra
    });
  }
}
