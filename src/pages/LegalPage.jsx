import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import legal from '../data/legal';
import './LegalPage.css';

// Renders either the Impressum (`kind="imprint"`) or the privacy policy.
const LegalPage = ({ kind }) => {
  const { language } = useLanguage();
  const lang = legal[language] || legal.en;
  const doc = lang[kind];

  // Footer links are at the bottom of the page; start the legal text at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${doc.title} | Duarte Santos`;
    return () => { document.title = 'Duarte Santos | Software Developer Portfolio'; };
  }, [doc.title]);

  return (
    <section className="legal-section">
      <div className="legal-container">
        <h2 className="section-title">{doc.title}</h2>
        {doc.note && <p className="legal-note">{doc.note}</p>}
        {doc.sections.map((s) => (
          <div key={s.h} className="legal-block">
            <h3>{s.h}</h3>
            {s.p.map((line, i) => <p key={i}>{line}</p>)}
          </div>
        ))}
        <p className="legal-updated">{lang.updated}</p>
      </div>
    </section>
  );
};

export default LegalPage;
