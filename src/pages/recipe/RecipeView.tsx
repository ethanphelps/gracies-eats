import React, { useContext, useEffect, useState } from "react";
import { RouteContext } from "../../context";
import { Ingredient, InstructionStep, Recipe } from "../../models/models";
import "./recipe.scss";
import { recipes } from "../../mocks/mock-recipes";

const IngredientRow: React.FC = ({
    ingredient,
}: {
    ingredient: Ingredient;
}): React.ReactElement => {
    return (
        <section className="list-row">
            <span>◈</span>
            <span>{ingredient.quantity}</span>
            <span>{ingredient.name}</span>
        </section>
    );
};

export const RecipeView: React.FC = (): React.ReactElement => {
    const routeContext = useContext(RouteContext);
    const [toggle, setToggle] = useState("instructions");
    const [recipeData, setRecipeData] = useState<Recipe | null>(null);
    // let recipeData: Recipe | null = null;

    // make network call to get recipe data here
    useEffect(() => {
        const recipeId = routeContext.params.recipeId;
        for(const recipe of recipes) {
            if(recipe.id == recipeId) {
                console.log(`Recipe ${recipeId} found!`)
                // recipeData = recipe;
                setRecipeData(recipe);
            }
        }
        if(!recipeData) {
            console.log('Recipe not found!');
        }
    }, []);

    const instructionsClass =
        toggle === "instructions" ? "toggle-text selected" : "toggle-text";
    const ingredientsClass =
        toggle === "ingredients" ? "toggle-text selected" : "toggle-text";

    console.log("Available dynamic parameters: ", routeContext.params);

    return (
        <div id="recipe-container">
            <header id="recipe-title">{recipeData ? recipeData.title : 'loading'}</header>
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
                    {
                        "Yummy drunken noodles that get cooked in our big wok pan! Its filled with love and heat."
                    }
                </p>
            </section>
            {/* <span>This is the recipe page for id {routeContext.params['recipeId']} with random id {routeContext.params['editParam']}</span> */}
            <div id="ingredients-instructions-toggle">
                <div id="instructions" className="toggle-item">
                    <div
                        className={instructionsClass}
                        onClick={() => setToggle("instructions")}
                    >
                        Instructions
                    </div>
                </div>
                <div id="ingredients" className="toggle-item">
                    <div
                        className={ingredientsClass}
                        onClick={() => setToggle("ingredients")}
                    >
                        Ingredients
                    </div>
                </div>
            </div>

            <section id="instructions-ingredients-container">
                <div id="instructions" className="item-list"></div>
                <div id="ingredients" className="item-list"></div>
            </section>
        </div>
    );
};
