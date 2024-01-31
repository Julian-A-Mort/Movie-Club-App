import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../../utils/auth';

const ProtectedRoute = ({ element }) => {
  return AuthService.loggedIn() ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
