import React from "react";
import './RecipeForm.scss'
import { IconButton } from "../landing/landing";

export const RecipeForm: React.FC = (): React.ReactElement => {
  interface FormInputProps {
    title: string;
    placeholder: string;
    initialHeight?: string;
  }
  const FormInput = ({title, placeholder, initialHeight }: FormInputProps): React.ReactElement => {
    const inlineStyle = initialHeight ? initialHeight : '';
    return (
        <div className="form-item" >
          <h5 className="form-label"> {title} </h5>
          <input type="text" className="form-input" placeholder={placeholder}></input>
        </div>
    )
  }

  return (
    // <div className="recipe-form-container">
      <form id="recipe-form">
        <header id="form-title">Create a New Recipe</header>
        <section className="form-row">
          <FormInput title="Title" placeholder="My Delicious Recipe" />
        </section>
        <section className="form-row">
          <FormInput title="Prep Time" placeholder="About 30 min" />
          <FormInput title="Cook Time" placeholder="About 45 min" />
        </section>
        <section className="form-row">
          <FormInput title="Description" placeholder="My Delicious Recipe" />
        </section>
      </form>
    // </div>
  )
}