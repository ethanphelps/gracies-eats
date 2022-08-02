import React from "react";
import { Landing } from "./pages/landing/landing";
import Route from "./components/Route"; 

const App: React.FC = (): React.ReactElement => {
  return (
    <>
      <Route path="/landing">
        <Landing />
      </Route>
      <Route path="/new">
        <>this is the new recipe page</>
      </Route>
    </>
  );
};

export default App;
