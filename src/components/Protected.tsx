import React, { useContext, useEffect } from "react";
import { useAuth } from "../utils/auth";
import { Login } from "../pages/login/Login";
import { AuthContext } from "../utils/authContext";

export default function Protected({ children }: React.PropsWithChildren<any>): React.ReactElement {
    const { authenticated, toggleAuthenticated } = useContext(AuthContext);

    // const { authenticated } = useAuth();
    // useEffect(() => {
    //     window.history.pushState({}, "", '/login') // update url
    //     const navEvent = new PopStateEvent('popstate');
    //     window.dispatchEvent(navEvent);
    // }, [])
    if (authenticated) {
        return children;
    } else {
        // return (<Login />);
        window.history.pushState({}, "", '/login') // update url
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
        return null;
    }
}