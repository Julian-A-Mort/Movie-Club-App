import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from '../../utils/auth';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    AuthService.loggedIn() ? <Component {...props} /> : <Redirect to="/login" />
  )} />
);

export default ProtectedRoute;
