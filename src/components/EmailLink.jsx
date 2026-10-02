import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './EmailLink.css';

export const EMAIL = 'contact@duarte-santos.ch';

// mailto: allein tut auf Geraeten ohne Standard-Mail-App (z. B. Chrome unter
// Windows ohne Outlook) beim Klick sichtbar nichts. Deshalb kopiert jeder Klick
// zusaetzlich die Adresse und meldet das kurz — der mailto-Versuch laeuft weiter.
const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { /* nichts zu tun */ }
    ta.remove();
    return ok;
  }
};

const EmailLink = ({ className, ariaLabel = 'Email', children }) => {
  const { t } = useLanguage();
  const [toast, setToast] = useState(null);
  const [shown, setShown] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleClick = async () => {
    const ok = await copyText(EMAIL);
    setToast(ok ? t.contact.emailCopied : null);
    setShown(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setShown(false), 3500);
  };

  return (
    <>
      <a href={`mailto:${EMAIL}`} className={className} aria-label={ariaLabel} onClick={handleClick}>
        {children}
      </a>
      {shown && (
        <div className="email-toast" role="status">
          {toast && <span>{toast}</span>}
          <span className="email-toast-address">{EMAIL}</span>
        </div>
      )}
    </>
  );
};

export default EmailLink;
