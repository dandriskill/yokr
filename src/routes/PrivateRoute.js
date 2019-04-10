import React from 'react';

import { Route, Redirect } from 'react-router-dom';

// Public route wrapper
const PrivateRoute = ({component: Component, authed, deezProps, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} {...deezProps} />
        : <Redirect to={{ pathname: '/login', state: {from: props.location} }} />}
    />
  );
}

export default PrivateRoute;
