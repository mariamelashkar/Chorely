import React from 'react';
import '../styles/TaskList.css';

function TaskList({ tasks, onEditTask, onDeleteTask }) {
  return (
    <div className="task-list">
      <h2>Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{new Date(task.due_date).toLocaleDateString()}</td>
              <td>{task.priority}</td>
              <td>{task.completed ? 'Completed' : 'Pending'}</td>
              <td>{task.assigned_to}</td>
              <td>
                <button onClick={() => onEditTask(task)}>Edit</button>
                <button onClick={() => onDeleteTask(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
