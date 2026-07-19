import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { trackEvent } from '../../utils/analytics';
import {
  faGithub,
  faPython,
  faJava,
  faJs,
  faReact,
  faAws,
  faDocker,
  faGit,
  faLinux,
  faHtml5,
  faCss3,
  faBootstrap,
  faNodeJs,
  faSass,
  faMicrosoft,
} from '@fortawesome/free-brands-svg-icons';
import {
  faGraduationCap,
  faCalendar,
  faLocationDot,
  faDatabase,
  faCode,
  faCogs,
  faLayerGroup,
  faBriefcase,
  faFlask,
  faCubes,
  faNetworkWired,
  faCloud,
  faCodeBranch,
  faFireAlt,
  faDownload,
  faEye,
  faUserTie,
  faServer,
  faLock,
  faTerminal,
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import './Resume.scss';

const Resume = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, offset: 50 });
  }, []);

  const education = {
    school: 'Modern Academy in Maadi',
    degree: 'Bachelor of Computer Science',
    date: '2021 - 2025',
    location: 'Cairo, Egypt',
    url: 'https://mng.modern-academy.edu.eg/',
  };

  const experiences = [
    {
      company: 'Beshara Group',
      role: 'Java Developer',
      date: 'Nov 2025 – Present',
      location: 'Cairo, Egypt',
      url: 'https://ebeshara.com/',
    },
    {
      company: 'Django Software Foundation',
      role: 'Open Source Contributor',
      date: 'Jan 2025 – Present',
      location: 'Remote',
      url: 'https://www.djangoproject.com',
    },
    {
      company: 'Mercor',
      role: 'Software Engineer',
      date: 'Oct 2025 – Dec 2025',
      location: 'Remote',
      url: 'https://www.mercor.com',
    },
    {
      company: 'Nile University',
      role: 'AI Researcher Intern',
      date: 'Jul 2025 – Aug 2025',
      location: 'Cairo, Egypt',
      url: 'https://www.nu.edu.eg',
    },
    {
      company: 'Orange Digital Center',
      role: 'Software Engineer Intern',
      date: 'Sep 2024 – Oct 2024',
      location: 'Cairo, Egypt',
      url: 'https://www.orangedigitalcenters.com/country/EG/home',
    },
    {
      company: 'Information Technology Institute',
      role: 'Web Development using Python',
      date: 'Jul 2024 – Sep 2024',
      location: 'Cairo, Egypt',
      url: 'https://iti.gov.eg/home',
    },
    {
      company: 'Nokia',
      role: 'Software Engineer Intern',
      date: 'Aug 2023 – Oct 2023',
      location: 'Cairo, Egypt',
      url: 'https://www.nokia.com/',
    },
  ];

  const projects = [
    {
      name: 'Egypt Metro Backend',
      url: 'https://github.com/Egypt-Metro/backend',
      tech: [
        'Python',
        'Django',
        'DRF',
        'PostgreSQL',
        'JavaScript',
        'HTML',
        'CSS',
      ],
      description:
        'Scalable Django backend serving millions of users with 60+ RESTful APIs, real-time train tracking, and secure ticketing.',
    },
    {
      name: 'PDF Toolkit',
      url: 'https://github.com/AhmedNassar7/toolkit',
      liveUrl: 'https://ahmednassar7.github.io/toolkit/',
      tech: [
        'React',
        'TypeScript',
        'Node.js',
        'Docker',
        'Tailwind',
        'Supabase',
      ],
      description:
        '22 client-side PDF tools — merge, split, compress, encrypt, convert — with zero server storage.',
    },
    {
      name: 'Tracker',
      url: 'https://github.com/AhmedNassar7/tracker',
      tech: ['Python', 'GitHub Actions', 'Automation', 'Web Scraping'],
      description:
        'Automated hourly tracker for software engineering jobs, internships, and hackathons — no sign-up needed.',
    },
    {
      name: 'Software Engineering',
      url: 'https://github.com/AhmedNassar7/Software-Engineering',
      tech: [
        'Markdown',
        'GitHub Actions',
        'Open Source',
        'Community',
        'Documentation',
      ],
      description:
        'Community hub with 500+ GitHub stars and 1000+ Discord members for tech opportunities.',
    },
    {
      name: 'Portfolio',
      url: 'https://github.com/AhmedNassar7/AhmedNassar7.github.io',
      liveUrl: 'https://ahmednassar7.github.io/',
      tech: [
        'React',
        'JavaScript',
        'Node.js',
        'SCSS',
        'Bootstrap',
        'Firebase',
        'GitHub Actions',
      ],
      description:
        'Interactive portfolio with animated backgrounds, dark/light themes, and CI/CD deployment.',
    },
    {
      name: 'Upwork Clone',
      url: 'https://github.com/activecourses/upwork-clone-frontend',
      tech: ['React', 'TypeScript', 'Material-UI'],
      description:
        'Frontend replicating core Upwork features with React, TypeScript, and Material-UI.',
    },
  ];

  const skills = {
    Languages: [
      { name: 'Java', icon: faJava },
      { name: 'Python', icon: faPython },
      { name: 'C++', icon: faCode },
      { name: 'C#', icon: faMicrosoft },
      { name: 'JavaScript', icon: faJs },
      { name: 'TypeScript', icon: faJs },
      { name: 'SQL', icon: faDatabase },
      { name: 'HTML', icon: faHtml5 },
      { name: 'CSS', icon: faCss3 },
    ],
    Frameworks: [
      { name: 'Django', icon: faPython },
      { name: 'DRF', icon: faPython },
      { name: 'Spring Boot', icon: faJava },
      { name: 'React', icon: faReact },
      { name: 'Node.js', icon: faNodeJs },
      { name: 'Bootstrap', icon: faBootstrap },
      { name: 'SCSS', icon: faSass },
      { name: 'Firebase', icon: faFireAlt },
      { name: 'Redux', icon: faLayerGroup },
    ],
    Tools: [
      { name: 'Git', icon: faGit },
      { name: 'GitHub', icon: faGithub },
      { name: 'Docker', icon: faDocker },
      { name: 'Kubernetes', icon: faCloud },
      { name: 'AWS', icon: faAws },
      { name: 'Linux', icon: faLinux },
      { name: 'Postman', icon: faServer },
      { name: 'Jira', icon: faCogs },
      { name: 'Jenkins', icon: faCogs },
    ],
    Databases: [
      { name: 'PostgreSQL', icon: faDatabase },
      { name: 'MySQL', icon: faDatabase },
      { name: 'Oracle', icon: faDatabase },
      { name: 'MS SQL Server', icon: faDatabase },
      { name: 'MongoDB', icon: faDatabase },
      { name: 'SQLite', icon: faDatabase },
    ],
    Concepts: [
      { name: 'OOP', icon: faCubes },
      { name: 'SOLID', icon: faLock },
      { name: 'Design Patterns', icon: faCogs },
      { name: 'System Design', icon: faNetworkWired },
      { name: 'Microservices', icon: faCubes },
      { name: 'APIs', icon: faCodeBranch },
      { name: 'CI/CD', icon: faTerminal },
      { name: 'Agile', icon: faLayerGroup },
      { name: 'Testing', icon: faFlask },
    ],
  };

  const trackProjectClick = (projectName) => {
    trackEvent({
      action: 'click',
      category: 'Project Link',
      label: projectName,
      value: 1,
    });
  };

  const RESUME_URL = '/assets/PDFs/Ahmed_Nassar_Resume.pdf';
  const RESUME_VIEW_URL =
    'https://drive.google.com/file/d/1AZ9sVmv92Bqf_8hZIC49jYnkNMwwdTUv/view?usp=sharing';

  const handleResumeView = () => {
    trackEvent({
      action: 'view_resume',
      category: 'Resume',
      label: 'Resume View',
      value: 1,
    });

    window.open(RESUME_VIEW_URL, '_blank');
  };

  const handleResumeDownload = () => {
    trackEvent({
      action: 'download_resume',
      category: 'Resume',
      label: 'Resume Download',
      value: 1,
    });

    const link = document.createElement('a');
    link.href = RESUME_URL;
    link.download = 'Ahmed_Nassar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="resume" className="resume-section">
      <Container>
        <h2 className="section-title text-center mb-5" data-aos="fade-up">
          Resume
        </h2>

        <Row className="mb-5">
          <Col lg={12} data-aos="fade-up">
            <div className="resume-card summary-card">
              <h3>
                <FontAwesomeIcon icon={faUserTie} /> Summary
              </h3>
              <p className="summary-text">
                Software Engineer with experience in Java enterprise systems and
                Python/Django development. Recognized DSF Individual Member and
                Django core contributor with 20+ pull requests to
                production-scale open-source infrastructure. Skilled in building
                scalable REST APIs and database-driven systems for
                national-scale applications.
              </p>
            </div>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col lg={12} data-aos="fade-up">
            <div className="resume-card">
              <h3>
                <FontAwesomeIcon icon={faBriefcase} /> Experience
              </h3>
              {experiences.map((exp, index) => (
                <div key={index} className="experience-item">
                  <h4>
                    <a href={exp.url} target="_blank" rel="noopener noreferrer">
                      {exp.company}
                    </a>
                  </h4>
                  <p className="role">{exp.role}</p>
                  <div className="details">
                    <p>
                      <FontAwesomeIcon icon={faCalendar} /> {exp.date}
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faLocationDot} /> {exp.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col lg={12} data-aos="fade-up">
            <div className="resume-card">
              <h3>
                <FontAwesomeIcon icon={faGraduationCap} /> Education
              </h3>
              <div className="education-item">
                <h4>
                  <a
                    href={education.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {education.school}
                  </a>
                </h4>
                <p className="degree">{education.degree}</p>
                <div className="details">
                  <p>
                    <FontAwesomeIcon icon={faCalendar} /> {education.date}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faLocationDot} />{' '}
                    {education.location}
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col lg={12} data-aos="fade-up" data-aos-delay="100">
            <div className="resume-card">
              <h3>
                <FontAwesomeIcon icon={faGithub} /> Projects
              </h3>
              <div className="projects-grid">
                {projects.map((project, index) => (
                  <div key={index} className="project-item">
                    <div className="project-header">
                      <h4>{project.name}</h4>
                      <div className="project-links">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${project.name} live demo`}
                            onClick={() =>
                              trackProjectClick(`${project.name} (live)`)
                            }
                          >
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                          </a>
                        )}
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.name} on GitHub`}
                          onClick={() => trackProjectClick(project.name)}
                        >
                          <FontAwesomeIcon icon={faGithub} />
                        </a>
                      </div>
                    </div>
                    <p className="project-description">{project.description}</p>
                    <div className="tech-stack">
                      {project.tech.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={12} data-aos="fade-up" data-aos-delay="200">
            <div className="resume-card">
              <h3>
                <FontAwesomeIcon icon={faCode} /> Skills
              </h3>
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="skills-category">
                  <h4>{category}</h4>
                  <div className="skills-grid">
                    {items.map((skill, index) => (
                      <span
                        key={index}
                        className="skill-item"
                        data-aos="fade-up"
                        data-aos-delay={index * 50}
                      >
                        <FontAwesomeIcon icon={skill.icon} />
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center mt-5">
          <Col
            lg={12}
            className="text-center"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="resume-actions">
              <button onClick={handleResumeView} className="view-btn">
                <FontAwesomeIcon icon={faEye} /> View Resume
              </button>
              <button onClick={handleResumeDownload} className="download-btn">
                <FontAwesomeIcon icon={faDownload} /> Download Resume
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Resume;
