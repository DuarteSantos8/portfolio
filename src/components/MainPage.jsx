// src/components/HeroSection.jsx
import React from 'react';
import './MainPage.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <h1 className="title">I'm Duarte Santos</h1>
      <p className="description">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
        et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
      </p>
      <p className="description">
        Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
        nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.
      </p>
      
      <div className="cta-section">
        <a href="#about" className="cta-link">
          See more about me <span className="arrow">→</span>
        </a>
        
        <div className="social-links">
          <a href="#" className="social-link">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="20" height="20" rx="2" stroke="white" strokeWidth="2"/>
              <path d="M8 10V16M8 7V7.01M16 16V10C16 8.89543 15.1046 8 14 8H11C9.89543 8 9 8.89543 9 10V16H8H16Z" stroke="white" strokeWidth="2"/>
            </svg>
          </a>
          <a href="#" className="social-link">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2"/>
              <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2"/>
              <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2"/>
            </svg>
          </a>
          <a href="#" className="social-link">OF</a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;