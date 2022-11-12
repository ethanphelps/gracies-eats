import React from "react";
import { Landing } from "./pages/landing/landing";
import { RecipeForm } from "./pages/add-recipe/RecipeForm";
import { Recipe } from "./pages/recipe/RecipeView";
import Route from "./components/Route";

const App: React.FC = (): React.ReactElement => {
    return (
        <>
            <Route path="/">
                <Landing />
            </Route>
            <Route path="/new">
                <RecipeForm />
            </Route>
            <Route path="/recipe/:recipeId">
                <Recipe />
            </Route>
            <Route path="/recipe/:recipeId/edit/:editParam">
                <Recipe />
            </Route>
        </>
    );
};

export default App;
