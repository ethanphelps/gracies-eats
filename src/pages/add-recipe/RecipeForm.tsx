import React from "react";
import "./RecipeForm.scss";
import { IconButton } from "../landing/landing";

interface FormInputProps {
  title?: string;
  placeholder: string;
  initialHeight?: string;
  multiLine?: boolean;
}
const FormInput = ({
  title,
  placeholder,
  initialHeight,
  multiLine = false,
}: FormInputProps): React.ReactElement => {
  const inlineStyle = initialHeight ? { height: initialHeight } : {};

  // display textarea or input based on multiLine prop
  const input = multiLine ? (
    <textarea
      className="form-input"
      placeholder={placeholder}
      style={inlineStyle}
    ></textarea>
  ) : (
    <input className="form-input" placeholder={placeholder}></input>
  );

  // conditionally display label if title provided
  const label = title ? <h5 className="form-label">{title}</h5> : null;

  return (
    <div className="form-item">
      {label}
      {input}
    </div>
  );
};

export const RecipeForm: React.FC = (): React.ReactElement => {
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
        <FormInput
          title="Description"
          placeholder="A short, gustatory description in case you forget what the recipe is like!"
          multiLine={true}
          initialHeight="100px"
        />
      </section>
      <section className="form-row">
        <FormInput title="Serves" placeholder="2 people" />
      </section>
      <section className="form-row">
        <span>◈</span>
        <FormInput title="Ingredients" placeholder="Quanity" />
        <FormInput placeholder="Name" />
      </section>
      <section className="form-row">
        <span>+</span>
        <span>New</span>
      </section>
    </form>
    // </div>
  );
};
