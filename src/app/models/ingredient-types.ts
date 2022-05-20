import { Ingredient } from "./ingredient";

export class IngredientTypes{
    name: string;
    ingredientsList: Ingredient[];

    constructor(name: string, ingredientsList: Ingredient[] ){
        this.name = name;
        this.ingredientsList = ingredientsList;
    }
}