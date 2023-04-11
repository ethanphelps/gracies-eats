import React from "react";
import { Landing } from "./pages/landing/Landing";
import { RecipeForm } from "./pages/add-recipe/RecipeForm";
import { RecipeView } from "./pages/recipe/RecipeView";
import { Login } from "./pages/login/Login";
import Route from "./components/Route";
import Protected from "./components/Protected";
// import { AuthProvider } from "./utils/auth";
import { AuthProvider } from "./utils/authContext";

const App: React.FC = (): React.ReactElement => {
    return (
        <>
            <AuthProvider>
                <Route path="/">
                    <Protected>
                        <Landing />
                    </Protected>
                </Route>
                <Route path="/new">
                    <Protected>
                        <RecipeForm />
                    </Protected>
                </Route>
                <Route path="/recipe/:recipeId">
                    <Protected>
                        <RecipeView />
                    </Protected>
                </Route>
                <Route path="/recipe/:recipeId/edit/:editParam">
                    <Protected>
                        <RecipeView />
                    </Protected>
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
            </AuthProvider>
        </>
    );
};

export default App;
