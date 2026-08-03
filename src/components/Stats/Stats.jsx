import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import { motion, useInView, animate } from 'framer-motion';
import { scroller } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCodePullRequest,
  faCodeBranch,
  faCodeCommit,
  faStar,
  faFire,
  faHandshake,
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import GitHubHeatmap from './GitHubHeatmap';
import { calculateStreaks } from '../../utils/streaks';
import { trackEvent } from '../../utils/analytics';
import { useVirtualPageView } from '../../hooks/useVirtualPageView';
import './Stats.scss';

const GITHUB_USERNAME = 'AhmedNassar7';
const PORTFOLIO_REPO = `${GITHUB_USERNAME}.github.io`;
const REPOS_TAB_URL = `https://github.com/${GITHUB_USERNAME}?tab=repositories`;
const REPOS_BY_STARS_URL = `${REPOS_TAB_URL}&sort=stargazers`;
const DJANGO_PRS_URL =
  'https://github.com/django/django/pulls?q=is%3Apr+author%3AAhmedNassar7';
const COMMITS_SEARCH_URL = `https://github.com/search?q=author%3A${GITHUB_USERNAME}&type=commits`;
const PORTFOLIO_REPO_URL = `https://github.com/${GITHUB_USERNAME}/${PORTFOLIO_REPO}`;
const CONTRIBUTIONS_API_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;
const COMMUNITY_DISCORD_URL = 'https://discord.gg/N95QU2Ww3h';

// Repo/star counts as of Jul 2026 — used only if the live GitHub fetch fails.
const FALLBACK_GITHUB_STARS = 530;
const FALLBACK_PUBLIC_REPOS = 45;

// GitHub's commit-search API has a browser-CORS bug, so this can't be fetched
// live from the client. Rounded down from the real count; update manually
// when it drifts noticeably.
const TOTAL_COMMITS = 2400;

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

const Stats = ({ theme }) => {
  const sectionRef = useVirtualPageView('GitHub Stats', '/#stats');
  const [githubStars, setGithubStars] = useState(null);
  const [publicRepos, setPublicRepos] = useState(null);
  const [currentStreak, setCurrentStreak] = useState(null);
  const [repoStars, setRepoStars] = useState(null);

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

    // Streaks change daily, unlike stars/repos which move slowly, so there's
    // no sane hardcoded fallback here — leave it as "—" (null) if the fetch
    // fails rather than show a number that goes stale within a day.
    const fetchStreaks = async () => {
      try {
        const res = await fetch(CONTRIBUTIONS_API_URL);
        if (!res.ok) throw new Error('Contributions API request failed');
        const data = await res.json();
        const { current } = calculateStreaks(data.contributions);
        if (!cancelled) setCurrentStreak(current);
      } catch (error) {
        console.error('Failed to fetch contribution streaks:', error);
      }
    };

    const fetchPortfolioRepoStars = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${PORTFOLIO_REPO}`,
        );
        if (!res.ok) throw new Error('Portfolio repo request failed');
        const data = await res.json();
        if (!cancelled) {
          setRepoStars(data.stargazers_count);
        }
      } catch (error) {
        console.error('Failed to fetch portfolio repo stars:', error);
      }
    };

    fetchGithubStats();
    fetchStreaks();
    fetchPortfolioRepoStars();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleCollaborateClick = () => {
    scroller.scrollTo('contact', { offset: -70 });
    window.history.replaceState(null, '', '#contact');
    trackEvent('cta_click', { cta_id: 'collaborate' });
  };

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
      // Verified via GitHub's search API against django/django as of Aug
      // 2026 (24 total, 10 merged) — update manually when it drifts.
      icon: faCodePullRequest,
      value: 24,
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

  const streakLine =
    currentStreak !== null && currentStreak > 0 ? (
      <>
        <FontAwesomeIcon icon={faFire} /> {currentStreak}-day streak
      </>
    ) : null;

  return (
    <section id="stats" className="stats-section" ref={sectionRef}>
      <Container>
        <h2 className="section-title text-center mb-5" data-aos="fade-up">
          Stats
        </h2>
        <div className="stats-grid">
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
              <CardTag
                key={index}
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
                {stat.subtitle && (
                  <p className="stat-subtitle">{stat.subtitle}</p>
                )}
              </CardTag>
            );
          })}
        </div>
        <Row className="justify-content-center">
          <Col xs={12} className="text-center github-star-block">
            <div className="cta-cluster">
              <motion.a
                href={PORTFOLIO_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="github-star-cta"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => trackEvent('cta_click', { cta_id: 'star_repo' })}
              >
                <FontAwesomeIcon icon={faStar} />
                Star Portfolio on GitHub
                {repoStars !== null && (
                  <span className="star-count">{repoStars}</span>
                )}
              </motion.a>
              <motion.a
                href={COMMUNITY_DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-secondary"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.96 }}
                aria-label="Join Ahmed's Software Engineering community on Discord"
                onClick={() =>
                  trackEvent('cta_click', { cta_id: 'join_community' })
                }
              >
                <FontAwesomeIcon icon={faDiscord} />
                Join SWE Community
              </motion.a>
              <motion.button
                type="button"
                className="cta-secondary"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleCollaborateClick}
              >
                <FontAwesomeIcon icon={faHandshake} />
                Let&apos;s Collaborate
              </motion.button>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} lg={10}>
            <h3 className="heatmap-title">Contribution Activity</h3>
            {streakLine && <p className="streak-line">{streakLine}</p>}
            <GitHubHeatmap theme={theme} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

Stats.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default Stats;
