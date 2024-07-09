import React from 'react';
import '../styles/Dashboard.css';

const Dashboard = ({ tasks, onAddTask }) => (
  <div>
    <h2>Welcome to the Dashboard</h2>
    <p>This is your dashboard.</p>
    <button onClick={onAddTask}>Add Task</button>
  </div>
);

export default Dashboard;
