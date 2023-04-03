import React, { CSSProperties } from 'react';
import { NetworkError } from '../models/models';
import './Error.scss'


export const ErrorComponent = ({
    error
}: {
    error: NetworkError
}): React.ReactElement => {
    console.log(`Inside ErrorComponent! Status is ${error.status} and message is ${error.message}`)
    return (
        <div id="error-container">
            <h1>{error.status}</h1>
            <h3>{error.message}</h3>
        </div>
    );
};

