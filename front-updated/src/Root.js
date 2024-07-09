import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import App from './App';
import Login from './components/Login';

function Root() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = (userRole) => {
    console.log('User logged in with role:', userRole);
    setIsLoggedIn(true);
    setRole(userRole);
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      {isLoggedIn ? (
        <>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/*" element={<App role={role} setIsLoggedIn={setIsLoggedIn} />} />
        </>
      ) : (
        <Route path="/*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
}

export default function AppRouter() {
  return (
    <Router>
      <Root />
    </Router>
  );
}
