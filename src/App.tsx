import React from "react";
import { Landing } from "./pages/landing/landing";
import { RecipeForm } from "./pages/add-recipe/RecipeForm";
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
    </>
  );
};

export default App;
