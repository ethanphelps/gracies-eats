import React from "react";
import "./RecipeForm.scss";
import { IconButton } from "../landing/landing";

export const RecipeForm: React.FC = (): React.ReactElement => {
  interface FormInputProps {
    title: string;
    placeholder: string;
    initialHeight?: string;
  }
  const FormInput = ({
    title,
    placeholder,
    initialHeight,
  }: FormInputProps): React.ReactElement => {
    const inlineStyle = initialHeight ? { height: initialHeight } : {};
    const wrapMode = initialHeight ? "on" : "off";
    return (
      <div className="form-item">
        <h5 className="form-label"> {title} </h5>
        <textarea
          className="form-input"
          placeholder={placeholder}
          style={inlineStyle}
          wrap={wrapMode}
        ></textarea>
      </div>
    );
  };

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
          initialHeight="100px"
        />
      </section>
      <section className="form-row">
        <FormInput title="Serves" placeholder="2 people" />
      </section>
    </form>
    // </div>
  );
};
