import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import data from '../data/aboutData.json';
import { FaReact, FaPython, FaHtml5, FaCss3Alt, FaVuejs, FaJava, FaRaspberryPi, FaBuilding, FaJs, FaMobileAlt, FaLinux, FaGitAlt, FaDocker, FaNetworkWired, FaFigma } from 'react-icons/fa';
import { SiFlask, SiMysql, SiFirebase, SiBootstrap, SiQlik, SiOpencv, SiNumpy, SiMediapipe, SiSpring, SiNginx, SiGnubash, SiPostman, SiCanva, SiIntellijidea, SiPycharm, SiMongodb } from 'react-icons/si';
import { IoTerminal } from "react-icons/io5";
import { MdNetworkWifi } from 'react-icons/md';
import { BiLogoVisualStudio } from "react-icons/bi";
import './AboutPage.css';

const AboutPage = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const { experiences, skillGroups } = data;

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
    'MongoDB': SiMongodb
  };

  return (
    <section id="experience" className="experience-section">
      <div className="experience-container">
        <div className="experience-header">
          <h2 className="section-title">About me</h2>
        </div>

        <div className="experience-content">
          <div className="timeline">
            {experiences.map((exp, index) => (
              <div key={index} className="timeline-item" style={{ '--animation-order': index }}>
                <div className="timeline-dot" style={{ backgroundColor: exp.color || 'var(--timeline-dot-color)' }}></div>
                {index < experiences.length - 1 && (
                  <div className="timeline-line" style={{ backgroundColor: exp.color ? `${exp.color}80` : 'var(--timeline-line-color)' }}></div>
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
                    <div>
                      <h3 className="timeline-title">
                        {exp.position} <span className="timeline-company" style={{ color: exp.color || 'var(--timeline-dot-color)' }}>@ {exp.company}</span>
                      </h3>
                      <div className="timeline-period">{exp.period}</div>
                    </div>
                  </div>
                  <p className="timeline-description">{exp.description}</p>
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
