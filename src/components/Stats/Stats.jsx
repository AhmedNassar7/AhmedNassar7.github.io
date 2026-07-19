import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import { motion, useInView, animate } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faCodePullRequest,
  faUsers,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import './Stats.scss';

const GITHUB_USERNAME = 'AhmedNassar7';

// Repo star counts as of Jul 2026 — used only if the live GitHub fetch fails.
const FALLBACK_GITHUB_STARS = 533;

const EXPERIENCE_START = new Date('2023-08-01');

const getYearsOfExperience = () => {
  const now = new Date();
  let years = now.getFullYear() - EXPERIENCE_START.getFullYear();
  const beforeAnniversary =
    now.getMonth() < EXPERIENCE_START.getMonth() ||
    (now.getMonth() === EXPERIENCE_START.getMonth() &&
      now.getDate() < EXPERIENCE_START.getDate());
  if (beforeAnniversary) years -= 1;
  return Math.max(years, 1);
};

const AnimatedCounter = ({ value, suffix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView || value === null) return undefined;

    const controls = animate(0, value, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={ref} className="stat-number">
      {value === null ? '—' : `${display.toLocaleString()}${suffix}`}
    </span>
  );
};

AnimatedCounter.propTypes = {
  value: PropTypes.number,
  suffix: PropTypes.string,
};

const Stats = () => {
  const [githubStars, setGithubStars] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchGithubStars = async () => {
      try {
        const reposRes = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`,
        );
        if (!reposRes.ok) throw new Error('GitHub API request failed');
        const repos = await reposRes.json();
        const totalStars = repos.reduce(
          (sum, repo) => sum + (repo.stargazers_count || 0),
          0,
        );
        if (!cancelled) setGithubStars(totalStars);
      } catch (error) {
        console.error('Failed to fetch live GitHub stats:', error);
        if (!cancelled) setGithubStars(FALLBACK_GITHUB_STARS);
      }
    };

    fetchGithubStars();
    return () => {
      cancelled = true;
    };
  }, []);

  const stats = [
    {
      icon: faBriefcase,
      value: getYearsOfExperience(),
      suffix: '+',
      label: 'Years of Experience',
    },
    {
      icon: faStar,
      value: githubStars,
      suffix: '+',
      label: 'GitHub Stars',
    },
    {
      icon: faCodePullRequest,
      value: 20,
      suffix: '+',
      label: 'Open-Source PRs',
    },
    {
      icon: faUsers,
      value: 1000,
      suffix: '+',
      label: 'Community Members',
    },
  ];

  return (
    <section id="stats" className="stats-section">
      <Container>
        <Row className="justify-content-center">
          {stats.map((stat, index) => (
            <Col key={index} xs={6} md={3} className="mb-4">
              <motion.div
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FontAwesomeIcon icon={stat.icon} className="stat-icon" />
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="stat-label">{stat.label}</p>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Stats;
