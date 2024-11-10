import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // Check if token exists

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" />;
  // }

  return children;
};

export default AuthRoute;
