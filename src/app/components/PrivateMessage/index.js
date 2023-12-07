import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { GetUserLogin } from '../services';

const Private = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            GetUserLogin.isAuthenticate() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/loginMessg",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default Private;
