import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);
  return auth.isLogged ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
