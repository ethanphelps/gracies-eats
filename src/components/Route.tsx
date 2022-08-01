import React from "react";

interface RouteProps {
  path: string;
  children: React.ReactElement
}

/**
 * Component for enabling SPA routing
 * @param path a string representing the value of path required to render the children of this component 
 * @param children a ReactElement that is the children of a given instance of Route that will be rendered
 * if path and window.location.pathname match
children * @returns 
 */
const Route = ({path, children}: RouteProps): React.ReactElement => {
  return window.location.pathname === path ? children : null;
}

export default Route;