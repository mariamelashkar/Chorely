import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UserManagement.css';

function UserManagement({ tasks, onAddTask }) {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'user' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users');
      setUsers(response.data || []);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const handleAssignTask = async (userId, taskId) => {
    try {
      await axios.post(`http://localhost:8080/api/users/${userId}/tasks/${taskId}`);
      fetchUsers();
    } catch (error) {
      console.error('Error assigning task', error);
    }
  };

  const handleAddTask = () => {
    onAddTask();
  };

  const handleCreateUser = async () => {
    try {
      await axios.post('http://localhost:8080/api/users', newUser);
      setNewUser({ username: '', password: '', role: 'user' });
      fetchUsers();
    } catch (error) {
      console.error('Error creating user', error);
    }
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <button onClick={handleAddTask}>Add Task</button>
      <h3>Create New User</h3>
      <div className="new-user-form">
        <label>Username:</label>
        <input
          type="text"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <label>Password:</label>
        <input
          type="password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <label>Role:</label>
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={handleCreateUser}>Create User</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Tasks</th>
            <th>Assign Task</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <ul>
                  {user.tasks.map(taskId => (
                    <li key={taskId}>{tasks.find(task => task.id === taskId)?.title || 'Unknown Task'}</li>
                  ))}
                </ul>
              </td>
              <td>
                <select onChange={(e) => handleAssignTask(user.id, e.target.value)}>
                  <option value="">Select Task</option>
                  {tasks.map(task => (
                    <option key={task.id} value={task.id}>{task.title}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
