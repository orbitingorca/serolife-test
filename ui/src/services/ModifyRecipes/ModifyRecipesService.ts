import config from "../../config.js";
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

    async postData(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }
}