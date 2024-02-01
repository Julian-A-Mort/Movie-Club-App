import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../../utils/auth'; // Adjust the path as necessary

const ProtectedRoute = ({ element }) => {
  const profile = AuthService.getProfile(); // Retrieve user profile

  // Check if user is not logged in or if they don't have the 'admin' role
  if (!AuthService.loggedIn() || profile.role !== 'admin') {
    // Redirect to the home page
    return <Navigate to="/" replace />;
  }

  // Render the component if the user is logged in and has the 'admin' role
  return element;
};

export default ProtectedRoute;
