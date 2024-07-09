import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UserManagement.css';


function UserManagement() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User');
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedTask, setSelectedTask] = useState('');

  useEffect(() => {
    fetchUsers();
    fetchTasks();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(response.data || []);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/tasks', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTasks(response.data || []);
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:8080/api/users',
        { username, email, password, role },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      fetchUsers();
      setUsername('');
      setEmail('');
      setPassword('');
      setRole('User');
    } catch (error) {
      console.error('Error adding user', error);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:8080/api/tasks',
        { title: taskName, description: taskDescription, due_date: dueDate, priority, completed: false },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      fetchTasks();
      setTaskName('');
      setTaskDescription('');
      setDueDate('');
      setPriority('');
    } catch (error) {
      console.error('Error creating task', error);
    }
  };

  const handleAssignTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:8080/api/users/${selectedUser}/tasks/${selectedTask}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      fetchUsers();
      fetchTasks();
    } catch (error) {
      console.error('Error assigning task', error);
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      <form onSubmit={handleAddUser}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit">Add User</button>
      </form>

      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          placeholder="Task Title"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
        <textarea
          placeholder="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">Create Task</button>
      </form>

      <form onSubmit={handleAssignTask}>
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} required>
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
        <select value={selectedTask} onChange={(e) => setSelectedTask(e.target.value)} required>
          <option value="">Select Task</option>
          {tasks.map((task) => (
            <option key={task.id} value={task.id}>
              {task.title}
            </option>
          ))}
        </select>
        <button type="submit">Assign Task</button>
      </form>

      <h3>All Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManagement;
