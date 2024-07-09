import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar({ role }) {
  return (
    <nav className="sidebar">
      <h2>Task Manager</h2>
      <ul>
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/tasks">Tasks</NavLink>
        </li>
        {role === 'admin' && (
          <li>
            <NavLink to="/user-management">User Management</NavLink>
          </li>
        )}
        <li>
          <NavLink to="/settings">Settings</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
