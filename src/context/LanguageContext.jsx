import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from '../translations';

const LANGUAGES = ['en', 'pt', 'de'];

const getInitialLanguage = () => {
  const saved = localStorage.getItem('language');
  if (saved && LANGUAGES.includes(saved)) return saved;
  const browser = (navigator.language || 'en').slice(0, 2).toLowerCase();
  return LANGUAGES.includes(browser) ? browser : 'en';
};

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getInitialLanguage);

  // Keep <html lang> in sync for a11y, browser translation, and SEO.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const cycleLanguage = () => {
    const next = LANGUAGES[(LANGUAGES.indexOf(language) + 1) % LANGUAGES.length];
    setLanguage(next);
    localStorage.setItem('language', next);
  };

  const selectLanguage = (code) => {
    if (LANGUAGES.includes(code)) {
      setLanguage(code);
      localStorage.setItem('language', code);
    }
  };

  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, cycleLanguage, selectLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
