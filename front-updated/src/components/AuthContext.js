import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLogged: false,
    user: null,
  });

  useEffect(() => {
    // Debugging: Clear local storage
    // localStorage.clear();

    // Check if user is logged in by checking localStorage
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        setAuth({
          isLogged: true,
          user: parsedUser,
        });
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        // Clear potentially corrupted data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = (user, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setAuth({
      isLogged: true,
      user: user,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({
      isLogged: false,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
