import React, { useContext } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const SideMenu = () => {
  const { auth } = useContext(AuthContext);

  return (
    <Menu theme="dark" mode="inline">
      <Menu.Item key="1">
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/tasks">Tasks</Link>
      </Menu.Item>
      {auth.role === 'admin' && (
        <>
          <Menu.Item key="3">
            <Link to="/user-management">User Management</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/settings">Settings</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

export default SideMenu;
