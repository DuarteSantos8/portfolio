import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FaGitlab, FaGithub, FaExternalLinkAlt, FaTerminal, FaCode, FaReact, FaPython, FaHtml5, FaCss3Alt, FaVuejs, FaJs, FaRaspberryPi, FaCamera, FaNetworkWired, FaTelegram, FaClock, FaLinux} from 'react-icons/fa';
import { SiFlask, SiOpenvpn, SiMysql, SiFirebase, SiBootstrap, SiQlik, SiOpencv, SiNumpy, SiMediapipe, SiGnubash, SiGrafana, SiInfluxdb } from 'react-icons/si';
import { MdSensors } from "react-icons/md";
import { LuFileJson2 } from "react-icons/lu";
import './ProjectsPage.css';
import projectsData from '../data/projectsData.json'; // Import the JSON data

const TechnologyIcons = {
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
  'virtualenv': FaTerminal,
  'CVZone': FaCode,
  'NumPy': SiNumpy,
  'MediaPipe': SiMediapipe,
  'Raspberry Pi OS': FaRaspberryPi,
  'Raspberry Pi Camera Module': FaCamera,
  'PIR Motion Sensor': MdSensors,
  'RPi.GPIO':FaNetworkWired,
  'Telegram Bot API':FaTelegram,
  'OpenVPN': SiOpenvpn,
  'JSON Server': LuFileJson2,
  'Bash': SiGnubash,
  'Ping': FaNetworkWired,
  'Telnet': FaTerminal,
  'InfluxDB': SiInfluxdb,
  'Grafana': SiGrafana,
  'Cron': FaClock,
  'Linux': FaLinux
};

const ProjectsPage = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);

  const categories = ['All', 'Professional', 'Personal'];

  useEffect(() => {
    const filtered = activeCategory === 'All' 
      ? projectsData 
      : projectsData.filter(project => project.category === activeCategory);
    
    setFilteredProjects(filtered);

  }, [activeCategory]);

  useEffect(() => {
    if (isDarkMode !== undefined) { }
    if (toggleTheme !== undefined) { }
  }, [isDarkMode, toggleTheme]);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <div className="projects-header">
          <h2 className="section-title">Projects</h2>
        </div>

        <div className="project-categories">
          {categories.map(category => (
            <button
              key={category}
              className={`category-button ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Add a key to force re-render */}
        <div className="projects-grid" key={activeCategory}>
          {filteredProjects.map((project, index) => (
            <div
              key={project.name}
              className="project-card"
              style={{ '--animation-order': index }}
            >
              {project.image && (
                <div className="project-image-container">
                  <img
                    src={project.image}
                    alt={`${project.name} project screenshot`}
                    className="project-image"
                  />
                </div>
              )}
              <h3 className="project-title">{project.name}</h3>
              <p className="project-description">{project.description}</p>

              <div className="project-technologies">
                {project.technologies.map(tech => {
                  const TechIcon = TechnologyIcons[tech] || null;
                  return (
                    <span key={tech} className="tech-tag">
                      {TechIcon && <TechIcon className="tech-icon" />}
                      {TechIcon && ' '}
                      {tech}
                    </span>
                  );
                })}
              </div>

              <div className="project-date">{project.date}</div>

              <div className="project-links">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    {project.category === 'Professional' ? <FaGitlab /> : <FaGithub />}
                    {project.category === 'Professional' ? 'DAL GitLab' : 'GitHub'}
                  </a>
                )}
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <FaExternalLinkAlt /> Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsPage;
