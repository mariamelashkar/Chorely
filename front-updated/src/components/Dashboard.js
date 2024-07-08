import React from 'react';
import '../styles/Dashboard.css';

function Dashboard({ tasks, onAddTask }) {
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="dashboard">
      <h1>Welcome, User!</h1>
      <div>
        <h2>Pending Tasks</h2>
        <p>{pendingTasks.length}</p>
        <h2>Completed Tasks</h2>
        <p>{completedTasks.length}</p>
        <button onClick={onAddTask}>Add Task</button>
      </div>
    </div>
  );
}

export default Dashboard;
