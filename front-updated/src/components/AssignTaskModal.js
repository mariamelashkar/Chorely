import React, { useState } from 'react';

const AssignTaskModal = ({ users, tasks, onClose }) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedTask, setSelectedTask] = useState('');

  const handleAssign = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="modal">
      <h3>Assign Task</h3>
      <form onSubmit={handleAssign}>
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="">Select User</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.username}</option>
          ))}
        </select>
        <select value={selectedTask} onChange={(e) => setSelectedTask(e.target.value)}>
          <option value="">Select Task</option>
          {tasks.map(task => (
            <option key={task.id} value={task.id}>{task.title}</option>
          ))}
        </select>
        <button type="submit">Assign Task</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AssignTaskModal;
