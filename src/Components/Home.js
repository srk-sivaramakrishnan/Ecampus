import React from 'react';
import './Home.css';
import vectorImage from '../Images/home-img.png'; // Ensure you have the correct path to your image
import logoImage from '../Images/logo.png'; // Ensure you have the correct path to your logo image

const Home = () => {
  return (
    <>
      <header className="navbar">
        <div className="logo">
          <img src={logoImage} alt="Logo" className="logo-image" />
        </div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="https://www.kgkite.ac.in" target="_blank" rel="noopener noreferrer">About</a></li>
          <li><a href="#contact">Contact Us</a></li>
        </ul>
      </header>
      <div className="home-container">
        <div className="image-section">
          <img src={vectorImage} alt="Vector" className="vector-image" />
        </div>
        <div className="welcome-section">
          <h1>Welcome To Ecampus</h1>
          <div className="login-buttons">
            <button onClick={() => window.location.href = '/faculty-login'}>Faculty Login</button>
            <button onClick={() => window.location.href = '/student-login'}>Student Login</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
