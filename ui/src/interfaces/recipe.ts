import { Ingredient } from "./ingredient";

export interface Recipe {
    name: string;
    method: Array<string>;
    ingredients: Array<Ingredient>
}