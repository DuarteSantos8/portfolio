import React from 'react';
import './MainPage.css';
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

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
                    <a
                        href="https://www.linkedin.com/in/duarte-santos-a82775328/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                    >
                        <FaLinkedin size={35} />
                    </a>
                    <a
                        href="https://www.instagram.com/duarte.zh/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                    >
                        <FaInstagram size={35} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;