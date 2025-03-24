// src/App.jsx
import React from 'react';
import Background from './components/Background';
import Header from './components/Header';
import MainPage from './components/MainPage';
import './App.css';

function App() {
  return (
    <div className="app">
      <Background />
      <Header />
      <MainPage />
    </div>
  );
}

export default App;