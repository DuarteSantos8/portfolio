import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from 'react-icons/fa';
import EmailLink from './EmailLink';
import './Footer.css';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-left">
            <div className="footer-logo">Duarte Santos</div>
            <p className="footer-tagline">{t.footer.tagline}</p>
          </div>

          <div className="footer-center">
            <div className="footer-nav">
              <Link to="/" className="footer-link">{t.nav.home}</Link>
              <Link to="/about" className="footer-link">{t.nav.about}</Link>
              <Link to="/projects" className="footer-link">{t.nav.projects}</Link>
              <Link to="/contact" className="footer-link">{t.nav.contact}</Link>
            </div>
          </div>

          <div className="footer-right">
            <div className="footer-social">
              <a href="https://www.linkedin.com/in/duarte-santos-a82775328/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="https://github.com/DuarteSantos8" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="https://www.instagram.com/duarte.zh/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
                <FaInstagram />
              </a>
              <EmailLink className="footer-social-link">
                <FaEnvelope />
              </EmailLink>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">{t.footer.copyright(new Date().getFullYear())}</div>
          <div className="made-with">{t.footer.madeIn}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
