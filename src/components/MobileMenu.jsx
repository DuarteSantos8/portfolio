import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LuX, LuMenu, LuMoon, LuSun } from "react-icons/lu";
import { FaLinkedin, FaEnvelope, FaGithub } from "react-icons/fa";
import { ThemeContext } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import LanguagePicker from './LanguagePicker';
import EmailLink from './EmailLink';
import './MobileMenu.css';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { t } = useLanguage();

  const toggleMenu = () => setIsOpen((o) => !o);
  const closeMenu = () => setIsOpen(false);

  // Freeze the page behind the menu. overflow:hidden alone is ignored by iOS
  // Safari, so pin the body in place and restore the scroll position on close.
  useEffect(() => {
    if (!isOpen) return;
    const scrollY = window.scrollY;
    const { style } = document.body;
    document.body.classList.add('menu-open');
    style.top = `-${scrollY}px`;
    return () => {
      document.body.classList.remove('menu-open');
      style.top = '';
      window.scrollTo({ top: scrollY, behavior: 'instant' });
    };
  }, [isOpen]);

  // Close on Escape while the menu is open.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className="hamburger"
        onClick={toggleMenu}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? <LuX size={30} color={isDarkMode ? '#E6E3Df' : '#3D3935'} /> : <LuMenu size={30} color={isDarkMode ? '#E6E3Df' : '#3D3935'} />}
      </button>

      <div
        className={`mobile-menu-overlay ${isOpen ? 'open' : ''} ${isDarkMode ? 'dark' : 'light'}`}
        onClick={closeMenu}
      >
        <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-menu-header">
            <Link to="/" onClick={closeMenu}>
              <img src="/favicon.svg" alt="Memoji" className="memoji" />
            </Link>
            <p className="mobile-menu-name">Duarte Santos</p>
          </div>

          <nav className="mobile-menu-links">
            <Link to="/about" onClick={closeMenu}>{t.nav.about}</Link>
            <Link to="/projects" onClick={closeMenu}>{t.nav.projects}</Link>
            <Link to="/contact" onClick={closeMenu}>{t.nav.contact}</Link>
          </nav>

          <div className="mobile-menu-options">
            <button className="theme-toggle" onClick={toggleTheme}>
              {isDarkMode ? <LuSun size={24} /> : <LuMoon size={24} />}
              <span>{isDarkMode ? t.mobile.lightMode : t.mobile.darkMode}</span>
            </button>
            <LanguagePicker mobile />
          </div>

          <div className="mobile-menu-social">
            <a href="https://www.linkedin.com/in/duarte-santos-a82775328/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin size={35} />
            </a>
            <a href="https://github.com/DuarteSantos8" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
              <FaGithub size={35} />
            </a>
            <EmailLink className="social-link">
              <FaEnvelope size={35} />
            </EmailLink>
          </div>

          <div className="copyright-notice">
            {t.mobile.copyright(new Date().getFullYear())}
            <div className="mobile-menu-legal">
              <Link to="/impressum" onClick={closeMenu}>{t.footer.imprint}</Link>
              <Link to="/datenschutz" onClick={closeMenu}>{t.footer.privacy}</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
