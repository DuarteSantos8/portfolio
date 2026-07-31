import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import FlagIcon from './FlagIcon';
import './LanguagePicker.css';

const OPTIONS = [
  { code: 'en', label: 'English' },
  { code: 'pt', label: 'Português' },
  { code: 'de', label: 'Deutsch' },
];

const LanguagePicker = ({ mobile = false }) => {
  const { language, selectLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const triggerRef = useRef(null);
  const optionRefs = useRef([]);

  useEffect(() => {
    const onOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onOutsideClick);
    return () => document.removeEventListener('mousedown', onOutsideClick);
  }, []);

  // Move focus into the list when it opens (start on the active language).
  useEffect(() => {
    if (!isOpen) return;
    const activeIdx = Math.max(0, OPTIONS.findIndex((o) => o.code === language));
    optionRefs.current[activeIdx]?.focus();
  }, [isOpen, language]);

  const select = (code) => {
    selectLanguage(code);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const onOptionKeyDown = (e, i) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      optionRefs.current[(i + 1) % OPTIONS.length]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      optionRefs.current[(i - 1 + OPTIONS.length) % OPTIONS.length]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      optionRefs.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      optionRefs.current[OPTIONS.length - 1]?.focus();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  };

  return (
    <div className={`lang-picker${mobile ? ' lang-picker--mobile' : ''}`} ref={ref}>
      <button
        ref={triggerRef}
        className={`lang-picker__trigger${isOpen ? ' lang-picker__trigger--open' : ''}`}
        onClick={() => setIsOpen((o) => !o)}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="lang-picker__flag-wrap">
          <FlagIcon lang={language} size={mobile ? 26 : 22} />
        </span>
        <span className="lang-picker__chevron" aria-hidden="true" />
      </button>

      {isOpen && (
        <ul
          className={`lang-picker__dropdown${mobile ? ' lang-picker__dropdown--mobile' : ''}`}
          role="listbox"
          aria-label="Language"
        >
          {OPTIONS.map(({ code, label }, i) => (
            <li key={code} role="none" style={{ '--i': i }}>
              <button
                type="button"
                ref={(el) => { optionRefs.current[i] = el; }}
                role="option"
                aria-selected={language === code}
                data-lang={code}
                className={`lang-picker__option${language === code ? ' lang-picker__option--active' : ''}`}
                onClick={() => select(code)}
                onKeyDown={(e) => onOptionKeyDown(e, i)}
              >
                <span className="lang-picker__option-flag">
                  <FlagIcon lang={code} size={20} />
                </span>
                <span className="lang-picker__option-label">{label}</span>
                {language === code && <span className="lang-picker__option-dot" aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguagePicker;
