
export class Recipe{
    id?: number;
    name: string;
    description: string;
    preparation: string;
    dateCreated: string;
    constructor(name: string, description: string, preparation: string, dateCreated: string){
        this.name = name;
        this.description = description;
        this.preparation = preparation;
        this.dateCreated = dateCreated;
    }
}