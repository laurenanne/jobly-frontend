import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import "./Routes.css";
import authContext from "../auth/authContext";

function ProtectedRoutes({ component: Component, ...rest }) {
  //if there are paramaters grabs the parameter id
  const id = rest.computedMatch.params;

  const auth = useContext(authContext);
  const isLoggedIn = auth.isLoggedIn;

  //if the user is logged in then allows the protected route to be rendered
  // otherwise user is redirected to home screen
  return (
    <Route>
      {!isLoggedIn ? <Redirect to="/" /> : <Component {...rest} params={id} />}
    </Route>
  );
}

export default ProtectedRoutes;
