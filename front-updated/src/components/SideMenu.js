import React from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  DashboardOutlined,
  UnorderedListOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';

const items = [
  { label: 'Dashboard', key: '/dashboard', icon: <DashboardOutlined /> },
  { label: 'Tasks', key: '/tasks', icon: <UnorderedListOutlined /> },
  { label: 'User Management', key: '/user-management', icon: <UserOutlined /> },
  { label: 'Settings', key: '/settings', icon: <SettingOutlined /> },
];

const SideMenu = () => {
  const navigate = useNavigate();

  const onClick = (e) => {
    navigate(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      defaultSelectedKeys={['/dashboard']}
      mode="inline"
      theme="dark"
      items={items}
    />
  );
};

export default SideMenu;
