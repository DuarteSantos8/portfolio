import React, { useState, useEffect, useMemo } from 'react';
import './MainPage.css';
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import '@fontsource/roboto-mono';

const HeroSection = () => {
    const [temperature, setTemperature] = useState(null);
    const phrases = useMemo(() => [
        "Hello World!", 
        "I'm Duarte Santos", 
        "A Software Developer", 
        temperature 
            ? `In Zurich ${temperature}, CH` 
            : "In Zurich, Switzerland", 
        "@ Sunrise GmbH"
    ], [temperature]);

    const [text, setText] = useState('');
    const [currentPhrase, setCurrentPhrase] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchTemperature = async () => {
            try {
                const response = await fetch(
                    'https://api.open-meteo.com/v1/forecast?latitude=47.3769&longitude=8.5417&current_weather=true'
                );
                const data = await response.json();
                const temp = data.current_weather.temperature;
    
                // Round the temperature and add °C
                const formattedTemp = `${Math.round(temp)}°C`;
    
                setTemperature(formattedTemp);
            } catch (error) {
                console.error('Failed to fetch temperature:', error);
                setTemperature(null);
            }
        };
    
        fetchTemperature();
    }, []);        

    useEffect(() => {
        const handleTyping = () => {
            const current = phrases[currentPhrase];
            
            if (isDeleting) {
                setText(current.substring(0, text.length - 1));
                if (text.length === 0) {
                    setIsDeleting(false);
                    setCurrentPhrase((prev) => (prev + 1) % phrases.length);
                }
            } else {
                setText(current.substring(0, text.length + 1));
                if (text.length === current.length) {
                    setTimeout(() => setIsDeleting(true), 2500);
                }
            }
        };

        const typingSpeed = isDeleting ? 50 : 100;
        const timer = setTimeout(handleTyping, typingSpeed);

        return () => clearTimeout(timer);
    }, [text, isDeleting, currentPhrase, phrases]);

    const getAge = () => {
        const birthDate = new Date(2007, 9, 28);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      };

    return (
        <section className="hero-section">
            <h1 className="title">
                {text}
                <span className="typing-cursor">|</span>
            </h1>
            <p className="description">
            I'm a passionate software developer at Sunrise and currently {getAge()} years old. Using JavaScript React, Python and many more languages I build modern web apps that turn complex ideas into clean, user-friendly experiences.
            </p>
            <p className="description">
            Driven by curiosity and a love for clean, efficient code, I’m always exploring new technologies. For me, every project is a chance to grow, learn something new, and push the limits of what’s possible with code.    
            </p>

            <div className="cta-section">
                <a href="#about" className="cta-link">
                    Explore my journey <span className="arrow">→</span>
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
                    <a
                        href="mailto:duarte.lavourasreissantos@sunrise.net"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                    >
                        <FaEnvelope size={35}/>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;