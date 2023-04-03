import React, { CSSProperties } from 'react';
import { MoonLoader } from 'react-spinners';
import './RecipeLoader.scss';


export const RecipeLoaderComponent: React.FC = (): React.ReactElement => {
    return (
        <div id="loader-container">
            <h1>Creating your recipe ...</h1>
            <MoonLoader
                size={50}
                color="#3b427d"
            ></MoonLoader>
        </div>
    );
};
