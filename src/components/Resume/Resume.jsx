import { Container, Row, Col } from 'react-bootstrap';
import { m } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { trackEvent } from '../../utils/analytics';
import { useVirtualPageView } from '../../hooks/useVirtualPageView';
import { slugify } from '../../utils/slugify';
import {
  RESUME_URL,
  RESUME_VIEW_URL,
  RESUME_FILE_NAME,
  downloadResume,
} from '../../utils/resume';
import {
  education,
  experiences,
  interviewedCompanies,
  achievements,
  skills,
} from '../../data/resumeData';
import {
  faGraduationCap,
  faCalendar,
  faLocationDot,
  faBriefcase,
  faBuilding,
  faDownload,
  faEye,
  faArrowUpRightFromSquare,
  faAward,
  faChartLine,
  faCode,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import TiltCard from './TiltCard';
import OrgLogo from './OrgLogo';
import InterviewMarquee from './InterviewMarquee';
import './Resume.scss';

const Resume = () => {
  const sectionRef = useVirtualPageView('Resume', '/#resume');

  const handleResumeView = () => {
    trackEvent('select_content', {
      content_type: 'resume',
      content_id: 'resume_view',
    });

    window.open(RESUME_VIEW_URL, '_blank');
  };

  const handleResumeDownload = () => {
    // Matches GA4's own "file_download" recommended-event schema so this
    // reads correctly in the standard reports. Enhanced Measurement's
    // automatic file-download detection must stay OFF for this data stream
    // (Admin > Data Streams > Enhanced measurement) or the same click gets
    // counted twice under the same event name.
    trackEvent('file_download', {
      file_name: RESUME_FILE_NAME,
      file_extension: 'pdf',
      link_url: RESUME_URL,
      link_text: 'Download Resume',
    });

    downloadResume();
  };

  return (
    <section id="resume" className="resume-section" ref={sectionRef}>
      <Container>
        <h2 className="section-title text-center mb-5" data-aos="fade-up">
          Resume
        </h2>

        <Row className="mb-5">
          <Col lg={12} data-aos="fade-up">
            <div className="resume-card">
              <h3>
                <FontAwesomeIcon icon={faBriefcase} /> Experience
              </h3>
              <div className="experience-grid">
                {experiences.map((exp, index) => (
                  <m.div
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
                    <div className="entity-header">
                      <OrgLogo name={exp.company} />
                      <h4>
                        <a
                          href={exp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {exp.company}
                        </a>
                      </h4>
                    </div>
                    <div className="role-row">
                      <m.p
                        className="role"
                        whileHover={{ scale: 1.05, y: -2 }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 15,
                        }}
                      >
                        {exp.role}
                      </m.p>
                      {exp.type && (
                        <m.span
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
                        </m.span>
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
                  </m.div>
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
                <div className="entity-header">
                  <OrgLogo name={education.school} />
                  <h4>
                    <a
                      href={education.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {education.school}
                    </a>
                  </h4>
                </div>
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
          <Col lg={12} data-aos="fade-up">
            <div className="resume-card">
              <h3>
                <FontAwesomeIcon icon={faBuilding} /> Interview Experience
              </h3>
              <p className="interview-divider">Recruited and interviewed by</p>
              <InterviewMarquee companies={interviewedCompanies} />
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
                  <TiltCard
                    key={index}
                    className="achievement-item"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
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
                              onClick={() =>
                                trackEvent('select_content', {
                                  content_type: 'achievement_link',
                                  content_id: `${slugify(achievement.title)}_primary`,
                                })
                              }
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
                              onClick={() =>
                                trackEvent('select_content', {
                                  content_type: 'achievement_link',
                                  content_id: `${slugify(achievement.title)}_secondary`,
                                })
                              }
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
                  </TiltCard>
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
              <m.button
                onClick={handleResumeView}
                className="view-btn"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon icon={faEye} /> View Resume
              </m.button>
              <m.button
                onClick={handleResumeDownload}
                className="download-btn"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon icon={faDownload} /> Download Resume
              </m.button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Resume;
