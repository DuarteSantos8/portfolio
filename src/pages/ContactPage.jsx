import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FaEnvelope, FaLinkedin } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';
import EmailLink, { EMAIL } from '../components/EmailLink';
import './ContactPage.css';

const ContactPage = () => {
  const { t } = useLanguage();
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [timeUntilNextMessage, setTimeUntilNextMessage] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    checkRateLimit();
  }, []);

  useEffect(() => {
    let interval;
    if (timerActive && timeUntilNextMessage > 0) {
      interval = setInterval(() => {
        setTimeUntilNextMessage(prevTime => {
          const newTime = prevTime - 1;
          if (newTime <= 0) {
            clearInterval(interval);
            setTimerActive(false);
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeUntilNextMessage]);

  const checkRateLimit = () => {
    const lastMessageTime = localStorage.getItem('lastMessageTime');
    if (lastMessageTime) {
      const currentTime = new Date().getTime();
      const timeDiff = currentTime - parseInt(lastMessageTime);
      const waitTime = 600000;
      if (timeDiff < waitTime) {
        const remainingTime = Math.ceil((waitTime - timeDiff) / 1000);
        setTimeUntilNextMessage(remainingTime);
        setTimerActive(true);
        return true;
      }
    }
    return false;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkRateLimit()) {
      setSubmitStatus('rate-limited');
      return;
    }
    setIsSubmitting(true);

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formRef.current,
      { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
    ).then(() => {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      localStorage.setItem('lastMessageTime', new Date().getTime().toString());
      setTimeUntilNextMessage(600);
      setTimerActive(true);
    }).catch((error) => {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
    }).finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="section-title">{t.contact.title}</h2>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h3>{t.contact.connectTitle}</h3>
            <p>{t.contact.connectDesc}</p>

            <div className="contact-details">
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <span>{EMAIL}</span>
              </div>
            </div>

            <div className="contact-social">
              <EmailLink className="social-button" ariaLabel="Send an email">
                <FaEnvelope />
                <span>Email</span>
              </EmailLink>
              <a
                href="https://www.linkedin.com/in/duarte-santos-a82775328/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button"
                aria-label="Visit LinkedIn Profile"
              >
                <FaLinkedin />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit} ref={formRef}>
              <div className="form-group">
                <label htmlFor="name">{t.contact.nameLbl}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={t.contact.namePh}
                  disabled={timerActive}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">{t.contact.emailLbl}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={t.contact.emailPh}
                  disabled={timerActive}
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">{t.contact.subjectLbl}</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder={t.contact.subjectPh}
                  disabled={timerActive}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">{t.contact.messageLbl}</label>
                <div className="textarea-wrapper">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder={t.contact.messagePh}
                    rows="6"
                    maxLength="500"
                    disabled={timerActive}
                  />
                  <span className={`char-counter ${formData.message.length >= 500 ? 'limit-reached' : ''}`}>
                    {formData.message.length}/500
                  </span>
                </div>
              </div>

              {timerActive ? (
                <div className="rate-limit-notice">
                  <p>{t.contact.rateWait(formatTime(timeUntilNextMessage))}</p>
                </div>
              ) : (
                <button
                  type="submit"
                  className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting || timerActive}
                >
                  {isSubmitting ? t.contact.sending : t.contact.send}
                </button>
              )}

              {submitStatus === 'success' && (
                <div className="form-status success">{t.contact.success}</div>
              )}
              {submitStatus === 'error' && (
                <div className="form-status error">{t.contact.error}</div>
              )}
              {submitStatus === 'rate-limited' && (
                <div className="form-status warn">{t.contact.rateLimited}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
