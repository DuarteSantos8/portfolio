import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import loc from '../utils/loc';
import { FaGitlab, FaGithub, FaExternalLinkAlt, FaGlobe, FaTerminal, FaCode, FaReact, FaPython, FaHtml5, FaCss3Alt, FaVuejs, FaJs, FaRaspberryPi, FaCamera, FaNetworkWired, FaTelegram, FaClock, FaLinux, FaDocker, FaHammer, FaMicrochip, FaPlug, FaTasks } from 'react-icons/fa';
import { SiFlask, SiOpenvpn, SiMysql, SiFirebase, SiBootstrap, SiQlik, SiOpencv, SiNumpy, SiMediapipe, SiGnubash, SiGrafana, SiInfluxdb, SiNginx, SiNodedotjs, SiVite, SiPwa, SiWebauthn, SiCapacitor, SiAndroid } from 'react-icons/si';
import { MdSensors } from "react-icons/md";
import { LuFileJson2 } from "react-icons/lu";
import './ProjectsPage.css';
import projectsData from '../data/projectsData.json';
import ProjectImageCarousel from '../components/ProjectImageCarousel';
import RepoStars from '../components/RepoStars';

const TechnologyIcons = {
  'React': FaReact, 'JavaScript': FaJs, 'Python': FaPython, 'HTML': FaHtml5,
  'CSS': FaCss3Alt, 'Vue.js': FaVuejs, 'Flask': SiFlask, 'MySQL': SiMysql,
  'Firebase': SiFirebase, 'Bootstrap': SiBootstrap, 'Qlik': SiQlik,
  'OpenCV': SiOpencv, 'virtualenv': FaTerminal, 'CVZone': FaCode,
  'NumPy': SiNumpy, 'MediaPipe': SiMediapipe, 'Raspberry Pi OS': FaRaspberryPi,
  'Raspberry Pi Camera Module': FaCamera, 'PIR Motion Sensor': MdSensors,
  'RPi.GPIO': FaNetworkWired, 'Telegram Bot API': FaTelegram, 'OpenVPN': SiOpenvpn,
  'JSON Server': LuFileJson2, 'Bash': SiGnubash, 'Ping': FaNetworkWired,
  'Telnet': FaTerminal, 'InfluxDB': SiInfluxdb, 'Grafana': SiGrafana,
  'Cron': FaClock, 'Linux': FaLinux, 'Docker': FaDocker, 'Nginx': SiNginx,
  'Networking': FaNetworkWired, 'Raspberry Pi': FaRaspberryPi,
  'Woodworking': FaHammer, 'Electronics': FaMicrochip,
  'Wiring': FaPlug, 'Project Management': FaTasks,
  'Node.js': SiNodedotjs, 'Vite': SiVite, 'PWA': SiPwa, 'WebAuthn': SiWebauthn,
  'Capacitor': SiCapacitor, 'Android': SiAndroid,
};

const RepoIcons = { github: FaGithub, gitlab: FaGitlab };

// Ohne repoHost gilt die Faustregel: Arbeitsprojekte liegen im DAL-GitLab,
// private auf GitHub. repoHost ueberschreibt das pro Projekt.
const repoHostOf = (project) =>
  project.repoHost || (project.category === 'Professional' ? 'gitlab' : 'github');

const RepoLink = ({ project, t }) => {
  const Icon = RepoIcons[repoHostOf(project)] || FaGithub;
  const label = project.category === 'Professional'
    ? t.projects.gitlabLabel
    : repoHostOf(project) === 'gitlab' ? t.projects.gitlabPublicLabel : t.projects.githubLabel;

  return (
    <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="project-link">
      <Icon /> {label}
    </a>
  );
};

// Monatsnamen selbst auflösen statt new Date(str): Safari/iOS parst
// "August 2024" nicht und liefert Invalid Date — dann wäre die Liste unsortiert.
const MONTHS = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

