import React, { useContext, useEffect } from "react";
import { useAuth } from "../utils/auth";
import { Login } from "../pages/login/Login";
import { AuthContext } from "../utils/authContext";

/**
 * Checks whether the user is logged in via AuthContext and redirects to Cognito Auth page if not
 */
export default function Protected({ children }: React.PropsWithChildren<any>): React.ReactElement {
    const { authenticated, toggleAuthenticated } = useContext(AuthContext);
    const callbackUrl = 'http://localhost:8080';
    const clientId = '5ct6jb5urfcr3qn9jvvco2sd3n';
    const cognitoAuthUrl = 'https://gracies-eats.auth.us-east-1.amazoncognito.com';

    console.log(window.location);
    const queryParams = window.location.href.split('?');
    console.log('Query paramssss: ', queryParams);//
    // const { authenticated } = useAuth();
    // useEffect(() => {
    //     window.history.pushState({}, "", '/login') // update url
    //     const navEvent = new PopStateEvent('popstate');
    //     window.dispatchEvent(navEvent);
    // }, [])
    if (true) {
        return children;
    } else {
        // return (<Login />);
        // window.history.pushState({}, "", '/login') // update url
        // const navEvent = new PopStateEvent('popstate');
        // window.dispatchEvent(navEvent);
        // toggleAuthenticated();
        window.location.replace(`${cognitoAuthUrl}/login?client_id=${clientId}&response_type=code&redirect_uri=${callbackUrl}`);
        // how does the redirect with an authorization code trigger the client to mark itself as authenticated? 
        return null;
    }
}
