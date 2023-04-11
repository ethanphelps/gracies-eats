import React from "react";

const authContext = React.createContext(null);


export const useAuth = () => {
    const [authenticated, setAuthenticated] = React.useState(false);

    return {
        authenticated,
        login() {
            console.log('login function called!');
            return new Promise<void>((res) => {
                setAuthenticated(true);
                console.log('authenticated set to true!');
                res();
            })
        },
        logout() {
            return new Promise<void>((res) => {
                setAuthenticated(false);
                res();
            })
        }
    }
}


export const AuthProvider = ({children}: React.PropsWithChildren<any>): React.ReactElement => {
    const auth = useAuth();
    return  (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

export const AuthConsumer = () => {
    return React.useContext(authContext);
}