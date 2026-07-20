import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import { motion, useInView, animate } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCodePullRequest,
  faCodeBranch,
  faCodeCommit,
  faStar,
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import './Stats.scss';

const GITHUB_USERNAME = 'AhmedNassar7';
const REPOS_TAB_URL = `https://github.com/${GITHUB_USERNAME}?tab=repositories`;
const REPOS_BY_STARS_URL = `${REPOS_TAB_URL}&sort=stargazers`;
const DJANGO_PRS_URL =
  'https://github.com/django/django/pulls?q=is%3Apr+author%3AAhmedNassar7';
const COMMITS_SEARCH_URL = `https://github.com/search?q=author%3A${GITHUB_USERNAME}&type=commits`;

// Repo/star counts as of Jul 2026 — used only if the live GitHub fetch fails.
const FALLBACK_GITHUB_STARS = 530;
const FALLBACK_PUBLIC_REPOS = 45;

// GitHub's commit-search API has a browser-CORS bug, so this can't be fetched
// live from the client. Rounded down from the real count; update manually
// when it drifts noticeably.
const TOTAL_COMMITS = 2000;

// Rounds a live count down to the nearest 5 so displayed numbers stay clean
// and consistent without ever overstating the real value.
const roundDownToFive = (n) => Math.floor(n / 5) * 5;

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
  const [publicRepos, setPublicRepos] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchGithubStats = async () => {
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
        if (!cancelled) {
          setGithubStars(roundDownToFive(totalStars));
          setPublicRepos(roundDownToFive(repos.length));
        }
      } catch (error) {
        console.error('Failed to fetch live GitHub stats:', error);
        if (!cancelled) {
          setGithubStars(FALLBACK_GITHUB_STARS);
          setPublicRepos(FALLBACK_PUBLIC_REPOS);
        }
      }
    };

    fetchGithubStats();
    return () => {
      cancelled = true;
    };
  }, []);

  const stats = [
    {
      icon: faStar,
      value: githubStars,
      suffix: '+',
      label: 'GitHub Stars',
      url: REPOS_BY_STARS_URL,
      ariaLabel: 'View repositories sorted by stars on GitHub',
    },
    {
      icon: faCodeBranch,
      value: publicRepos,
      suffix: '+',
      label: 'Public Repositories',
      url: REPOS_TAB_URL,
      ariaLabel: 'View all public repositories on GitHub',
    },
    {
      icon: faCodePullRequest,
      value: 20,
      suffix: '+',
      label: 'Open-Source PRs',
      url: DJANGO_PRS_URL,
      ariaLabel: "View Ahmed's pull requests to Django on GitHub",
    },
    {
      icon: faCodeCommit,
      value: TOTAL_COMMITS,
      suffix: '+',
      label: 'Commits',
      url: COMMITS_SEARCH_URL,
      ariaLabel: "View Ahmed's commits on GitHub",
    },
  ];

  return (
    <section id="stats" className="stats-section">
      <Container>
        <Row className="justify-content-center">
          {stats.map((stat, index) => {
            const CardTag = stat.url ? motion.a : motion.div;
            const linkProps = stat.url
              ? {
                  href: stat.url,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  'aria-label': stat.ariaLabel || stat.label,
                }
              : {};

            return (
              <Col key={index} xs={6} md={3} className="mb-4">
                <CardTag
                  className={`stat-card ${stat.url ? 'stat-card-link' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  {...linkProps}
                >
                  {stat.url && (
                    <FontAwesomeIcon
                      icon={faArrowUpRightFromSquare}
                      className="stat-link-icon"
                    />
                  )}
                  <FontAwesomeIcon icon={stat.icon} className="stat-icon" />
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <p className="stat-label">{stat.label}</p>
                </CardTag>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default Stats;
