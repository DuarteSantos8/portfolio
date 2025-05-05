import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const { isDarkMode } = useContext(ThemeContext);
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-left">
            <div className="footer-logo">Duarte Santos</div>
            <p className="footer-tagline">Building elegant digital solutions</p>
          </div>
          
          <div className="footer-center">
            <div className="footer-nav">
              <a href="/" className="footer-link">Home</a>
              <a href="/about" className="footer-link">About</a>
              <a href="/projects" className="footer-link">Projects</a>
              <a href="/contact" className="footer-link">Contact</a>
            </div>
          </div>
          
          <div className="footer-right">
            <div className="footer-social">
              <a 
                href="https://www.linkedin.com/in/duarte-santos-a82775328/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                <FaLinkedin />
              </a>
              <a 
                href="https://github.com/DuarteSantos8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                <FaGithub />
              </a>
              <a 
                href="https://www.instagram.com/duarte.zh/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                <FaInstagram />
              </a>
              <a 
                href="mailto:duarte.lavourasreissantos@sunrise.net" 
                className="footer-social-link"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="copyright">
            © {new Date().getFullYear()} Duarte Santos. All rights reserved.
          </div>
          <div className="made-with">
            Made in Zurich, Switzerland
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;