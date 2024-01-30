import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../../utils/auth';

const ProtectedRoute = ({ component }) => {
  return AuthService.loggedIn() ? component : <Navigate to="/" />;
};

export default ProtectedRoute;
