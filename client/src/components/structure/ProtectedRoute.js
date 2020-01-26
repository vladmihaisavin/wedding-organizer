import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isTokenValid } from '../../auth/utils';

const ProtectedRoute = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => isTokenValid()
        ? <Component {...props} content={rest.content} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

export default ProtectedRoute;