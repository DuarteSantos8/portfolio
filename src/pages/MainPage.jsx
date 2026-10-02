import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import '@fontsource/roboto-mono';
import { useLanguage } from '../context/LanguageContext';
import EmailLink from '../components/EmailLink';

const HeroSection = () => {
    const { language, t } = useLanguage();
    const [temperature, setTemperature] = useState(null);

    const phrases = useMemo(() => t.main.phrases(temperature), [temperature, t]);

    const [text, setText] = useState('');
    const [currentPhrase, setCurrentPhrase] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const age = useMemo(() => {
        const birthDate = new Date(2007, 9, 28);
        const today = new Date();
        let a = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) a--;
        return a;
    }, []);

    useEffect(() => {
        const fetchTemperature = async () => {
            try {
                const response = await fetch(
                    'https://api.open-meteo.com/v1/forecast?latitude=47.3769&longitude=8.5417&current_weather=true'
                );
                const data = await response.json();
                const temp = data.current_weather.temperature;
                setTemperature(`${Math.round(temp)}°C`);
            } catch {
                setTemperature(null);
            }
        };
        fetchTemperature();
    }, []);

    // Reset typing animation when language changes
    useEffect(() => {
        setText('');
        setCurrentPhrase(0);
        setIsDeleting(false);
    }, [language]);

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

    const handleMouseMove = useCallback((e) => {
        const { currentTarget, clientX, clientY } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        setMousePos({
            x: (clientX - left) / width - 0.5,
            y: (clientY - top) / height - 0.5,
        });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setMousePos({ x: 0, y: 0 });
    }, []);

    return (
        <section className="hero-section" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div
                className="parallax-layer"
                style={{ transform: `translate(${mousePos.x * 16}px, ${mousePos.y * 9}px)` }}
            >
                <h1 className="title">
                    {text}
                    <span className="typing-cursor">|</span>
                </h1>
            </div>

            <div
                className="parallax-layer"
                style={{ transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 5}px)` }}
            >
                <p className="description">{t.main.desc1(age)}</p>
                <p className="description">{t.main.desc2}</p>
            </div>

            <div
                className="parallax-layer"
                style={{ transform: `translate(${mousePos.x * 4}px, ${mousePos.y * 2.5}px)` }}
            >
                <div className="cta-section">
                    <Link to="/about" className="cta-link">
                        {t.main.cta} <span className="arrow">→</span>
                    </Link>

                    <div className="social-links">
                        <a
                            href="https://www.linkedin.com/in/duarte-santos-a82775328/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin size={35} />
                        </a>

                        <a
                            href="https://github.com/DuarteSantos8"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                            aria-label="GitHub"
                        >
                            <FaGithub size={35} />
                        </a>

                        <a
                            href="https://www.instagram.com/duarte.zh/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                            aria-label="Instagram"
                        >
                            <FaInstagram size={35} />
                        </a>
                        <EmailLink className="social-link">
                            <FaEnvelope size={35}/>
                        </EmailLink>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
