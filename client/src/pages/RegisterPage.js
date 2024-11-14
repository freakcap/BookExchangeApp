import React, { useState } from 'react';
import '../styles/RegisterPage.css';
import apiService from '../services/apiService';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name_, setName] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await apiService.registerUser({ name: name_, email: username, password });
      alert('Registration successful');
      window.location.href = '/login'; // Redirect to login page
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="register-form">
      <input
          type="text"
          placeholder="Name"
          value={name_}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Email"
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
