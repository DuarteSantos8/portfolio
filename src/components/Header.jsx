// src/components/Header.jsx
import React from 'react';
import { LuSun, LuMoon } from "react-icons/lu";
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/memoji-animation.gif" alt="Animated Memoji" className="memoji-animation" />
      </div>
      <nav className="nav">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
        <button className="theme-toggle">
            <LuSun />
            <LuMoon />
        </button>
      </nav>
    </header>
  );
};

export default Header;
