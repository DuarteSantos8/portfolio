import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LuSun, LuMoon } from "react-icons/lu";
import { ThemeContext } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import MobileMenu from './MobileMenu';
import LanguagePicker from './LanguagePicker';
import './Header.css';

const Header = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { t } = useLanguage();

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src="/favicon.svg" alt="Animated Memoji" className="memoji-animation" />
        </Link>
      </div>
      <nav className="nav">
        <Link to="/about">{t.nav.about}</Link>
        <Link to="/projects">{t.nav.projects}</Link>
        <Link to="/contact">{t.nav.contact}</Link>
        <LanguagePicker />
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {isDarkMode ? <LuSun size={30}/> : <LuMoon size={30}/>}
        </button>
      </nav>
      <MobileMenu />
    </header>
  );
};

export default Header;
