import React, { useState } from "react";
import "./RecipeForm.scss";
import { IconButton } from "../landing/landing";

interface FormInputProps {
  title?: string;
  placeholder: string;
  initialHeight?: string;
  multiLine?: boolean;
  flexGrow?: number;
  flexShrink?: number;
  maxWidth?: string;
  minWidth?: string;
}
const FormInput = ({
  title,
  placeholder,
  initialHeight,
  multiLine = false,
  flexGrow = 1,
  flexShrink = 1,
  maxWidth = null,
  minWidth = null,
}: FormInputProps): React.ReactElement => {
  let inlineStyle: any = initialHeight ? { height: initialHeight } : {};
  inlineStyle.maxWidth = maxWidth;
  inlineStyle.minWidth = minWidth;

  // display textarea or input based on multiLine prop
  const input = multiLine ? (
    <textarea
      className="form-input"
      placeholder={placeholder}
      style={inlineStyle}
    ></textarea>
  ) : (
    <input
      className="form-input"
      style={inlineStyle}
      placeholder={placeholder}
    ></input>
  );
  // conditionally display label if title provided
  const label = title ? <h5 className="form-label">{title}</h5> : null;
  const outerStyle = {
    flexGrow: flexGrow,
    flexShrink: flexShrink,
  };
  return (
    <div className="form-item" style={outerStyle}>
      {label}
      {input}
    </div>
  );
};

/**
 * Component for adding new row of a specific component type
 */
interface NewButtonProps {
  callback: (event: React.MouseEvent) => void;
}
const NewButton = ({ callback }: NewButtonProps): React.ReactElement => {
  return (
    <button className="new-button" onClick={callback}>
      <span>+</span>
      <span>New</span>
    </button>
  );
};

interface Ingredient {
  id: number;
  name: string;
  quantity: number;
}
interface InstructionStep {
  id: number;
  description: string;
  prePrep: boolean;
}

export const RecipeForm: React.FC = (): React.ReactElement => {
  // add ingredient components here whenever new button pressed
  // const ingredientList: Ingredient[] = [
  //   { id: 0, name: '', quantity: 0 }
  // ]
  const [ingredientList, setIngredientList] = useState<Ingredient[]>([
    { id: 0, name: "", quantity: 0 },
  ]);
  const [instructionList, setInstructionList] = useState<InstructionStep[]>([
    { id: 0, description: "", prePrep: false },
  ]);
  const IngredientRow = () => {
    return (
      <section className="form-list-row">
        <span>◈</span>
        <FormInput placeholder="Quantity" flexShrink={2} />
        <FormInput placeholder="Name" flexGrow={12} />
      </section>
    );
  };
  const InstructionRow = () => {
    return (
      <section className="form-list-row">
        <span>◈</span>
        <FormInput placeholder="Step One" flexGrow={12} />
        <FormInput placeholder="Pre-Prep?" maxWidth="100px" />
      </section>
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
          multiLine={true}
          initialHeight="100px"
        />
      </section>
      <section className="form-row">
        <FormInput title="Serves" placeholder="2 people" />
      </section>

      <section className="form-list">
        <h5 className="form-label">Ingredients</h5>
        {ingredientList.map((ingredient) => (
          <IngredientRow key={ingredient.id} />
        ))}
        <NewButton
          callback={(ev) => {
            ev.preventDefault(); // don't reload the page
            console.log("new button clicked!");
            // add new ingredient to list
            setIngredientList((ingredients) => [
              ...ingredients,
              { id: ingredientList.length, name: "", quantity: 0 },
            ]);
            console.log(ingredientList);
          }}
        />
      </section>

      <section className="form-list">
        <h5 className="form-label">Instructions</h5>
        {instructionList.map((step) => (
          <InstructionRow key={step.id} />
        ))}
        <NewButton
          callback={(ev) => {
            ev.preventDefault(); // don't reload the page
            console.log("new button clicked!");
            // add new instruction to list
            setInstructionList((instructions) => [
              ...instructions,
              { id: instructionList.length, description: "", prePrep: false },
            ]);
            console.log(instructionList);
          }}
        />
      </section>

      {/* <section className="form-row">
        <span>◈</span>
        <FormInput placeholder="Quanity" />
        <FormInput placeholder="Name" />
      </section> */}
      <section className="form-row"></section>
    </form>
    // </div>
  );
};
