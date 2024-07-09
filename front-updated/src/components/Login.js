import React, { useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import '../styles/Login.css';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/login', credentials)
      .then(response => {
        console.log('Login response:', response.data);
        const { token } = response.data;
        if (token) {
          localStorage.setItem('token', token);
          const decodedToken = jwtDecode(token);
          const role = decodedToken.role;
          console.log('Decoded role:', role);
          if (role) {
            onLogin(role);
          } else {
            console.error('Role is missing in the decoded token:', decodedToken);
            onLogin('defaultRole');
          }
        } else {
          console.error('Invalid response format:', response.data);
        }
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
