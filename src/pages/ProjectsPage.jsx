import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FaGitlab, FaGithub, FaExternalLinkAlt, FaTerminal, FaCode, FaReact, FaPython, FaHtml5, FaCss3Alt, FaVuejs, FaJs, FaRaspberryPi, FaCamera, FaNetworkWired, FaTelegram} from 'react-icons/fa';
import { SiFlask, SiOpenvpn, SiMysql, SiFirebase, SiBootstrap, SiQlik, SiOpencv, SiNumpy, SiMediapipe } from 'react-icons/si';
import { MdSensors } from "react-icons/md";
import { LuFileJson2 } from "react-icons/lu";
import './ProjectsPage.css';
import projectsData from '../projectsData.json'; // Import the JSON data
import ProjectImageCarousel from '../components/ProjectImageCarousel'; // Import the separate component

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
  'RPi.GPIO': FaNetworkWired,
  'Telegram Bot API': FaTelegram,
  'OpenVPN': SiOpenvpn,
  'JSON Server': LuFileJson2
};

// Convert single image string to array for consistency
const normalizeProjectImages = (projects) => {
  return projects.map(project => {
    // If image is null, return an empty array
    if (!project.image) {
      return { ...project, images: [] };
    }
    
    // If image is a string, convert to array
    if (typeof project.image === 'string') {
      return { ...project, images: [project.image] };
    }
    
    // If image is already an array, use it directly
    if (Array.isArray(project.image)) {
      return { ...project, images: project.image };
    }
    
    return { ...project, images: [] };
  });
};

const ProjectsPage = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [normalizedProjects, setNormalizedProjects] = useState([]);

  const categories = ['All', 'Professional', 'Personal'];

  useEffect(() => {
    // Normalize project data to handle image arrays consistently
    const normalized = normalizeProjectImages(projectsData);
    setNormalizedProjects(normalized);
  }, []);

  useEffect(() => {
    // Filter projects based on active category
    const filtered = activeCategory === 'All' 
      ? normalizedProjects 
      : normalizedProjects.filter(project => project.category === activeCategory);
    
    setFilteredProjects(filtered);
  }, [activeCategory, normalizedProjects]);

  return (
    <section id="projects" className={`projects-section ${!isDarkMode ? 'light-theme' : ''}`}>
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

        <div className="projects-grid" key={activeCategory}>
          {filteredProjects.map((project, index) => (
            <div
              key={project.name}
              className="project-card"
              style={{ '--animation-order': index }}
            >
              <ProjectImageCarousel images={project.images} />
              
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