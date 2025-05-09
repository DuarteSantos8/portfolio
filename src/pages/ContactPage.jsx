import React, { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt } from 'react-icons/fa';
import { BsMicrosoftTeams } from "react-icons/bs";
import './ContactPage.css';

const ContactPage = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const token = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;
    const chatId = process.env.REACT_APP_TELEGRAM_CHAT_ID;

    const message = `
      *New Contact Message*🔥
      *Name:* ${formData.name}
      *Email:* ${formData.email}
      *Subject:* ${formData.subject}

      *Message:* 
      ${formData.message}
    `;
  
    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown'
        })
      });
  
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
  
    } catch (error) {
      console.error('Telegram error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };
  
  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="section-title">Contact</h2>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <h3>Let's Connect</h3>
            <p>Feel free to reach out for collaborations or just to say hi!</p>
            
            <div className="contact-details">
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <span>duarte.lavourasreissantos@sunrise.net</span>
              </div>
              
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <span>Ambassador House, Glattpark, Zürich</span>
              </div>
            </div>
            
            <div className="contact-social">
              <a 
                href="https://teams.microsoft.com/l/chat/0/0?users=duarte.lavourasreissantos@sunrise.net"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button"
                aria-label="Contact via Microsoft Teams"
              >
                <BsMicrosoftTeams />
                <span>Teams</span>
              </a>
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
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your email"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Subject"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message"
                  rows="6"
                />
              </div>
              
              <button 
                type="submit" 
                className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              
              {submitStatus === 'success' && (
                <div className="form-status success">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="form-status error">
                  There was an error sending your message. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;