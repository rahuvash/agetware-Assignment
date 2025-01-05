import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element, allowedRoles = [] }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth); // Access authentication state and user data
  console.table([isAuthenticated,user])
  const isAuthorized = isAuthenticated && allowedRoles.includes(user); // Check if user is authenticated and role is allowed

  //console.log("Is authorised: ",isAuthorized)
  return isAuthorized ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
