import React, { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FaGitlab, FaGithub, FaExternalLinkAlt, FaTerminal, FaCode, FaReact, FaPython, FaHtml5, FaCss3Alt, FaVuejs, FaJs } from 'react-icons/fa';
import { SiFlask, SiMysql, SiFirebase, SiBootstrap, SiQlik, SiOpencv, SiNumpy, SiMediapipe } from 'react-icons/si';
import './ProjectsPage.css';

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
  'Python': FaPython,
  'OpenCV': SiOpencv,
  'virtualenv': FaTerminal,
  'CVZone': FaCode,
  'NumPy': SiNumpy,
  'MediaPipe': SiMediapipe,
};

const ProjectsPage = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [activeCategory, setActiveCategory] = useState('All');

  const projects = [
    {
      name: 'MediStock',
      description: "An easy-to-use reservation tool for Sunrise's Multi Media Team to manage and book equipment efficiently.",
      technologies: ['JavaScript', 'Python', 'HTML', 'CSS', 'React', 'Flask', 'MySQL', 'Firebase'],
      githubLink: 'https://github.com/yourusername/medistock',
      demoLink: 'https://medistock.sunrise-avengers.ch/',
      category: 'Professional',
      date: 'August 2024 - Present',
      image: null
    },
    {
      name: 'SalesChamp',
      description: 'A simple points-tracking dashboard for Sunrise sales agents to view and track their performance in real time.',
      technologies: ['JavaScript', 'HTML', 'CSS', 'Vue.js', 'Bootstrap', 'Qlik'],
      githubLink: 'https://git.sunrise-avengers.ch/appli/saleschamp',
      demoLink: 'https://saleschamp.sunrise-avengers.ch/',
      category: 'Professional',
      date: 'Jan 2025 - Present',
      image: null
    },
    {
      name: 'Handsign Translator',
      description: 'A real-time application that translates hand gestures into text using computer vision and machine learning.',
      technologies: ['Python', 'OpenCV', 'virtualenv', 'CVZone', 'NumPy', 'MediaPipe'],
      githubLink: 'https://github.com/yourusername/portfolio',
      demoLink: 'https://yourportfolio.com',
      category: 'Personal',
      date: 'March 2024 – Present',
      image: null
    }
  ];

  const categories = ['All', 'Professional', 'Personal'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  React.useEffect(() => {
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

        <div className="projects-grid">
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