import React, { useContext } from "react";
import { useAuth } from "../../utils/auth";
import { AuthContext } from "../../utils/authContext";

// export const Login = () => {
//     const { login } = useAuth();

//     const handleLogin = () => {
//         login().then(() => {
//             window.history.pushState({}, "", '/') // update url
//             const navEvent = new PopStateEvent('popstate');
//             window.dispatchEvent(navEvent);
//         });
//     };

//     return (
//         <div>
//             <h1>Login</h1>
//             <button onClick={handleLogin}>Log in</button>
//         </div>
//     );
// };


export const Login = () => {
    const { authenticated, toggleAuthenticated } = useContext(AuthContext);

    const handleLogin = () => {
        toggleAuthenticated();
        window.history.pushState({}, "", '/') // update url
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleLogin}>Log in</button>
        </div>
    );
};