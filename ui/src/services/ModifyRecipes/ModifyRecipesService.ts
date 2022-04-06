import config from "../../config";
import {Recipe} from "../../interfaces/recipe"
export class ModifyRecipeService {

    postNew(data: any) {
        const recipe: Recipe = {
            name: data.name,
            method: data.method.split("\n"),
            ingredients: data.ingredients
        }
        return this.postData(config.api.recipesUrl, recipe);
    }

    private async postData(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
        if (response.ok) {
            return response.json();
        } else {
            throw(response);
        }
    }
}