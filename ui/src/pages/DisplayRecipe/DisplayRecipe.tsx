import React, { useState, useEffect } from "react";
import config from "../../config";

export default function DisplayRecipe(props: any) {
  const [method, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const resp = await fetch(`${config.api.recipesUrl}${props.recipe}`);
    if (resp.ok) {
        const data = await resp.json();
        setData(data.method);
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
      <div>
      <div>{method.map(m => <div>{m}</div>)}</div>
      </div>
  )
}
