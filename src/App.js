import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Background from './components/Background';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Background />
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="about" element={<AboutPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;