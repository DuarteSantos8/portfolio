import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LuX, LuMenu, LuMoon, LuSun } from "react-icons/lu";
import { FaLinkedin, FaInstagram, FaSpotify } from "react-icons/fa";
import { ThemeContext } from '../context/ThemeContext';
import './MobileMenu.css';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isOpen]);

  return (
    <>
      <div 
        className="hamburger" 
        onClick={toggleMenu}
      >
        {isOpen ? <LuX size={30} color={isDarkMode ? '#E6E3Df' : '#3D3935'} /> : <LuMenu size={30} color={isDarkMode ? '#E6E3Df' : '#3D3935'} />}
      </div>

      <div 
        className={`mobile-menu-overlay ${isOpen ? 'open' : ''} ${isDarkMode ? 'dark' : 'light'}`}
        onClick={closeMenu}
      >
        <div 
          className="mobile-menu-content" 
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mobile-menu-header">
            <Link to="/" onClick={closeMenu}>
              <img src="/favicon.svg" alt="Memoji" className="memoji" />
            </Link>
            <h1>Duarte Santos</h1>
          </div>

          <nav className="mobile-menu-links">
            <Link to="/#about" onClick={closeMenu}>About</Link>
            <Link to="/projects" onClick={closeMenu}>Projects</Link>
            <Link to="/#contact" onClick={closeMenu}>Contact</Link>
          </nav>

          <div className="mobile-menu-options">
            <button 
              className="theme-toggle" 
              onClick={toggleTheme}
            >
              {isDarkMode ? <LuSun size={24} /> : <LuMoon size={24} />}
              <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>

          <div className="mobile-menu-social">
            <a
              href="https://www.linkedin.com/in/duarte-santos-a82775328/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={35} />
            </a>
            <a
              href="https://www.instagram.com/duarte.zh/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={35} />
            </a>
            <a
              href="https://open.spotify.com/user/your-spotify-username"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaSpotify size={35} />
            </a>
          </div>

          <div className="copyright-notice">
            © 2025 Duarte Santos. All rights reserved.
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;