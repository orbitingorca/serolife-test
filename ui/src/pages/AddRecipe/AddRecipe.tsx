import React from 'react';
import Popup from 'reactjs-popup';
import { useForm, SubmitHandler } from "react-hook-form";
import { ModifyRecipe } from '../../services/ModifyRecipes/ModifyRecipes';

import './AddRecipe.css';

export default () => {
    const newRecipe = new ModifyRecipe();
    type Inputs = {
        name: string,
        method: Array<string>,
    };
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log(data); 
        newRecipe.postNew(data);
    }
    return (
  <Popup
    trigger={<button className="button"> Open Modal </button>}
    modal
    nested
  >
    {(close: React.MouseEventHandler<HTMLButtonElement>) => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> Modal Title </div>
        <div className="content">
          {' '}
          <div className="wrapper">
      <h1>Entry new Recipe</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue="New Recipe" {...register("name", { required: true })} />
      
      {/* include validation with required or other standard HTML validation rules */}
      <textarea {...register("method")} />
      {/* errors will return when field validation fails  */}
      {errors.name && <span>This field is required</span>}
      
      <input type="submit"/>
    </form>
    </div>
        </div>
        <div className="actions">
          <Popup
            trigger={<button className="button"> Trigger </button>}
            position="top center"
            nested
          >
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
              magni omnis delectus nemo, maxime molestiae dolorem numquam
              mollitia, voluptate ea, accusamus excepturi deleniti ratione
              sapiente! Laudantium, aperiam doloribus. Odit, aut.
            </span>
          </Popup>
          <button
            className="button"
            onClick={(event) => {
              console.log('modal closed ');
              close(event);
            }}
          >
            close modal
          </button>
        </div>
      </div>
    )}
  </Popup>)
};