import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import baseURL from '../../auth/connection'; // Ensure the correct path
import '../../Components/Student/StudentLogin.css';

function StudentLogin() {
  const [rollno, setRollno] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post(`${baseURL}/api/login`, { rollno, password })
      .then(response => {
        console.log(response.data);
        navigate('/student-dashboard');
      })
      .catch(error => {
        console.error('There was an error logging in!', error);
      });
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Roll No:</label>
          <input
            type="text"
            value={rollno}
            onChange={(e) => setRollno(e.target.value)}
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
    </div>
  );
}

export default StudentLogin;
