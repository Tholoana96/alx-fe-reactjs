import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecipeList from "src/components/RecipeList";
import AddRecipeForm from "src/components/AddRecipeForm";
import RecipeDetails from "src/components/RecipeDetails";

function App() {
  return (
    <Router>
      <div>
        <h1>Recipe Sharing App</h1>
        <AddRecipeForm />
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
