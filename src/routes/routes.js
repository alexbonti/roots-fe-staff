/***
 *  Created by Sanchit Dang
 ***/
import React, { useContext, useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { LoginContext } from "contexts";
import { Login, Register, Home2, RegistrationConfirmation, ResetPassword } from "views";
import { Layout } from "../layout";
import { ResetPasswordSecondStep } from "views/index";

export const AppRoutes = props => {
  const { loginStatus } = useContext(LoginContext);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  useEffect(() => {
    if (loginStatus) setRedirectToLogin(false);
    else setRedirectToLogin(true);
  }, [loginStatus]);
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() =>
          redirectToLogin ? (
            <Redirect to={{ pathname: "/login" }} {...props} />
          ) : (
            <Redirect to={{ pathname: "/home" }} {...props} />
          )
        }
      />
      <Route
        exact
        path="/login"
        render={() =>
          !redirectToLogin ? (
            <Redirect to={{ pathname: "/home" }} {...props} />
          ) : (
            <Login {...props} />
          )
        }
      />
      <Route
        exact
        path="/reset-password"
        render={() =><ResetPassword {...props} />
          
        }
      />
      <Route
        exact
        path="/reset-password-second-step"
        render={() =><ResetPasswordSecondStep {...props} />
          
        }
      />
      <Route
        exact
        path="/register"
        render={() =>
          !redirectToLogin ? (
            <Redirect to={{ pathname: "/home" }} {...props} />
          ) : (
            <Register {...props} />
          )
        }
      />
      <Layout>
        <Route
          exact
          path="/home"
          render={() =>
            redirectToLogin ? (
              <Redirect to={{ pathname: "/login" }} {...props} />
            ) : (
              <Home2 {...props} />
            )
          }
        />
        
        <Route
          exact
          path="/registerSuccess"
          render={() => <RegistrationConfirmation {...props} />}
        />
      </Layout>
    </Switch>
  );
};
