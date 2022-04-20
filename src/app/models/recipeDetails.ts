
export class RecipeDetails{
    recipeId?: number;
    preparationTime: number;
    timePeriod: string;
    servings: number;
    calories: number;
    difficulty: string;
    recipeVideoURL?: string;
    constructor(preparationTime: number, timePeriod:string, 
                servings: number, calories: number, difficulty: string,
                ){
        this.preparationTime = preparationTime;
        this.timePeriod = timePeriod;
        this.servings = servings;
        this.calories = calories;
        this.difficulty = difficulty;
    }
}