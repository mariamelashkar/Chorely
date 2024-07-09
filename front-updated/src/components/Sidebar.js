import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar({ role }) {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/tasks">Tasks</Link></li>
        {role === 'admin' && (
          <li><Link to="/user-management">User Management</Link></li>
        )}
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
