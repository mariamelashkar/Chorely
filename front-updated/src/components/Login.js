import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login
    axios.post('http://localhost:8080/api/login', credentials)
      .then(response => {
        localStorage.setItem('token', response.data.token);
        onLogin(response.data.role);
      })
      .catch(error => {
        console.error('Login failed', error);
      });
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={credentials.username} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={credentials.password} onChange={handleChange} />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
