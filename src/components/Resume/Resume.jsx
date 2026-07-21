import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { trackEvent } from '../../utils/analytics';
import {
  faGithub,
  faDiscord,
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
  faAward,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';
import './Resume.scss';

const Resume = () => {
  const education = {
    school: 'Modern Academy in Maadi',
    degree: 'Bachelor of Computer Science',
    date: '2021 - 2025',
    location: 'Cairo, Egypt',
    url: 'https://mng.modern-academy.edu.eg/',
    cgpa: '3.8 / 4.0',
  };

  const experiences = [
    {
      company: 'Beshara Group',
      role: 'Java Developer',
      type: 'Full Time',
      date: 'Nov 2025 – Present',
      location: 'Cairo, Egypt',
      url: 'https://ebeshara.com/',
    },
    {
      company: 'Django Software Foundation',
      role: 'Open Source Contributor',
      type: 'Volunteer',
      date: 'Jan 2025 – Jan 2026',
      location: 'Remote',
      url: 'https://www.djangoproject.com',
    },
    {
      company: 'Mercor',
      role: 'Software Engineer',
      type: 'Contract',
      date: 'Oct 2025 – Dec 2025',
      location: 'Remote',
      url: 'https://www.mercor.com',
    },
    {
      company: 'Nile University',
      role: 'AI Researcher',
      type: 'Internship',
      date: 'Jul 2025 – Aug 2025',
      location: 'Cairo, Egypt',
      url: 'https://www.nu.edu.eg',
    },
    {
      company: 'Orange Digital Center',
      role: 'Software Engineer',
      type: 'Internship',
      date: 'Sep 2024 – Oct 2024',
      location: 'Cairo, Egypt',
      url: 'https://www.orangedigitalcenters.com/country/EG/home',
    },
    // {
    //   company: 'Information Technology Institute',
    //   role: 'Web Development using Python',
    //   type: 'Training',
    //   date: 'Jul 2024 – Sep 2024',
    //   location: 'Cairo, Egypt',
    //   url: 'https://iti.gov.eg/home',
    // },
    {
      company: 'Nokia',
      role: 'Software Engineer',
      type: 'Internship',
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
  ];

  const achievements = [
    {
      title: 'Individual Member, Django Software Foundation',
      secondaryUrl:
        'https://www.djangoproject.com/foundation/individual-members/',
      secondaryLabel: 'DSF Members Page',
      bullets: [
        'Recognized as an Individual Member of the Django Software Foundation for contributions to Django core.',
      ],
    },
    {
      title: 'Founder, Software Engineering Community',
      url: 'https://github.com/AhmedNassar7/Software-Engineering',
      secondaryUrl: 'https://discord.gg/N95QU2Ww3h',
      secondaryLabel: 'Discord',
      secondaryIcon: faDiscord,
      bullets: [
        'Central hub for software engineering opportunities worldwide — internships, open-source, mock interviews, and hackathons.',
        '500+ GitHub stars and 1,000+ Discord members supporting engineers globally.',
      ],
    },
    {
      title: 'Round 2 Qualifier, Meta Hacker Cup',
      secondaryUrl:
        'https://web.facebook.com/codingcompetitions/hacker-cup/2025/certificate/209508058776009',
      secondaryLabel: 'Certificate',
      bullets: [
        'Ranked in the top 5% in Round 1 and advanced to Round 2, finishing in the top 20% globally.',
      ],
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
      { name: 'Ajax', icon: faJs },
    ],
    Tools: [
      { name: 'Git', icon: faGit },
      { name: 'GitHub', icon: faGithub },
      { name: 'Docker', icon: faDocker },
      { name: 'Kubernetes', icon: faCloud },
      { name: 'AWS', icon: faAws },
      { name: 'Azure', icon: faMicrosoft },
      { name: 'Kafka', icon: faNetworkWired },
      { name: 'Linux', icon: faLinux },
      { name: 'Postman', icon: faServer },
      { name: 'Jira', icon: faCogs },
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

  const projectGridVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const projectItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
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
                Software Engineer specializing in backend development and
                open-source contributions. DSF Individual Member and Django core
                contributor with 10 merged pull requests. Experienced in
                building systems at global and national scale.
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
              <div className="experience-grid">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    className="experience-item"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    whileHover={{
                      y: -8,
                      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 22,
                      delay: index * 0.08,
                    }}
                  >
                    <h4>
                      <a
                        href={exp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {exp.company}
                      </a>
                    </h4>
                    <div className="role-row">
                      <motion.p
                        className="role"
                        whileHover={{ scale: 1.05, y: -2 }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 15,
                        }}
                      >
                        {exp.role}
                      </motion.p>
                      {exp.type && (
                        <motion.span
                          className="role-type"
                          initial={{ opacity: 0, scale: 0.7 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 15,
                            delay: index * 0.08 + 0.2,
                          }}
                          whileHover={{
                            scale: 1.1,
                            y: -2,
                            transition: {
                              type: 'spring',
                              stiffness: 400,
                              damping: 15,
                              delay: 0,
                            },
                          }}
                        >
                          {exp.type}
                        </motion.span>
                      )}
                    </div>
                    <div className="details">
                      <p>
                        <FontAwesomeIcon icon={faCalendar} /> {exp.date}
                      </p>
                      <p>
                        <FontAwesomeIcon icon={faLocationDot} /> {exp.location}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
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
                  <p>
                    <FontAwesomeIcon icon={faChartLine} /> CGPA:{' '}
                    {education.cgpa}
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
              <motion.div
                className="projects-grid"
                variants={projectGridVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    className="project-item"
                    variants={projectItemVariants}
                    whileHover={{
                      y: -8,
                      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  >
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
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col lg={12} data-aos="fade-up" data-aos-delay="150">
            <div className="resume-card">
              <h3>
                <FontAwesomeIcon icon={faAward} /> Achievements
              </h3>
              <div className="achievements-grid">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className="achievement-item"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    whileHover={{
                      y: -8,
                      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 22,
                      delay: index * 0.1,
                    }}
                  >
                    <div className="achievement-header">
                      <h4>{achievement.title}</h4>
                      {(achievement.url || achievement.secondaryUrl) && (
                        <div className="achievement-links">
                          {achievement.url && (
                            <a
                              href={achievement.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`View ${achievement.title} on GitHub`}
                            >
                              <FontAwesomeIcon icon={faGithub} />
                            </a>
                          )}
                          {achievement.secondaryUrl && (
                            <a
                              href={achievement.secondaryUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Open ${achievement.secondaryLabel} for ${achievement.title}`}
                            >
                              <FontAwesomeIcon
                                icon={
                                  achievement.secondaryIcon ||
                                  faArrowUpRightFromSquare
                                }
                              />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                    <ul className="achievement-bullets">
                      {achievement.bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex}>{bullet}</li>
                      ))}
                    </ul>
                  </motion.div>
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
              <motion.button
                onClick={handleResumeView}
                className="view-btn"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon icon={faEye} /> View Resume
              </motion.button>
              <motion.button
                onClick={handleResumeDownload}
                className="download-btn"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon icon={faDownload} /> Download Resume
              </motion.button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Resume;
