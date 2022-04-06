import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { useForm, SubmitHandler } from "react-hook-form";
import { ModifyRecipeService } from '../../services/ModifyRecipes/ModifyRecipesService';

import './AddRecipe.css';
import {Ingredient} from '../../interfaces/ingredient'
import config from '../../config';

export default () => {
    const modifyRecipeService = new ModifyRecipeService();
    const emptyIngredient = {name: "", quantity: 0};
    const [newIngredient, setIngredients] = useState([emptyIngredient]);
    const [httpError, setHttpError] = useState("");
    const addIngredient = () => {
      newIngredient.push(emptyIngredient);
      setIngredients(newIngredient);
    }

    type Inputs = {
        name: string,
        method: Array<string>,
        ingredients: Array<Ingredient>
    };
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
      modifyRecipeService.postNew(data)
        .then(() => setHttpError(''))
        .catch(e => setHttpError(config.httpErrors[e.status as string] ? config.httpErrors[e.status]: e.statusText));
    }

    return (
  <Popup
    trigger={<button className="button">Add New Recipe</button>}
    modal
    nested
  >
    {(close: React.MouseEventHandler<HTMLButtonElement>) => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header">Add new recipe</div>
        <div className="content">
          {' '}
        <div className="wrapper">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Recipe Name</h2>
            <div>
              <input {...register("name", { required: true })} />
            </div>
            
            {errors.name && <span>This field is required</span>}
            <h2>Ingredients</h2>
            <div className="ingredient">
              <div><h4>Name</h4></div>
              <div><h4>Amount</h4></div>
            </div>
            <div>
              {newIngredient.map((_, index) => (
                <div className="ingredient">
                  <div><input {...register(`ingredients.${index}.name`)}></input></div>
                  <div><input {...register(`ingredients.${index}.quantity`)}></input></div>
                </div>
              ))}
            </div>
            <button onClick={addIngredient}>Add Ingredient</button>
            <h2>Method</h2>
            <div>
              <textarea {...register("method")} />
            </div>
            
            <input className="submit-button" value="Add Recipe" type="submit"/>
          </form>
          <div className="http-error">{httpError}</div>
        </div>
        </div>
        <div className="actions">
          <button
            className="button"
            onClick={(event) => {
              close(event);
            }}
          >
            Close 
          </button>
        </div>
      </div>
    )}
  </Popup>)
};