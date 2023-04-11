import React, { createContext, useState } from "react";

type AuthContextProps = {
    authenticated: boolean;
    toggleAuthenticated: () => void
}

// context with initial value
export const AuthContext = createContext<AuthContextProps>({authenticated: false, toggleAuthenticated: () => {}});

// context provider
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