import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { fetchTasks } from '../api';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

const UserDashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    getTasks();
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Dashboard</Menu.Item>
          <Menu.Item key="2">Profile</Menu.Item>
          <Menu.Item key="3">Settings</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="1" icon={<UserOutlined />}>
              My Tasks
            </Menu.Item>
            <Menu.Item key="2" icon={<LaptopOutlined />}>
              Notifications
            </Menu.Item>
            <Menu.Item key="3" icon={<NotificationOutlined />}>
              Settings
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <h1>User Dashboard</h1>
            <p>Welcome, User. Here you can manage your tasks and profile.</p>
            <ul>
              {tasks.map((task) => (
                <li key={task.id}>{task.title}</li>
              ))}
            </ul>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default UserDashboard;
