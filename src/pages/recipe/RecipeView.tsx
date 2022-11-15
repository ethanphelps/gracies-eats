import React, { useContext, useEffect, useState, CSSProperties } from "react";
import { RouteContext } from "../../context";
import { Ingredient, InstructionStep, Recipe } from "../../models/models";
import "./recipe.scss";
import { recipes } from "../../mocks/mock-recipes";
import { PacmanLoader } from "react-spinners";

const spinnerCSS: CSSProperties = {
    top: "-30px",
    left: "-35px"
}

const IngredientRow = ({
    ingredient,
}: {
    ingredient: Ingredient;
}): React.ReactElement => {
    return (
        <section className="list-row">
            <div className="list-icon">◈</div>
            <div>{ingredient.quantity.toString() + ' ' + ingredient.name}</div>
        </section>
    );
};
const InstructionRow = ({
    instruction,
}: {
    instruction: InstructionStep;
}): React.ReactElement => {
    return (
        <section className="list-row">
            <div className="list-number">{instruction.id}.</div>
            <div>{instruction.description}</div>
        </section>
    );
};

const Divider = (): React.ReactElement => <div className="divider"></div>


export const RecipeView = (): React.ReactElement => {
    const routeContext = useContext(RouteContext);
    const [toggle, setToggle] = useState("instructions");
    const [recipeData, setRecipeData] = useState<Recipe | null>(null);

    // make network call to get recipe data here
    useEffect(() => {
        const recipeId = routeContext.params.recipeId;
        for(const recipe of recipes) {
            if(recipe.id == recipeId) {
                console.log(`Recipe ${recipeId} found!`)
                // setRecipeData(recipe);
                setTimeout(() => setRecipeData(recipe), 200)
            }
        }
        if(!recipeData) {
            console.log('Recipe not found!');
        }
    }, []);

    const instructionsClass = toggle === "instructions" ? "toggle-text selected" : "toggle-text";
    const ingredientsClass = toggle === "ingredients" ? "toggle-text selected" : "toggle-text";

    if(!recipeData) {
        return (
            <div id="loader-container">
                <PacmanLoader size={30} color="#3b427d" cssOverride={spinnerCSS}></PacmanLoader>
            </div>
        );
    } else {
        return (
            <div id="recipe-container">
                <header id="recipe-title">{recipeData.title}</header>
                <section id="recipe-details">
                    <div className="info-item">
                        Serves: <span>{recipeData.serves}</span>
                    </div>
                    <div className="info-item">
                        Prep: <span>{recipeData.prepTime}</span>
                    </div>
                    <div className="info-item">
                        Cook: <span>{recipeData.cookTime}</span>
                    </div>
                </section>
                <section id="recipe-description">
                    <p> { recipeData.description } </p>
                </section>
                <div id="ingredients-instructions-toggle">
                    <div id="instructions" className="toggle-item">
                        <div className={instructionsClass} onClick={() => setToggle("instructions")} >
                            Instructions
                        </div>
                    </div>
                    <div id="ingredients" className="toggle-item">
                        <div className={ingredientsClass} onClick={() => setToggle("ingredients")} >
                            Ingredients
                        </div>
                    </div>
                </div>

                <section id="instructions-ingredients-container">
                    {toggle === "instructions" ? 
                        <div id="instructions" className="item-list">
                            {recipeData.instructions.map((instruction: InstructionStep, i: number) => (
                                <>
                                    <InstructionRow key={instruction.id} instruction={instruction}/>
                                    {i == recipeData.instructions.length - 1 ? null : <Divider />}
                                </>
                            ))}
                        </div>
                    :
                        <div id="ingredients" className="item-list">
                            {recipeData.ingredients.map((ingredient: Ingredient, i: number) => (
                                <>
                                    <IngredientRow key={ingredient.id} ingredient={ingredient}/>
                                    {i == recipeData.ingredients.length - 1 ? null : <Divider />}
                                </>
                            ))}
                        </div>
                    }
                </section>
            </div>
        );
    }
};
