import * as Nano from 'nano'
import {Ingredient} from '../interfaces/ingredient';

interface RecipeInterface extends Nano.MaybeDocument {
    name: string,
    method: Array<string>
}

export class Recipe implements RecipeInterface {
    _id: string
    _rev: string
    name: string
    method: Array<string>
    ingredients: Array<Ingredient>
  
    constructor(body) {
      this._id = undefined;
      this._rev = undefined;
      this.name = body.name;
      this.method = body.method;
      this.ingredients = body.ingredients;
    }
}
