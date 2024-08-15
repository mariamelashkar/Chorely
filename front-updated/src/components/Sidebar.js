import React from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  UnorderedListOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = ({ role }) => (
  <Sider trigger={null} collapsible>
    <div className="logo" />
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      <Menu.Item key="1" icon={<DashboardOutlined />}>
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<UnorderedListOutlined />}>
        <Link to="/tasks">Tasks</Link>
      </Menu.Item>
      {role === 'admin' && (
        <Menu.Item key="3" icon={<UserOutlined />}>
          <Link to="/user-management">User Management</Link>
        </Menu.Item>
      )}
      <Menu.Item key="4" icon={<SettingOutlined />}>
        <Link to="/settings">Settings</Link>
      </Menu.Item>
    </Menu>
  </Sider>
);

export default Sidebar;
