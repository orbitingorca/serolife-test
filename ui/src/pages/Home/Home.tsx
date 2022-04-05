import AddRecipe from "../AddRecipe/AddRecipe";
import { Search } from "../Search/Search";
import "./home.css";

export const Home = () => {
  return (
    <div>
      <h1>Recipe App</h1>
      <h2>Search</h2>
      <Search></Search>
      <h2>Add</h2>
      <AddRecipe></AddRecipe>
    </div>
  );
};
