import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const SideMenu = () => (
  <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
    <Menu.Item key="1">
      <Link to="/dashboard">Dashboard</Link>
    </Menu.Item>
    <Menu.Item key="2">
      <Link to="/tasks">Tasks</Link>
    </Menu.Item>
    <Menu.Item key="3">
      <Link to="/user-management">User Management</Link>
    </Menu.Item>
    <Menu.Item key="4">
      <Link to="/settings">Settings</Link>
    </Menu.Item>
  </Menu>
);

export default SideMenu;
