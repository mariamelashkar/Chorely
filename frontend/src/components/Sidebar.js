import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = ({ role }) => (
  <div className="sidebar">
    <nav>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/tasks">Tasks</Link></li>
        {role === 'admin' && <li><Link to="/user-management">User Management</Link></li>}
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </nav>
  </div>
);

export default Sidebar;
