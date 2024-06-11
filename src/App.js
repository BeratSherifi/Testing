import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import GFGWordGame from './components/GFGWordGame';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/game" element={<GFGWordGame />} />
      </Routes>
    </div>
  );
};

export default App;
