import React, { CSSProperties } from 'react';
import { PacmanLoader } from 'react-spinners';
import './PacmanLoader.scss';

const spinnerCSS: CSSProperties = {
    top: '-30px',
    left: '-35px',
};

export const PacmanLoaderComponent: React.FC = (): React.ReactElement => {
    return (
        <div id="loader-container">
            <PacmanLoader
                size={30}
                color="#3b427d"
                cssOverride={spinnerCSS}
            ></PacmanLoader>
        </div>
    );
};
