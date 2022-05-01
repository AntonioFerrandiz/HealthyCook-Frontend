
export class RecipeRating{
    recipeID: number;
    rating: number;
    

    constructor(recipeID: number, rating: number){
        this.recipeID = recipeID;
        this.rating = rating;
    }
}