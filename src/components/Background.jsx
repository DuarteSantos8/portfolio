import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import './Background.css';

const Background = () => {
  const { isDarkMode } = useContext(ThemeContext);
  
  return (
    <>
      <div className={`background ${isDarkMode ? 'dark' : 'light'}`}></div>
      <div className="grid"></div>
    </>
  );
};

export default Background;