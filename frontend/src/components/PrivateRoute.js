import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ roles }) => {
  const { authTokens } = useContext(AuthContext);

  // If there is no auth token, redirect to the login page
  if (!authTokens) {
    return <Navigate to="/" />;
  }

  // Decode the token to get user details
  const decodedToken = jwtDecode(authTokens);
  const userRole = decodedToken.role;

  // If roles are provided and the user's role is not in the allowed roles, redirect to not authorized page
  if (userRole === 'end_user') {
    return <Navigate to="/not-authorized" />;
  }

  // If the user is logged in and has the required role, render the child route
  return <Outlet />;
};

export default PrivateRoute;
