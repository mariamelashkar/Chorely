import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ children, role }) => {
  const { auth } = useContext(AuthContext);

  if (!auth.isLogged) {
    return <Navigate to="/login" />;
  }

  if (role && auth.user.role !== role) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
