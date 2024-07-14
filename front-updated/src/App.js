import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import { AuthProvider, AuthContext } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Dashboard from './components/AdminDashboard';
import TaskManagement from './components/TaskManagement';
import UserManagement from './components/UserManagement';
import Settings from './components/Settings';
import SideMenu from './components/SideMenu';
import './index.css';


const { Header, Content, Sider } = Layout;

const App = () => {
  const { auth } = useContext(AuthContext);

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        {auth.isLogged && (
          <Sider width={200} className="site-layout-background">
            <SideMenu />
          </Sider>
        )}
        <Layout>
          {auth.isLogged && <Header className="site-layout-background" style={{ padding: 0 }} />}
          <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
            <Route
                path="/tasks"
                element={
                  <PrivateRoute>
                    <TaskManagement />
                  </PrivateRoute>
                }
              />
              <Route
                path="/user-management"
                element={
                  <PrivateRoute>
                    <UserManagement />
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <PrivateRoute>
                    <Settings />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

const WrappedApp = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default WrappedApp;
