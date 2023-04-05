import React, { useState, useRef } from "react";
import "./RecipeForm.scss";
import { IconButton } from "../landing/landing";
import { CreateRecipeResponse, Ingredient, InstructionStep } from "../../models/models";
import { getConfig } from "../../config";
import { RecipeLoaderComponent } from "../../components/RecipeLoader";
import { Back } from "../../inline-svgs";

const config = getConfig();

interface FormInputProps {
  title?: string;
  placeholder: string;
  initialHeight?: string;
  multiLine?: boolean;
  flexGrow?: number;
  flexShrink?: number;
  maxWidth?: string;
  minWidth?: string;
  setState: React.ChangeEventHandler;
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
  setState,
}: FormInputProps): React.ReactElement => {
  let inlineStyle: any = initialHeight ? { height: initialHeight } : {};
  inlineStyle.maxWidth = maxWidth;
  inlineStyle.minWidth = minWidth;

  // const changeHandler = (event: React.ChangeEvent) => {
  //   setState((event.target as HTMLInputElement).value);
  // };

  // display textarea or input based on multiLine prop
  const input = multiLine ? (
    <textarea
      className="form-input"
      placeholder={placeholder}
      style={inlineStyle}
      onChange={setState}
    ></textarea>
  ) : (
    <input
      className="form-input"
      style={inlineStyle}
      placeholder={placeholder}
      onChange={setState}
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

/**
 * Custom checkbox to match styling. Title should only be non-null if on the first row
 */
const CheckBox = ({
  title,
  id,
  state,
  setState,
}: {
  title: string;
  id: number;
  state: InstructionStep[];
  setState: React.Dispatch<React.SetStateAction<InstructionStep[]>>;
}): React.ReactElement => {
  const ref = useRef(null);
  const label = title ? <h5 className="form-label">{title}</h5> : null;
  const input = (
    <input
      type="checkbox"
      className="pre-prep"
      onChange={(event: React.ChangeEvent) =>
        setState((instructions) =>
          instructions.map((instruction) =>
            instruction.id == id
              ? {
                  id: id,
                  description: state[id].description,
                  prePrep: ref.current.checked,
                }
              : instruction
          )
        )
      }
      ref={ref}
    ></input>
  );
  return (
    <div className="checkbox">
      {label}
      {input}
    </div>
  );
};


/**
 * Custom File Input component that overrides the difficult-to-style input type="file" element.
 * This is achieved by setting the default input element's visibility to hidden and width to zero
 * and then creating a custom button whose click handler programmatically clicks the input element.
 * The file name is displayed using an onChange handler on the input element that sets the button's
 * text to name of the chosen file.
 */
interface FileInputProps {
  text: string,
  setFile: (file: any) => void,
  setFileName: (fileName: string) => void
}
const FileInput = ({ text, setFile, setFileName }: FileInputProps): React.ReactElement => {
  const ref = useRef(null);
  const [buttonText, setButtonText] = useState(text);
  const click = (event: React.MouseEvent) => {
    event.preventDefault();
    ref.current.click(); // click the file input
    console.log(event.target);
  };
  const fileChosen = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileName = event.target.value.split("\\").at(-1);
    const file = event.target.files[0];
    setFile(file);
    setFileName(fileName);
    setButtonText(fileName);
  };
  return (
    <section className="form-row">
      <div className="form-item">
        <h5 className="form-label">Cover Image</h5>
        <input
          type="file"
          ref={ref}
          id="cover-image-upload"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            fileChosen(event)
          }
        ></input>
        <button id="custom-file-button" onClick={click}>
          {buttonText}
        </button>
      </div>
    </section>
  );
};


/**
 * Ingredient Row component for rendering list of ingredients in new recipe form. Can't be declared inside of 
 * the RecipeForm component setting the state of the ingredient list triggers a rerender of the entire form
 * component which de-focuses the ingredient row input every time a key is typed.
 */
const IngredientFormRow = ({
  id,
  setState,
}: {
  id: number;
  setState: React.Dispatch<React.SetStateAction<Ingredient[]>>;
}) => {
  return (
    <section className="form-list-row">
      <span>◈</span>
      <FormInput
        placeholder="Quantity"
        flexShrink={2}
        setState={(event: React.ChangeEvent) =>
          setState((ingredients: Ingredient[]) =>
            ingredients.map((ingredient) =>
              ingredient.id == id
                ? {
                    id: id,
                    name: ingredient.name,
                    quantity: Number((event.target as HTMLInputElement).value),
                  }
                : ingredient
            )
          )
        }
      />
      <FormInput
        placeholder="Name"
        flexGrow={12}
        setState={(event: React.ChangeEvent) =>
          setState((ingredients) =>
            ingredients.map((ingredient) =>
              ingredient.id == id
                ? {
                    id: id,
                    name: (event.target as HTMLInputElement).value,
                    quantity: ingredient.quantity,
                  }
                : ingredient
            )
          )
        }
      />
    </section>
  );
};

/**
 * Instruction Row component for rendering list of instructions in new recipe form. Can't be declared inside of 
 * the RecipeForm component setting the state of the instruction list triggers a rerender of the entire form
 * component which de-focuses the instruction row input every time a key is typed.
 */
