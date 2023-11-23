export class Comment {
    id: number;
    username: string;
    message: string;
    recipeID: number;
    recipe: RecipeAux;
    dateCreated: string;
  
    constructor(id: number, username: string, message: string, recipeID: number, recipe: RecipeAux, dateCreated: string) {
      this.id = id;
      this.username = username;
      this.message = message;
      this.recipe = recipe;
      this.recipeID = recipeID;
      this.dateCreated = dateCreated;
    }
  }
  
  export class RecipeAux {
    id: number;
  
    constructor(id: number) {
      this.id = id;
    }
  }
  