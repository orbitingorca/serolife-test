import React, { useState, useEffect } from "react";
import config from "../../config";
import { Ingredient } from "../../interfaces/ingredient";

export default function DisplayRecipe(props: any) {
  const [name, setName] = useState([]);
  const [method, setMethod] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const resp = await fetch(`${config.api.recipesUrl}${props.recipe}`);
    if (resp.ok) {
        const data = await resp.json();
        setName(data.name);
        setMethod(data.method);
        setIngredients(data.ingredients);
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

      return <div>
        <h2>{name}</h2>
        <div>{ingredients.map((i: Ingredient) => <div><span>{i.name}</span><span>{i.quantity}</span></div>)}</div>
        <div>{method.map(m => <div>{m}</div>)}</div>
      </div>
}
