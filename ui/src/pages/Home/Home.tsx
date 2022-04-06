import AddRecipe from "../AddRecipe/AddRecipe";
import { Search } from "../Search/Search";
import "./home.css";

export const Home = () => {
  return (
    <div>
      <h1>Recipe App</h1>
      <Search></Search>
      <AddRecipe></AddRecipe>
    </div>
  );
};
