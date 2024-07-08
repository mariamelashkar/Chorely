import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import App from './App';
import Login from './components/Login';

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setRole(role);
  };

  return (
    <Router>
      <Routes>
        {!isLoggedIn ? (
          <Route path="/" element={<Login onLogin={handleLogin} />} />
        ) : (
          <Route path="/*" element={<App role={role} />} />
        )}
        <Route path="/" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default Main;
