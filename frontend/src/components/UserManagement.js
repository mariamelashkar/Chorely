import React, { useEffect, useState } from 'react';
import { fetchUsers, createUser, updateUser, deleteUser } from '../api'; // Import the centralized API

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formState, setFormState] = useState({ username: '', password: '' });

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    getUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, formState);
      } else {
        await createUser(formState);
      }
      const data = await fetchUsers();
      setUsers(data);
      setFormState({ username: '', password: '' });
      setSelectedUser(null);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={formState.username}
          onChange={(e) => setFormState({ ...formState, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={formState.password}
          onChange={(e) => setFormState({ ...formState, password: e.target.value })}
        />
        <button type="submit">{selectedUser ? 'Update User' : 'Create User'}</button>
      </form>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username}
            <button onClick={() => setSelectedUser(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
