import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, user_status: user_status, user: user, ...rest }) => {
  return (
    console.log(user_status),
    <Route
      {...rest}
      render={props =>
      user_status === "APPROVED" ? (
          <Component {...props} 
            user={user}
          />
        ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;