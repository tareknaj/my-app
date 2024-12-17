import React, { useState } from 'react';
import { loginUser } from './authService';
import axios from "./axiosInstance";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // Allow string or null as the state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const token = await loginUser(username, password); // Call the login function
      // You can now use the token for subsequent requests
      console.log('Logged in successfully:', token);
      // Optionally, redirect to another page after successful login
      // window.location.href = '/dashboard';
    } catch (err) {
      setError('Invalid username or password'); // Set an error message if login fails
    }
  };

  const handleButtonClick = async () => {
    setError(null); // Reset error state
    try {
      const response = await axios.get('http://localhost:8081/demo/all');
      console.log(response.data); // Set the API response data
    } catch (err) {
    } finally {
    }
  };

  const handleDashboard = async () => {
    setError(null); // Reset error state
    try {
      const response = await axios.get('http://localhost:8081/admin/dashboard');
      console.log(response.data); // Set the API response data
    } catch (err) {
    } finally {
    }
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Login</button>

        <button type="button" onClick={handleButtonClick}>test</button>

        <button type="button" onClick={handleDashboard}>dashboard</button>
      </form>
    </div>
  );
};

export default LoginForm;