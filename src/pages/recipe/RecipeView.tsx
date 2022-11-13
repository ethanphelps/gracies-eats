import React, { useContext, useState } from "react";
import { RouteContext } from "../../context";
import "./recipe.scss";

interface RecipeProps {
    id: string;
}

export const Recipe: React.FC = ({ id }: RecipeProps): React.ReactElement => {
    const routeContext = useContext(RouteContext);
    const [toggle, setToggle] = useState('instructions');
    const instructionsClass = toggle === 'instructions' ? "toggle-text selected" : "toggle-text";
    const ingredientsClass = toggle === 'ingredients' ? "toggle-text selected" : "toggle-text";
    
    console.log('Available dynamic parameters: ', routeContext.params);

    return (
        <div id="recipe-container">
            <header id="recipe-title">Drunken Noodles</header>
            <section id="recipe-details">
                <div className="info-item">
                    Serves: <span>{2}</span>
                </div>
                <div className="info-item">
                    Prep: <span>{"15 min"}</span>
                </div>
                <div className="info-item">
                    Cook: <span>{"30 min"}</span>
                </div>
            </section>
            <section id="recipe-description">
                <p>
                    {'Yummy drunken noodles that get cooked in our big wok pan! Its filled with love and heat.'}
                </p>
            </section>
            {/* <span>This is the recipe page for id {routeContext.params['recipeId']} with random id {routeContext.params['editParam']}</span> */}
            <div id="ingredients-instructions-toggle">
                <div id="instructions" className="toggle-item">
                    <div className={instructionsClass} onClick={() => setToggle('instructions')}>Instructions</div>
                </div>
                <div id="ingredients" className="toggle-item">
                    <div className={ingredientsClass} onClick={() => setToggle('ingredients')}>Ingredients</div>
                </div>
            </div>

            <section></section>
        </div>
    );
};