// "March 2026" | "2025" | "Present" → sortierbare Zahl (Jahr * 12 + Monat)
const parseMonth = (part) => {
  const str = (part ?? '').trim();
  if (!str) return -Infinity;
  if (/present|current|now/i.test(str)) return Infinity;

  const year = str.match(/\b(\d{4})\b/);
  if (!year) return -Infinity;

  const month = str.match(/[a-zäöüç]+/i);
  const index = month ? MONTHS[month[0].slice(0, 3).toLowerCase()] : undefined;
  return Number(year[1]) * 12 + (index ?? 0);
};

const projectRank = (project) => {
  const dateField = project.date;
  const dateStr = typeof dateField === 'object' && dateField !== null
    ? (dateField.en ?? '')
    : (dateField ?? '');
  const [start, end] = dateStr.split('-').map(s => s.trim());
  return { start: parseMonth(start), end: parseMonth(end ?? start) };
};

// Infinity - Infinity wäre NaN und damit ein kaputter Comparator
const desc = (a, b) => (a === b ? 0 : (b > a ? 1 : -1));

// Neustes zuerst: primär nach Startdatum, bei Gleichstand entscheidet das Enddatum
// (laufende Projekte "… - Present" landen damit oben). "featured" steht immer ganz oben.
const sortedProjects = [...projectsData]
  .map(project => ({ project, rank: projectRank(project) }))
  .sort((a, b) => desc(!!a.project.featured, !!b.project.featured)
    || desc(a.rank.start, b.rank.start) || desc(a.rank.end, b.rank.end))
  .map(entry => entry.project);

const ProjectsPage = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef(null);

  const { categoryKeys, categoryLabels } = t.projects;

  const filteredProjects = useMemo(
    () => (activeCategory === 'All'
      ? sortedProjects
      : sortedProjects.filter(project => project.category === activeCategory)),
    [activeCategory]
  );

  const handleCategoryChange = (key) => {
    if (key === activeCategory) return;
    setAnimating(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveCategory(key);
      setAnimating(false);
    }, 200);
  };

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <div className="projects-header">
          <h2 className="section-title">{t.projects.title}</h2>
        </div>

        <div className="project-categories">
          {categoryKeys.map((key, i) => (
            <button
              key={key}
              className={`category-button ${activeCategory === key ? 'active' : ''}`}
              onClick={() => handleCategoryChange(key)}
            >
              {categoryLabels[i]}
            </button>
          ))}
        </div>

        <div className={`projects-grid${animating ? ' animating' : ''}`}>
          {filteredProjects.map((project, index) => (
            <div
              key={project.name}
              className={`project-card${project.featured ? ' featured' : ''}`}
              style={{ '--animation-order': index }}
            >
              {project.featured ? (
                <div className="featured-shots">
                  {project.images.map((src, i) => (
                    <img key={src} src={src} alt={`${project.name} screenshot ${i + 1}`} loading="lazy" />
                  ))}
                </div>
              ) : (
                <ProjectImageCarousel images={project.images} />
              )}
              <div className="project-body">
              {project.featured && <span className="featured-badge">{t.projects.featuredLabel}</span>}
              <h3 className="project-title">{project.name}</h3>
              <p className="project-description">{loc(project.description, language)}</p>

              {project.highlights && (
                <ul className="featured-highlights">
                  {loc(project.highlights, language).map(h => <li key={h}>{h}</li>)}
                </ul>
              )}

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

              <div className="project-date">{loc(project.date, language)}</div>

              <div className="project-links">
                {project.repoLink && <RepoLink project={project} t={t} />}
                {project.siteLink && (
                  <a href={project.siteLink} target="_blank" rel="noopener noreferrer" className="project-link">
                    <FaGlobe /> {t.projects.websiteLabel}
                  </a>
                )}
                {project.demoLink && (
                  <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="project-link">
                    <FaExternalLinkAlt /> {t.projects.demoLabel}
                  </a>
                )}
                {project.starsRepo && (
                  <RepoStars
                    repo={project.starsRepo}
                    host={repoHostOf(project)}
                    href={project.repoLink}
                    label={t.projects.starsLabel}
                  />
                )}
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsPage;
