import React, { useContext } from 'react';
import { LuSun, LuMoon } from "react-icons/lu";
import { ThemeContext } from '../context/ThemeContext';
import './Header.css';

const Header = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header">
      <div className="logo">
        <img src="/favicon.svg" alt="Animated Memoji" className="memoji-animation" />
      </div>
      <nav className="nav">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {isDarkMode ? <LuSun size={30}/> : <LuMoon size={30}/>}
        </button>
      </nav>
    </header>
  );
};

export default Header;