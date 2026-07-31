import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import loc from '../utils/loc';
import data from '../data/aboutData.json';
import useInView from '../hooks/useInView';
import { FaReact, FaPython, FaHtml5, FaCss3Alt, FaVuejs, FaJava, FaRaspberryPi, FaBuilding, FaJs, FaMobileAlt, FaLinux, FaGitAlt, FaDocker, FaNetworkWired, FaFigma, FaApple, FaWindows, FaLaptop, FaMapMarkerAlt, FaBriefcase, FaLanguage, FaLightbulb } from 'react-icons/fa';
import { SiFlask, SiMysql, SiFirebase, SiBootstrap, SiQlik, SiOpencv, SiNumpy, SiMediapipe, SiSpring, SiNginx, SiGnubash, SiPostman, SiCanva, SiIntellijidea, SiPycharm, SiMongodb, SiGrafana, SiInfluxdb } from 'react-icons/si';
import { IoTerminal } from "react-icons/io5";
import { MdNetworkWifi } from 'react-icons/md';
import { BiLogoVisualStudio } from "react-icons/bi";
import './AboutPage.css';
import SpotifyMusicSection from '../components/SpotifyMusicSection';

const AboutPage = () => {
  const { t, language } = useLanguage();
  const { experiences, skillGroups } = data;

  const [valuesRef, valuesInView] = useInView(0.1);
  const [motivationRef, motivationInView] = useInView(0.05);
  const [timelineRef, timelineInView] = useInView(0.05);
  const [skillsRef, skillsInView] = useInView(0.1);
  const [factsRef, factsInView] = useInView(0.6);

  const experienceYears = useMemo(() => {
    const startDate = new Date('2023-08-01');
    const diff = (new Date() - startDate) / (1000 * 60 * 60 * 24 * 365.25);
    return parseFloat(diff.toFixed(1));
  }, []);

  const [displayExp, setDisplayExp] = useState('0.0');

  useEffect(() => {
    if (!factsInView) return;
    const steps = 50;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const current = Math.min((step / steps) * experienceYears, experienceYears);
      setDisplayExp(current.toFixed(1));
      if (step >= steps) clearInterval(timer);
    }, 1400 / steps);
    return () => clearInterval(timer);
  }, [factsInView, experienceYears]);

  const technologyIcons = {
    'React': FaReact, 'JavaScript': FaJs, 'Python': FaPython, 'HTML': FaHtml5,
    'CSS': FaCss3Alt, 'Vue.js': FaVuejs, 'Flask': SiFlask, 'MySQL': SiMysql,
    'Firebase': SiFirebase, 'Bootstrap': SiBootstrap, 'Qlik': SiQlik,
    'OpenCV': SiOpencv, 'NumPy': SiNumpy, 'MediaPipe': SiMediapipe,
    'Raspberry Pi OS': FaRaspberryPi, 'Raspberry Pi': FaRaspberryPi,
    'Java': FaJava, 'Springboot': SiSpring, 'IoT': IoTerminal,
    'Expo Go': FaMobileAlt, 'Linux': FaLinux, 'Networking': MdNetworkWifi,
    'Git': FaGitAlt, 'Docker': FaDocker, 'Nginx': SiNginx, 'Bash': SiGnubash,
    'Scripting': SiGnubash, 'nmcli': FaNetworkWired, 'Postman': SiPostman,
    'Figma': FaFigma, 'Canva': SiCanva, 'VS Code': BiLogoVisualStudio,
    'IntelliJ IDEA': SiIntellijidea, 'PyCharm': SiPycharm, 'MongoDB': SiMongodb,
    'MacOS': FaApple, 'Windows 10': FaWindows, 'Windows 11': FaWindows,
    'Grafana': SiGrafana, 'InfluxDB': SiInfluxdb, 'VM': FaLaptop,
  };

  const skillTooltips = t.about.skillTooltips;

  const renderDescription = (text) => {
    const parts = text.split(/(\[.*?\]\(.*?\))/g);
    return parts.map((part, i) => {
      const match = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (match) {
        return <a key={i} href={match[2]} target="_blank" rel="noopener noreferrer">{match[1]}</a>;
      }
      return part;
    });
  };

  const [isQuoteActive, setIsQuoteActive] = useState(false);

  const valueIcons = [FaFigma, FaGitAlt, FaNetworkWired];

  return (
    <section id="experience" className="experience-section">
      <div className="experience-container">
        <div className="experience-header">
          <h2 className="section-title">{t.about.title}</h2>
        </div>

        {/* Personal Introduction */}
        <div className="personal-section">
          <div className="personal-card">
            <div className="personal-image-wrap">
              <img
                src="/assets/images/duarte-export.jpg"
                alt="Duarte Santos"
                className="profile-image"
              />
            </div>
            <div className="personal-text">
              <h3 className="intro-title">{t.about.introTitle}</h3>
              <p className="intro-description">{t.about.introDesc}</p>
            </div>
          </div>

          <div ref={factsRef} className="personal-stats">
            <div className="stat-card">
              <FaMapMarkerAlt className="stat-icon" />
              <span className="stat-label">{t.about.statLocation}</span>
              <span className="stat-value">Rorbas, Zürich</span>
            </div>
            <div className="stat-card">
              <FaBriefcase className="stat-icon" />
              <span className="stat-label">{t.about.statExperience}</span>
              <span className="stat-value fact-counter">{displayExp} {t.about.statYears}</span>
            </div>
            <div className="stat-card">
              <FaLanguage className="stat-icon" />
              <span className="stat-label">{t.about.statLanguages}</span>
              <span className="stat-value">PT · DE · EN · FR</span>
            </div>
            <div className="stat-card">
              <FaLightbulb className="stat-icon" />
              <span className="stat-label">{t.about.statInterests}</span>
              <span className="stat-value">Dev · IoT · AI · Gym · Scouts</span>
            </div>
          </div>
        </div>

        {/* Music */}
        <SpotifyMusicSection />

        {/* Values & Approach */}
        <div ref={valuesRef} className={`values-section${valuesInView ? ' is-visible' : ''}`}>
          <h3 className="values-title">{t.about.valuesTitle}</h3>
          <div className="values-grid">
            {t.about.values.map((val, i) => {
              const Icon = valueIcons[i];
              return (
                <div key={i} className="value-card" style={{ '--animation-order': i }}>
                  <div className="value-icon"><Icon /></div>
                  <h4 className="value-title">{val.title}</h4>
                  <p className="value-description">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Motivation */}
        <div ref={motivationRef} className={`motivation-section${motivationInView ? ' is-visible' : ''}`}>
          <h3 className="motivation-title">{t.about.motivationTitle}</h3>
          <div className="motivation-content">
            <div className="motivation-story">
              {t.about.stories.map((story, i) => {
                const storyIcons = [FaApple, FaLaptop, FaMobileAlt];
                const Icon = storyIcons[i];
                return (
                  <div key={i} className="story-item" style={{ '--animation-order': i }}>
                    <div className="story-icon"><Icon /></div>
                    <div className="story-text">
                      <h4 className="story-title">{story.title}</h4>
                      <p className="story-description">{story.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className={`motivation-quote${isQuoteActive ? ' quote-active' : ''}`}
              style={{ '--animation-order': 3 }}
              onClick={() => setIsQuoteActive(!isQuoteActive)}
            >
              <div className="quote-item">
                <img src="/assets/images/bill-gates.png" alt="Bill Gates" className="quote-author-image gates-image" />
                <blockquote>
                  "Your most unhappy customers are your greatest source of learning."
                </blockquote>
                <cite className="quote-author">- Bill Gates</cite>
              </div>

              <div className="quote-item">
                <img src="/assets/images/steve-jobs.png" alt="Steve Jobs" className="quote-author-image jobs-image" />
                <blockquote>
                  "Everybody in this country should learn to program a computer, because it teaches you how to think."
                </blockquote>
                <cite className="quote-author">- Steve Jobs</cite>
              </div>

              <p className="quote-context">{t.about.quoteContext}</p>
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="experience-content">
          <h3 className="values-title">{t.about.experienceTitle}</h3>
          <div ref={timelineRef} className={`timeline${timelineInView ? ' is-visible' : ''}`}>
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
                        {loc(exp.position, language)} <span className="timeline-company" style={{ color: exp.color || 'var(--timeline-dot-color)' }}>@ {exp.company}</span>
                      </h3>
                      <div className="timeline-period">{loc(exp.period, language)}</div>
                    </div>
                  </div>
                  <p className="timeline-description">{renderDescription(loc(exp.description, language))}</p>

                  {exp.supervisor && (
                    <div className="supervisor-info">
                      <span className="supervisor-text">{t.about.supervisedBy} </span>
                      <span className="supervisor-name">{exp.supervisor.name}</span>
                      <span className="supervisor-separator"> • </span>
                      <a href={`mailto:${exp.supervisor.contact}`} className="supervisor-contact">
                        {exp.supervisor.contact}
                      </a>
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

        {/* Skills */}
        <div ref={skillsRef} className={`skills-section${skillsInView ? ' is-visible' : ''}`}>
          <h3 className="skills-title">{t.about.skillsTitle}</h3>
          <div className="skills-container">
            {skillGroups.map((group, index) => (
              <div key={index} className="skill-group" style={{ '--animation-order': index }}>
                <h4 className="skill-category">{loc(group.category, language)}</h4>
                <div className="skill-tags">
                  {group.skills.map(skill => {
                    const SkillIcon = technologyIcons[skill] || null;
                    const tooltip = skillTooltips[skill];
                    return (
                      <div
                        key={skill}
                        className="skill-tag"
                        {...(tooltip ? { 'data-tooltip': tooltip } : {})}
                      >
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
