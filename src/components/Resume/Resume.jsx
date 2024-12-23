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
      company: 'Orange Digital Center',
      role: 'Software Engineer Intern',
      date: 'Sep 2024 – Oct 2024',
      location: 'Cairo, Egypt',
      url: 'https://www.orangedigitalcenters.com/country/EG/home',
    },
    {
      company: 'Information Technology Institute',
      role: 'Full Stack Web Development using Python',
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
      name: 'Egypt Metro',
      url: 'https://github.com/Egypt-Metro/backend',
      tech: ['Python', 'Django', 'PostgreSQL', 'Docker', 'API', 'DRF', 'JWT'],
      description:
        'Egypt metro backend provide APIs, business logic, and an admin panel.',
    },
    {
      name: 'Ahmed Nassar',
      url: 'https://github.com/AhmedNassar7/AhmedNassar7.github.io',
      tech: ['React', 'SCSS', 'HTML', 'CSS', 'Bootstrap', 'Firebase', 'UI/UX'],
      description:
        'Personal portfolio website in a modern, dynamic, and interactive way.',
    },
    {
      name: 'Upwork Clone',
      url: 'https://github.com/activecourses/upwork-clone-frontend',
      tech: ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Material-UI'],
      description:
        'Upwork clone frontend web application to replicate the core features of Upwork.',
    },
    {
      name: 'Weather Application',
      url: 'https://github.com/AhmedNassar7/Weather-Application',
      tech: ['React', 'HTML', 'CSS', 'Material-UI', 'OpenAPI'],
      description:
        'Real-time weather forecasting app with location-based services.',
    },
    {
      name: 'Software Engineering',
      url: 'https://github.com/AhmedNassar7/Software-Engineering',
      tech: [
        'MAANG',
        'Internships',
        'Open Source',
        'Hackathons',
        'Events',
        'Discord',
      ],
      description:
        'Community for software engineering opportunities worldwide.',
    },
    {
      name: 'Movie Hub',
      url: 'https://github.com/AhmedNassar7/Movie-Website',
      tech: ['React', 'JavaScript', 'HTML', 'CSS', 'API'],
      description: 'Website for discovering and browsing movies.',
    },
  ];

  const skills = {
    Languages: [
      { name: 'Python', icon: faPython },
      { name: 'Java', icon: faJava },
      { name: 'C++', icon: faCode },
      { name: 'C#', icon: faCode },
      { name: 'HTML', icon: faHtml5 },
      { name: 'CSS', icon: faCss3 },
      { name: 'JavaScript', icon: faJs },
      { name: 'SQL', icon: faDatabase },
    ],
    Frameworks: [
      { name: 'React', icon: faReact },
      { name: 'Django', icon: faPython },
      { name: '.NET', icon: faLayerGroup },
      { name: 'Node.JS', icon: faNodeJs },
      { name: 'Bootstrap', icon: faBootstrap },
      { name: 'SCSS', icon: faSass },
      { name: 'Redux', icon: faLayerGroup },
      { name: 'Firebase', icon: faFireAlt },
    ],
    Tools: [
      { name: 'Git', icon: faGit },
      { name: 'GitHub', icon: faGithub },
      { name: 'AWS', icon: faAws },
      { name: 'Docker', icon: faDocker },
      { name: 'Linux', icon: faLinux },
      { name: 'Kubernetes', icon: faCloud },
      { name: 'PostgreSQL', icon: faDatabase },
      { name: 'MySQL', icon: faDatabase },
    ],
    Concepts: [
      { name: 'Design Patterns', icon: faCogs },
      { name: 'Unit Testing', icon: faFlask },
      { name: 'System Design', icon: faNetworkWired },
      { name: 'Microservices', icon: faCubes },
      { name: 'APIs', icon: faCodeBranch },
      { name: 'Agile', icon: faLayerGroup },
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

  const handleResumeDownload = () => {
    // Track resume download event
    trackEvent({
      action: 'download_resume',
      category: 'Resume',
      label: 'Resume Download',
      value: 1,
    });

    // Open resume in a new tab
    // const newTab = window.open(RESUME_URL, '_blank');
    // if (!newTab) {
    //   console.error(
    //     'Failed to open a new tab. It might be blocked by the browser.',
    //   );
    // }

    // Trigger resume download
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
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackProjectClick(project.name)}
                      >
                        <FontAwesomeIcon icon={faGithub} />
                      </a>
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
                  <h4>{category.replace(/([A-Z])/g, ' $1').trim()}</h4>
                  <div className="skills-list">
                    {items.map((skill, index) => (
                      <span key={index} className="skill-item">
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
            <button onClick={handleResumeDownload} className="download-btn">
              Download Resume
            </button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Resume;
