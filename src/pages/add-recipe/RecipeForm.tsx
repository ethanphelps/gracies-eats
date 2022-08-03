import React from "react";
import './RecipeForm.scss'
import { IconButton } from "../landing/landing";

export const RecipeForm: React.FC = (): React.ReactElement => {
  return (
    // <div className="recipe-form-container">
      <form id="recipe-form">
        <header id="form-title">Create a New Recipe</header>
        <section className="form-row">
          this is a form row
        </section>
      </form>
    // </div>
  )
}