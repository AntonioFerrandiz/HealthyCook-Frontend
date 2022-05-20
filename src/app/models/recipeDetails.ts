import { IngredientTypes } from "./ingredient-types";

export class RecipeDetails {
    recipeId?: number;
    preparationTime: number;
    timePeriod: string;
    servings: number;
    calories: number;
    difficulty: string;
    recipeVideoURL?: string;
    ingredientTypes: IngredientTypes[]

    constructor(preparationTime: number, timePeriod: string,
        servings: number, calories: number, difficulty: string,
        ingredientTypes: IngredientTypes[]) {
        this.preparationTime = preparationTime;
        this.timePeriod = timePeriod;
        this.servings = servings;
        this.calories = calories;
        this.difficulty = difficulty;
        this.ingredientTypes = ingredientTypes;
    }
}