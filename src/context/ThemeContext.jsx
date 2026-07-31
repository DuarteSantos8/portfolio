import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme 
      ? savedTheme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    const add = isDarkMode ? 'dark-theme' : 'light-theme';
    const remove = isDarkMode ? 'light-theme' : 'dark-theme';
    // Use classList (not className=) so other classes like `menu-open` survive.
    document.body.classList.add(add);
    document.body.classList.remove(remove);
    document.documentElement.classList.add(add);
    document.documentElement.classList.remove(remove);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((v) => !v);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};