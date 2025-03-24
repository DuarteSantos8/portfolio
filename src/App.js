import React from 'react';
import Background from './components/Background';
import Header from './components/Header';
import MainPage from './components/MainPage';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Background />
        <Header />
        <MainPage />
      </div>
    </ThemeProvider>
  );
}

export default App;