import React, { createContext, useState } from "react";

type AuthContextProps = {
    authenticated: boolean;
    toggleAuthenticated: () => void
}

// context with initial value
export const AuthContext = createContext<AuthContextProps>({authenticated: false, toggleAuthenticated: () => {}});

/**
 * Auth Context Provider passes authentication state down into child components so children know whether they are authenticated or not.
 * If not authenticated, the children will know to redirect to the /login page.
 * Obviously someone could manipulate the authentication state via the browser dev tools or something to make the UI think it's authenticated, 
 * but it doesn't matter because the API Gateway will have authentication checks that will deny any requests without valid auth tokens
 */
export const AuthProvider = ({children}: React.PropsWithChildren) => {
    const [authenticated, setAuthenticated] = useState(false);

    const toggleAuthenticated = () => {
        setAuthenticated(!authenticated);
    }

    return(
        <AuthContext.Provider value={{authenticated, toggleAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}