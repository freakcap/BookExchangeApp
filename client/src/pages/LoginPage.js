import React, { useState } from 'react';
import {loginUser, setAuthToken} from '../services/apiService'
import '../styles/LoginPage.css';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const credentials = {"email": username, "password": password};
      console.log(credentials);
      const response = await axios.post(`http:localhost:8000/api/auth/login`, credentials);
      const token = response.data.token;
      localStorage.setItem('token', token);
      setAuthToken(token);
      console.log("login success ", token);
      // window.location.href = '/'; // Redirect to the main page
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
