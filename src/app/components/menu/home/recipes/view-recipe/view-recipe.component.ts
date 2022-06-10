import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RecipeRating } from 'src/app/models/recipe-rating';
import { RecipesSaved } from 'src/app/models/recipes-saved';
import { RecipeDetailsService } from 'src/app/services/recipe-details.service';
import { RecipeRatingService } from 'src/app/services/recipe-rating.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { RecipesSavedService } from 'src/app/services/recipes-saved.service';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[1]);
  starRating = 0;
  hovered = 0;
  avg: number
  recipeID: number;
  recipeName: string;
  recipe: any[] = []
  recipeDetails: any[] = []
  ratingRecipeForm = new FormControl(null, Validators.required);

  constructor(private recipeService: RecipeService, private recipeDetailsService: RecipeDetailsService,
    private aRoue: ActivatedRoute,
    private fb: FormBuilder,
    private recipeRatingService: RecipeRatingService,
    private recipesSavedService: RecipesSavedService,
    private toastr: ToastrService,) {
    this.recipeID = +this.aRoue.snapshot.paramMap.get('id');

  }

  ngOnInit(): void {
    this.getRecipe()
    this.getRecipeDetails()
    this.getRecipeRatingList()
    this.getAverageRatingOfRecipe()
  }
  saveRating(): void {
    if (this.ratingRecipeForm.value == null) {
    } else {
      const recipeRating: RecipeRating = {
        recipeID: this.recipeID,
        rating: this.ratingRecipeForm.value
      }
      this.recipeRatingService.saveRecipeRating(recipeRating).subscribe(data => {
        this.toastr.success('Gracias por calificar', '')
        this.getAverageRatingOfRecipe();
      }, error => {
        console.log(error)
      })
    }

  }
  getRecipe(): void {
    this.recipeService.GetRecipeByID(this.recipeID).subscribe(data => {
      this.recipeName = data['name']
      console.log(this.recipeName)
      this.recipe = data
      console.log(this.recipe)
    })
  }

  getRecipeDetails(): void {
    this.recipeDetailsService.GetRecipeDetails(this.recipeID).subscribe(data => {

      this.recipeDetails = data;
      console.log(this.recipeDetails)
    })
  }

  getRecipeRatingList(): void {
    this.recipeRatingService.GetRatingByRecipe(this.recipeID).subscribe(data => {
      // console.log(data)
    })
  }

  getAverageRatingOfRecipe(): void {
    this.recipeRatingService.GetAverageRatingOfRecipe(this.recipeID).subscribe(data => {
      this.avg = data;
      this.starRating = data;
      // console.log(this.starRating)
    })
  }

  saveRecipe(): void {
    const recipesSaved: RecipesSaved = {
      recipeSavedID: this.recipeID,
    }
    console.log(recipesSaved)
    this.recipesSavedService.saveRecipesSaved(recipesSaved).subscribe(data => {
      this.toastr.success('Receta guardada exitosamente', '')
      console.log(data)
    }, error => {
      console.log(error)
    })
  }

  createPdf() {
    var recipeDetails = this.recipeDetails['ingredientTypes']
    var typeIngredients = recipeDetails.map(function (x) {
      return x
    })
    var ingredientsList = typeIngredients.map(function (x) {
      return x.ingredientsList
    })
    const ingredientTypeLength = []
    const ingredients = []
    var y = ''
    for (let i = 0; i < ingredientsList.length; i++) {
      ingredientTypeLength.push(ingredientsList[i].length)
      for (let k = 0; k < ingredientTypeLength[i]; k++) {
        y = '- ' + ingredientsList[i][k].quantity + ' ' + ingredientsList[i][k].unit + ' de ' + ingredientsList[i][k].name
        ingredients.push(y)

      }
    }

    console.log('1)', typeIngredients)
    console.log('2)', ingredientsList)

    const pdfDefinition: any = {
      content: [
        {
          text: this.recipe['user']['username'],
          fontSize: 12,
        },
        {
          text: this.recipe['name'],
          fontSize: 32,
          decoration: 'underline',
          decorationColor: '#E74E00',
          margin: [0, 0, 0, 12]
        },
        {
          alignment: 'justify',
          columns: [
            {
              text: 'Descripción:',
              bold: true,
              fontSize: 18,
              margin: [0, 16, 0, 8]
            },
            {
              text: 'Ingredientes:',
              bold: true,
              fontSize: 18,
              margin: [0, 16, 0, 8]
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              text: this.recipe['description'],
            },
            {
              text: ingredients.join('\n'),
            }
          ]
        },
        {
          text: 'Detalles de la receta',
          bold: true,
          fontSize: 18,
          margin: [0, 16, 0, 8]
        },
        {
          table: {
            body: [
              ['Dificultad', 'Porciones', 'Tiempo de preparación', 'Calorías'],
              [
                this.recipeDetails['difficulty'],
                this.recipeDetails['servings'],
                this.recipeDetails['preparationTime'] + ' ' + this.recipeDetails['timePeriod'],
                this.recipeDetails['calories'] + ' cal'
              ]
            ]
          }
        },
        {
          text: 'Preparación',
          bold: true,
          fontSize: 18,
          margin: [0, 16, 0, 8]
        },
        {
          text: this.recipe['preparation']
        }
      ],
      defaultStyle: {
        columnGap: 20
      }
    }
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open()
  }
}
