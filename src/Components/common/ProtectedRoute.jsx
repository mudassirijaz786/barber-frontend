//importing
import React from "react";
import { Route, Redirect } from "react-router-dom";
import Authorization from "./Authorization";

//exporting function SalonOwnerRoute
export const SalonOwnerRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          Authorization.isSalonOnwer().auth &&
          Authorization.isSalonOnwer().role === "Salon_Owner_login"
        ) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

//exporting function AdminRoute
export const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          Authorization.isAdmin().auth &&
          Authorization.isAdmin().role === "SuperAdmin"
        ) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
