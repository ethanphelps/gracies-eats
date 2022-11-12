import React, { useContext } from "react";
import { RouteContext } from "../../context";
import "./RecipeView.tsx";

interface RecipeProps {
    id: string;
}

export const Recipe: React.FC = ({ id }: RecipeProps): React.ReactElement => {
    const routeContext = useContext(RouteContext);
    
    console.log('Available dynamic parameters: ', routeContext.params);

    return (
        <div className="recipe-container">
            <span>This is the recipe page for id {routeContext.params['recipeId']} with random id {routeContext.params['editParam']}</span>
        </div>
    );
};
