import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file

const Home = () => {
  const navigate = useNavigate();

  const handleLoginNavigation = () => {
    navigate('/login');
  };

  return (
    <div>
      <h1>Welcome to eCampus</h1>
      <button onClick={handleLoginNavigation}>Go to Login</button>
    </div>
  );
};

export default Home;
