import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { hasAuthToken } from '../../services/auth'

const ProtectedRoute = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => hasAuthToken()
        ? <Component {...props} content={rest.content} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

export default ProtectedRoute