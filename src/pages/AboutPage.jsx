import React, { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import data from '../data/aboutData.json';
import { FaReact, FaPython, FaHtml5, FaCss3Alt, FaLaptopCode, FaVuejs, FaJava, FaRaspberryPi, FaBuilding, FaJs, FaMobileAlt, FaLinux, FaGitAlt, FaDocker, FaNetworkWired, FaFigma, FaApple, FaWindows, FaLaptop } from 'react-icons/fa';
import { SiFlask, SiMysql, SiFirebase, SiBootstrap, SiQlik, SiOpencv, SiNumpy, SiMediapipe, SiSpring, SiNginx, SiGnubash, SiPostman, SiCanva, SiIntellijidea, SiPycharm, SiMongodb, SiGrafana, SiInfluxdb, SiLaravel } from 'react-icons/si';
import { IoTerminal } from "react-icons/io5";
import { MdNetworkWifi } from 'react-icons/md';
import { BiLogoVisualStudio } from "react-icons/bi";
import './AboutPage.css';

const AboutPage = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const { experiences, skillGroups } = data;

  // Add this function to calculate years of experience
  const calculateExperience = () => {
    const startDate = new Date('2023-08-01');
    const currentDate = new Date();
    const yearsDiff = (currentDate - startDate) / (1000 * 60 * 60 * 24 * 365.25);
    return yearsDiff.toFixed(1);
  };

  const technologyIcons = {
    'React': FaReact,
    'JavaScript': FaJs,
    'Python': FaPython,
    'HTML': FaHtml5,
    'CSS': FaCss3Alt,
    'Vue.js': FaVuejs,
    'Flask': SiFlask,
    'MySQL': SiMysql,
    'Firebase': SiFirebase,
    'Bootstrap': SiBootstrap,
    'Qlik': SiQlik,
    'OpenCV': SiOpencv,
    'NumPy': SiNumpy,
    'MediaPipe': SiMediapipe,
    'Raspberry Pi OS': FaRaspberryPi,
    'Raspberry Pi': FaRaspberryPi,
    'Java': FaJava,
    'Springboot': SiSpring,
    'IoT': IoTerminal,
    'Expo Go': FaMobileAlt,
    'Linux': FaLinux,
    'Networking': MdNetworkWifi,
    'Git': FaGitAlt,
    'Docker': FaDocker,
    'Nginx': SiNginx,
    'Bash': SiGnubash,
    'Scripting': SiGnubash,
    'nmcli': FaNetworkWired,
    'Postman': SiPostman,
    'Figma': FaFigma,
    'Canva': SiCanva,
    'VS Code': BiLogoVisualStudio,
    'IntelliJ IDEA': SiIntellijidea,
    'PyCharm': SiPycharm,
    'MongoDB': SiMongodb,
    'MacOS': FaApple,
    'Windows 10': FaWindows,
    'Windows 11': FaWindows,
    'Grafana': SiGrafana,
    'InfluxDB': SiInfluxdb,
    'VM': FaLaptop,
    'Fullstack': FaLaptopCode,
    'Laravel': SiLaravel
  };

  // Add state for tracking active state
  const [isQuoteActive, setIsQuoteActive] = useState(false);

  // Add click handler
  const handleQuoteClick = () => {
    setIsQuoteActive(!isQuoteActive);
  };

  const renderWithMentions = (text) => {
  const regex = /\[@([^\]]+)]\((https?:\/\/[^\)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const before = text.substring(lastIndex, match.index);
    if (before) parts.push(before);

    const displayName = match[1];
    const url = match[2];

    parts.push(
      <a
        key={match.index}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="discord-ping"
      >
        {displayName}
      </a>
    );
    lastIndex = regex.lastIndex;
  }

  parts.push(text.substring(lastIndex));
  return parts;
};

  return (
    <section id="experience" className="experience-section">
      <div className="experience-container">
        <div className="experience-header">
          <h2 className="section-title">About Me</h2>
        </div>

        {/* Personal Introduction Section */}
        <div className="personal-section">
          <div className="personal-content">
            <div className="personal-image">
              <img 
                src="/assets/images/duarte-export.jpg" 
                alt="Your Name" 
                className="profile-image"
              />
            </div>
            <div className="personal-info">
              <div className="personal-intro">
                <h3 className="intro-title">Hey, I'm Duarte</h3>
                <p className="intro-description">
                  A passionate software engineer with a love for creating innovative solutions 
                  and turning ideas into reality. I enjoy working with cutting-edge technologies 
                  and continuously learning new tools to solve complex problems.
                </p>
              </div>
              
              <div className="personal-facts">
                <h4 className="facts-title">Quick Facts</h4>
                <div className="facts-grid">
                  <div className="fact-item">
                    <span className="fact-label">Location:</span>
                    <span className="fact-value">Rorbas, Zürich</span>
                  </div>
                  <div className="fact-item">
                    <span className="fact-label">Experience:</span>
                    <span className="fact-value">{calculateExperience()} years</span>
                  </div>
                  <div className="fact-item">
                    <span className="fact-label">Languages:</span>
                    <span className="fact-value">Portugese, German, English, French</span>
                  </div>
                  <div className="fact-item">
                    <span className="fact-label">Interests:</span>
                    <span className="fact-value">Software Development, IoT, AI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values & Approach Section */}
        <div className="values-section">
          <h3 className="values-title">My Approach</h3>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <FaFigma />
              </div>
              <h4 className="value-title">Planning First</h4>
              <p className="value-description">
                I believe in thorough planning and design before coding. Understanding 
                requirements and mapping out solutions leads to better outcomes.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <FaGitAlt />
              </div>
              <h4 className="value-title">Working Together</h4>
              <p className="value-description">
                Collaboration and teamwork are at the heart of great software. 
                I value open communication and shared knowledge to achieve common goals.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <FaNetworkWired />
              </div>
              <h4 className="value-title">Hybrid Solutions</h4>
              <p className="value-description">
                I create versatile solutions that work across platforms and environments. 
                Building adaptive systems that function anywhere, anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Motivation Section */}
        <div className="motivation-section">
          <h3 className="motivation-title">What Drives Me</h3>
          <div className="motivation-content">
            <div className="motivation-story">
              <div className="story-item">
                <div className="story-icon">
                  <FaApple />
                </div>
                <div className="story-text">
                  <h4 className="story-title">The Beginning</h4>
                  <p className="story-description">
                    Since first grade, I knew I wanted to be an "IT-Man." While other kids dreamed 
                    of becoming astronauts or firefighters, I was captivated by the world of technology 
                    and computers.
                  </p>
                </div>
              </div>
              
              <div className="story-item">
                <div className="story-icon">
                  <FaLaptop />
                </div>
                <div className="story-text">
                  <h4 className="story-title">School Days</h4>
                  <p className="story-description">
                    Throughout school, I was always "the kid who is good with computers." Whether it was 
                    fixing classmates' tech issues or helping teachers with their presentations, 
                    technology just made sense to me.
                  </p>
                </div>
              </div>
              
              <div className="story-item">
                <div className="story-icon">
                  <FaMobileAlt />
                </div>
                <div className="story-text">
                  <h4 className="story-title">The Fascination</h4>
                  <p className="story-description">
                    What truly fascinated me was the magic behind simple interactions - clicking on an app 
                    and watching it launch completely different software. That curiosity about how things 
                    work under the hood drives everything I do today.
                  </p>
                </div>
              </div>
            </div>
            
            <div 
              className={`motivation-quote ${isQuoteActive ? 'quote-active' : ''}`}
              onClick={handleQuoteClick}
            >
              <div className="quote-item">
                <img 
                  src="/assets/images/bill-gates.png" 
                  alt="Bill Gates" 
                  className="quote-author-image gates-image"
                />
                <blockquote>
                  "Your most unhappy customers are your greatest source of learning."
                </blockquote>
                <cite className="quote-author">- Bill Gates</cite>
              </div>
              
              <div className="quote-item">
                <img 
                  src="/assets/images/steve-jobs.png" 
                  alt="Steve Jobs" 
                  className="quote-author-image jobs-image"
                />
                <blockquote>
                  "Everybody in this country should learn to program a computer, because it teaches you how to think."
                </blockquote>
                <cite className="quote-author">- Steve Jobs</cite>
              </div>
              
              <p className="quote-context">
                These philosophies guide my approach to software development - learning from feedback 
                and understanding that programming is fundamentally about problem-solving and logical thinking.
              </p>
            </div>
          </div>
        </div>

        <div className="experience-content">
          <h3 className="values-title">Experience</h3>
          <div className="timeline">
{experiences.map((exp, index) => (
              <div key={index} className="timeline-item" style={{ '--animation-order': index }}>
                <div className="timeline-dot" style={{ backgroundColor: exp.color }}></div>
                {index < experiences.length - 1 && (
                  <div className="timeline-line" style={{ backgroundColor: exp.color }}></div>
                )}
                <div className="timeline-content">
                  <div className="timeline-header">
                    {exp.logo ? (
                      <div className="company-logo">
                        <img src={exp.logo} alt={`${exp.company} logo`} />
                      </div>
                    ) : (
                      <div className="company-logo default-logo" style={{ backgroundColor: exp.color || 'var(--timeline-dot-color)' }}>
                        <FaBuilding />
                      </div>
                    )}
                    <div className="timeline-header-text">
                      <h3 className="timeline-title">
                        {exp.position} <span className="timeline-company" style={{ color: exp.color || 'var(--timeline-dot-color)' }}>@ {exp.company}</span>
                      </h3>
                      <div className="timeline-period">{exp.period}</div>
                    </div>
                  </div>
                  <p className="timeline-description">
  {renderWithMentions(exp.description)}
</p>

                  
                  {/* Supervisor Information */}
                  {exp.supervisor && (
                    <div className="supervisor-info">
                      <span className="supervisor-text">
                        {exp.supervisor.isWebsite ? 'Organized by: ' : 'Supervised by: '}
                      </span>
                      {exp.supervisor.isWebsite ? (
                        <a 
                          href={exp.supervisor.contact} 
                          className="supervisor-contact discord-ping"
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          {exp.supervisor.name}
                        </a>
                      ) : (
                        <>
                          <span className="supervisor-name">{exp.supervisor.name}</span>
                          <span className="supervisor-separator"> • </span>
                          <a href={`mailto:${exp.supervisor.contact}`} className="supervisor-contact">
                            {exp.supervisor.contact}
                          </a>
                        </>
                      )}
                    </div>
                  )}                  
                  <div className="timeline-technologies">
                    {exp.technologies.map(tech => {
                      const TechIcon = technologyIcons[tech] || null;
                      return (
                        <span key={tech} className="tech-tag">
                          {TechIcon && <TechIcon className="tech-icon" />}
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <a href="/projects" className="cta-link">
                    Explore my projects <span className="arrow">→</span>
                </a>

        <div className="skills-section">
          <h3 className="skills-title">Technologies & Skills</h3>
          <div className="skills-container">
            {skillGroups.map((group, index) => (
              <div key={index} className="skill-group" style={{ '--animation-order': index + experiences.length }}>
                <h4 className="skill-category">{group.category}</h4>
                <div className="skill-tags">
                  {group.skills.map(skill => {
                    const SkillIcon = technologyIcons[skill] || null;
                    return (
                      <div key={skill} className="skill-tag">
                        {SkillIcon && <SkillIcon className="skill-icon" />}
                        <span>{skill}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;