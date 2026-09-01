import { useMemo } from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { projects, techIcons } from '../../data/resumeData';
import { useVirtualPageView } from '../../hooks/useVirtualPageView';
import { trackEvent } from '../../utils/analytics';
import { slugify } from '../../utils/slugify';
import { getInitials } from '../../utils/initials';
import TiltCard from '../Resume/TiltCard';
import './Projects.scss';

// Drop an icon at src/assets/images/projects/<slug>.<ext> (slug = name with
// non-alphanumerics as "_", e.g. egypt_metro_backend.png) and it's matched
// to its project by filename — no code change. App-icon style is fine; it's
// shown as a small rounded tile next to the name.
const projectImages = import.meta.glob(
  '../../assets/images/projects/*.{png,jpg,jpeg,webp,svg}',
  { eager: true, query: '?url', import: 'default' },
);
const imageBySlug = Object.fromEntries(
  Object.entries(projectImages).map(([path, url]) => [
    path
      .split('/')
      .pop()
      .replace(/\.[^.]+$/, ''),
    url,
  ]),
);

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Projects = () => {
  const sectionRef = useVirtualPageView('Projects', '/#projects');

  // Featured first, otherwise data order (Array.sort is stable).
  const ordered = useMemo(
    () =>
      [...projects].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)),
    [],
  );

  const trackClick = (name, linkType) =>
    trackEvent('select_content', {
      content_type: 'project',
      content_id: `${slugify(name)}_${linkType}`,
    });

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <Container>
        <h2 className="section-title text-center mb-5" data-aos="fade-up">
          Projects
        </h2>

        <motion.div
          className="projects-grid"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {ordered.map((project) => {
            const logo =
              project.image ?? imageBySlug[slugify(project.name)] ?? null;

            return (
              <TiltCard
                key={project.name}
                className={`project-card${
                  project.featured ? ' is-featured' : ''
                }`}
                variants={itemVariants}
              >
                <div className="project-card__head">
                  {logo ? (
                    <img
                      className="project-card__logo"
                      src={logo}
                      alt=""
                      aria-hidden="true"
                      width="46"
                      height="46"
                      loading="lazy"
                    />
                  ) : (
                    <span
                      className="project-card__logo project-card__logo--fallback"
                      aria-hidden="true"
                    >
                      {getInitials(project.name)}
                    </span>
                  )}

                  <h3 className="project-card__name">{project.name}</h3>

                  <div className="project-card__links">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.name} live demo`}
                        onClick={() => trackClick(project.name, 'demo')}
                      >
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                      </a>
                    )}
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.name} source on GitHub`}
                      onClick={() => trackClick(project.name, 'repo')}
                    >
                      <FontAwesomeIcon icon={faGithub} />
                    </a>
                  </div>
                </div>

                <p className="project-card__description">
                  {project.description}
                </p>

                <div className="project-card__tech">
                  {project.tech.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {techIcons[tech] && (
                        <FontAwesomeIcon icon={techIcons[tech]} />
                      )}
                      {tech}
                    </span>
                  ))}
                </div>
              </TiltCard>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
};

export default Projects;
