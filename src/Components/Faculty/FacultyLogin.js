import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import baseURL from '../../auth/connection'; // Ensure the correct path
import '../../Components/Faculty/FacultyLogin.css';

function FacultyLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post(`${baseURL}/api/faculty-login`, { username, password })
      .then(response => {
        console.log(response.data);
        navigate('/faculty-dashboard');
      })
      .catch(error => {
        console.error('There was an error logging in!', error);
      });
  };

  return (
    <div className="container">
      <h1>Faculty Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="forgot-password">
        <a href="/forgot-password">Forgot Password?</a>
      </div>
    </div>
  );
}

export default FacultyLogin;
