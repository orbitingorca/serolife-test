import * as Nano from 'nano'

interface RecipeInterface extends Nano.MaybeDocument {
    name: string,
    method: Array<string>
}

export class Recipe implements RecipeInterface {
    _id: string
    _rev: string
    name: string
    method: Array<string>
  
    constructor(name: string, method: Array<string>) {
      this._id = undefined
      this._rev = undefined
      this.name = name
      this.method = method
    }
}
