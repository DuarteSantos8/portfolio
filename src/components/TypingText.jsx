import React, { useState, useEffect, useMemo } from 'react';

const TypingText = () => {
  const [temperature, setTemperature] = useState(null);
  const phrases = useMemo(() => [
    "Hello World!", 
    "I'm Duarte Santos", 
    "A Software Developer", 
    temperature ? `In Zurich ${temperature}, CH` : "In Zurich, Switzerland", 
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
        const temp = `${Math.round(data.current_weather.temperature)}°C`;
        setTemperature(temp);
      } catch (error) {
        console.error('Failed to fetch temperature:', error);
      }
    };
    fetchTemperature();
  }, []);

  useEffect(() => {
    const current = phrases[currentPhrase];
    const updateText = () => {
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
    const speed = isDeleting ? 50 : 100;
    const timer = setTimeout(updateText, speed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, currentPhrase, phrases]);

  return (
    <div style={{ fontWeight: 800, fontSize: '1.5rem' }}>
      {text}
      <span className="typing-cursor">|</span>
    </div>
  );
};

export default TypingText;
