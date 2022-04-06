import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { useForm, SubmitHandler } from "react-hook-form";
import { ModifyRecipeService } from '../../services/ModifyRecipes/ModifyRecipesService';

import './AddRecipe.css';
import {Ingredient} from '../../interfaces/ingredient'

export default () => {
    const modifyRecipeService = new ModifyRecipeService();
    const emptyIngredient = {name: "", quantity: 0};
    const [newIngredient, setData] = useState([emptyIngredient]);
    const addIngredient = () => {
      newIngredient.push(emptyIngredient);
      setData(newIngredient);
    }

    type Inputs = {
        name: string,
        method: Array<string>,
        ingredients: Array<Ingredient>
    };
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
        modifyRecipeService.postNew(data);
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
            {/* register your input into the hook by invoking the "register" function */}
            <h2>Recipe Name</h2>
            <div>
              <input defaultValue="New Recipe" {...register("name", { required: true })} />
            </div>
            
            {/* include validation with required or other standard HTML validation rules */}
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
            {/* errors will return when field validation fails  */}
            {errors.name && <span>This field is required</span>}
            <h2>Method</h2>
            <div>
              <textarea {...register("method")} />
            </div>
            
            <input className="submit-button" value="Add Recipe" type="submit"/>
          </form>
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