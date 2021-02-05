import React, { useContext, createContext, useState } from "react";
import {
//   BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
    let auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }