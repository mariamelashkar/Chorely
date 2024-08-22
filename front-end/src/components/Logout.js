import React, { useContext } from 'react';
import { Button } from 'antd';
import Cookies from 'js-cookie';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('role');
    setAuth({
      isLogged: false,
      role: null,
    });
    navigate('/login');
  };

  return (
    <Button type="primary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
