import React, { useState, useEffect } from 'react';

const UserModal = ({ user, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal">
      <h3>{user ? 'Edit User' : 'Create User'}</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">{user ? 'Save User' : 'Add User'}</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default UserModal;
