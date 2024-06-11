// src/Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css'; // Import the CSS file for styling

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user session from local storage
    navigate('/'); // Redirect to login page
  };

  return (
    <button className="logout-button" onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
