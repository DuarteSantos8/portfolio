import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LuSun, LuMoon } from "react-icons/lu";
import { ThemeContext } from '../context/ThemeContext';
import MobileMenu from './MobileMenu';
import './Header.css';

const Header = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src="/favicon.svg" alt="Animated Memoji" className="memoji-animation" />
        </Link>
      </div>
      <nav className="nav">
        <Link to="/#about">About</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/#contact">Contact</Link>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {isDarkMode ? <LuSun size={30}/> : <LuMoon size={30}/>}
        </button>
      </nav>
      <MobileMenu />
    </header>
  );
};

export default Header;