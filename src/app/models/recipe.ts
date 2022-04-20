
export class Recipe{
    id?: number;
    name: string;
    description: string;
    preparation: string;

    constructor(name: string, description: string, preparation: string){
        this.name = name;
        this.description = description;
        this.preparation = preparation;
    }
}