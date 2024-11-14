import React, { useState } from 'react';
import apiService from '../services/apiService'
import '../styles/LoginPage.css';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("dfsdf")
    try {
      const credentials = {"email": username, "password": password};
      console.log(credentials);
      localStorage.setItem('test',"huha");
      const response = await apiService.loginUser(credentials);
      const token = response.data.token;
      localStorage.setItem('token', token);
      console.log("login success ", token);
      window.location.href = '/'; // Redirect to the main page
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
      <p className="signup-note">
        If you are a new user, please <Link className="link" to="/register">sign up here</Link>.
      </p>
    </div>
  );
};

export default LoginPage;
