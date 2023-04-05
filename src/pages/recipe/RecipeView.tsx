import React, { useContext, useEffect, useState, CSSProperties } from "react";
import { RouteContext } from "../../context";
import { Ingredient, InstructionStep, NetworkError, Recipe } from "../../models/models";
import "./recipe.scss";
import { recipes } from "../../mocks/mock-recipes";
import { getConfig } from "../../config";
import { PacmanLoaderComponent } from "../../components/PacmanLoader";
import { ErrorComponent } from "../../components/Error";
import { IconButton } from "../landing/landing";
import { Back } from "../../inline-svgs";


const config = getConfig();
const username = 'graciecate@me.com';


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
    const [error, setError] = useState<NetworkError | null>(null);

    // make network call to get recipe data here
    useEffect(() => {
        const recipeId = routeContext.params.recipeId;
        // for(const recipe of recipes) {
        //     if(recipe.id == recipeId) {
        //         console.log(`Recipe ${recipeId} found!`)
        //         // setRecipeData(recipe);
        //         setTimeout(() => setRecipeData(recipe), 200)
        //     }
        // }
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`${config.API_URL}/users/${username}/recipes/${recipeId}`);
                console.log(response);
                if (response.status >= 300) {
                    switch (response.status) {
                        case 404:
                            setError({
                                status: response.status,
                                message: "Sorry, we couldn't find that recipe! Please try clicking the recipe again :)"
                            })
                            break;
                        default:
                            setError({
                                status: response.status,
                                message: response.statusText
                            })
                            break;
                    }
                } else {
                    const data = await response.json();
                    setRecipeData(data);
                }
            } catch(e) {
                console.log(e);
                setError({
                    status: 500,
                    message: "We're having trouble fetching your recipes right now :( Please try again later and let Ethan know!"
                })
            }
        }
        fetchRecipe();
    }, []);

    console.log('recipe data retrieved: ', recipeData);

    const instructionsClass = toggle === "instructions" ? "toggle-text selected" : "toggle-text";
    const ingredientsClass = toggle === "ingredients" ? "toggle-text selected" : "toggle-text";

    if (error) {
        return (
            <ErrorComponent error={error}></ErrorComponent>
        )
    } else if (!recipeData) {
        return (<PacmanLoaderComponent />);
    } else {
        return (
            <div id="recipe-container">
                <header id="recipe-title">
                    <div id="back-container">
                        <IconButton image={<Back/>} path="/"/>
                    </div>
                    {recipeData.name}
                </header>
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
                    <p> {recipeData.description} </p>
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
                                    <InstructionRow key={i} instruction={instruction} />
                                    {i == recipeData.instructions.length - 1 ? null : <Divider />}
                                </>
                            ))}
                        </div>
                        :
                        <div id="ingredients" className="item-list">
                            {recipeData.ingredients.map((ingredient: Ingredient, i: number) => (
                                <>
                                    <IngredientRow key={ingredient.id} ingredient={ingredient} />
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