const InstructionRow = ({
  id,
  setState,
  instructionList,
}: {
  id: number;
  setState: React.Dispatch<React.SetStateAction<InstructionStep[]>>;
  instructionList: InstructionStep[];
}) => {
  const title = id === 0 ? "Pre-Prep?" : null;
  return (
    <section className="form-list-row">
      <span>◈</span>
      <FormInput
        placeholder={"Step " + (id + 1)}
        flexGrow={1}
        setState={(event: React.ChangeEvent) =>
          setState((instructions) =>
            instructions.map((instruction) =>
              instruction.id == id
                ? {
                    id: id,
                    description: (event.target as HTMLInputElement).value,
                    prePrep: instruction.prePrep,
                  }
                : instruction
            )
          )
        }
      />
      <CheckBox
        title={title}
        id={id}
        state={instructionList}
        setState={setState}
      />
    </section>
  );
};


export const RecipeForm: React.FC = (): React.ReactElement => {
  const [ingredientList, setIngredientList] = useState<Ingredient[]>([
    { id: 0, name: "", quantity: 0 },
  ]);
  const [instructionList, setInstructionList] = useState<InstructionStep[]>([
    { id: 0, description: "", prePrep: false },
  ]);
  const [name, setName] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [description, setDescription] = useState("");
  const [serves, setServes] = useState(0);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImageName, setCoverImageName] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  // sends recipe to API and uploads image to S3 bucket
  const submitRecipe = async (event: React.MouseEvent) => {
    event.preventDefault();
    setLoading(true);
    // console.log(event);
    const recipeData = {
      name: name,
      prepTime: prepTime,
      cookTime: cookTime,
      description: description,
      serves: serves,
      ingredients: ingredientList,
      instructions: instructionList,
    };

    console.log('Recipe form data: ', recipeData);
    const user = 'graciecate@me.com';
    try {
      const response = await fetch(`${config.API_URL}/users/${user}/recipes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipeData),
      })
      const recipeResponse = await response.json() as CreateRecipeResponse;
      
      // upload recipe image to S3 using pre-signed url from create recipe response
      const presignedUrlData = recipeResponse['presignedUrlData'];
      const formData = new FormData();
      for(const key of Object.keys(presignedUrlData.fields)) {
        formData.append(key, presignedUrlData.fields[key]);
      }
      formData.append('file', coverImage);

      const s3UploadResponse = await fetch(presignedUrlData.url, {
        method: 'POST',
        body: formData
      });
      console.log(s3UploadResponse);
      setLoading(false);

      // if successful, redirect user to the new recipe page using the recipeId
      window.history.pushState({}, "", `recipe/${recipeResponse.recipeId.toString()}`) // update url
      const navEvent = new PopStateEvent('popstate');
      window.dispatchEvent(navEvent);
    } catch(e) {
      console.log('Error creating recipe: ', e);
      // set error state here that shows an error page asking them to submit the recipe again 
      setLoading(false);
    }
  };

  if(isLoading) {
    return (
      <RecipeLoaderComponent />
    )
  }

  return (
    <form id="recipe-form">
      <header id="form-title">
        <div id="back-container-new-recipe">
          <IconButton image={<Back/>} path="/"/>
        </div>
        Create a New Recipe
      </header>
      <section className="form-row">
        <FormInput
          title="Title"
          placeholder="My Delicious Recipe"
          setState={(event: React.ChangeEvent) =>
            setName((event.target as HTMLInputElement).value)
          }
        />
      </section>
      <section className="form-row">
        <FormInput
          title="Prep Time"
          placeholder="About 30 min"
          setState={(event: React.ChangeEvent) =>
            setPrepTime((event.target as HTMLInputElement).value)
          }
        />
        <FormInput
          title="Cook Time"
          placeholder="About 45 min"
          setState={(event: React.ChangeEvent) =>
            setCookTime((event.target as HTMLInputElement).value)
          }
        />
      </section>
      <section className="form-row">
        <FormInput
          title="Description"
          placeholder="A short, gustatory description in case you forget what the recipe is like!"
          multiLine={true}
          initialHeight="100px"
          setState={(event: React.ChangeEvent) =>
            setDescription((event.target as HTMLInputElement).value)
          }
        />
      </section>
      <section className="form-row">
        <FormInput
          title="Serves"
          placeholder="2 people"
          setState={(event: React.ChangeEvent) =>
            setServes(Number((event.target as HTMLInputElement).value))
          }
        />
      </section>

      <section className="form-list">
        <h5 className="form-label">Ingredients</h5>
        {ingredientList.map((ingredient) => (
          <IngredientFormRow
            id={ingredient.id}
            key={ingredient.id}
            setState={setIngredientList}
          />
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
          <InstructionRow
            id={step.id}
            key={step.id}
            setState={setInstructionList}
            instructionList={instructionList}
          />
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
          }}
        />
      </section>

      <FileInput text="+ Upload Image" setFile={setCoverImage} setFileName={setCoverImageName}/>

      <section className="form-row" id="submit-row">
        <button id="recipe-submit" onClick={submitRecipe}>
          Create
        </button>
      </section>
    </form>
  );
};
