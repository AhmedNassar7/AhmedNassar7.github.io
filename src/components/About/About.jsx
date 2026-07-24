import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faEnvelope,
  faLocationDot,
  faClock,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import './About.scss';
import {
  isWithinWorkingHours,
  getHourDifference,
  getTimezoneCityName,
} from '../../utils/timezone';
import { useVirtualPageView } from '../../hooks/useVirtualPageView';

const AHMED_TIMEZONE = 'Africa/Cairo';
const AHMED_WORKING_HOURS = { start: 9, end: 24 }; // 9 AM - 12 AM (midnight), Cairo time

const contactInfo = [
  {
    icon: faPhone,
    text: '+201110102554',
  },
  {
    icon: faEnvelope,
    text: 'a.moh.nassar00@gmail.com',
  },
  {
    icon: faLocationDot,
    text: 'Cairo, Egypt',
  },
];

const About = () => {
  const sectionRef = useVirtualPageView('About', '/#about');
  const [now, setNow] = useState(new Date());
  const [timeExpanded, setTimeExpanded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const ahmedTime = now.toLocaleTimeString('en-US', {
    timeZone: AHMED_TIMEZONE,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const withinWorkingHours = isWithinWorkingHours(
    now,
    AHMED_TIMEZONE,
    AHMED_WORKING_HOURS,
  );
  const ahmedCity = getTimezoneCityName(AHMED_TIMEZONE);
  const visitorTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const visitorCity = getTimezoneCityName(visitorTimeZone);
  const visitorTime = now.toLocaleTimeString('en-US', {
    timeZone: visitorTimeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const hourDiff = getHourDifference(now, AHMED_TIMEZONE, visitorTimeZone);
  const diffText =
    hourDiff === 0
      ? 'Same timezone'
      : hourDiff > 0
        ? `Ahmed is +${hourDiff} hrs ahead`
        : `Ahmed is ${Math.abs(hourDiff)} hrs behind`;
  const availabilityLabel = withinWorkingHours ? 'Available now' : 'Away';
  const availabilityDetail = withinWorkingHours
    ? 'Within working hours'
    : 'Outside working hours';

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <Container>
        <h2 className="section-title text-center mb-5" data-aos="fade-up">
          About Me
        </h2>
        <Row className="justify-content-center mb-4">
          <Col lg={9} className="text-center" data-aos="fade-up">
            <p className="about-bio">
              Software Engineer specializing in backend development and
              open-source contributions, building large-scale enterprise systems
              from national to global reach. DSF Individual Member and
              Much-Appreciated Contributor with 24 pull requests to Django core
              (10 merged). I also founded a Software Engineering community on
              GitHub and Discord helping engineers worldwide advance their
              careers.
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={6} className="mb-4" data-aos="fade-up">
            <div className="about-card">
              <h3 className="column-title">Contact Information</h3>
              <ul className="list-unstyled">
                {contactInfo.map((item, index) => (
                  <li key={index} className="info-item">
                    <FontAwesomeIcon icon={item.icon} className="info-icon" />
                    <span>{item.text}</span>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    className="info-item info-item-toggle"
                    onClick={() => setTimeExpanded((prev) => !prev)}
                    aria-expanded={timeExpanded}
                    aria-controls="local-time-detail"
                  >
                    <FontAwesomeIcon icon={faClock} className="info-icon" />
                    <span className="info-time-block">
                      <span className="info-time-primary">
                        {ahmedTime}
                        <span
                          className={`availability-pill ${withinWorkingHours ? 'online' : 'offline'}`}
                        >
                          <span
                            className="availability-dot"
                            aria-hidden="true"
                          />
                          {availabilityLabel}
                        </span>
                      </span>
                    </span>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`toggle-chevron ${timeExpanded ? 'expanded' : ''}`}
                    />
                  </button>
                  {timeExpanded && (
                    <div id="local-time-detail" className="local-time-detail">
                      <div className="tz-row">
                        <span className="tz-icon" aria-hidden="true">
                          🕐
                        </span>
                        <span className="tz-label">Ahmed ({ahmedCity})</span>
                        <span className="tz-value">{ahmedTime}</span>
                      </div>
                      <div className="tz-row">
                        <span className="tz-icon" aria-hidden="true">
                          🌐
                        </span>
                        <span className="tz-label">You ({visitorCity})</span>
                        <span className="tz-value">{visitorTime}</span>
                      </div>
                      <div className="tz-row">
                        <span className="tz-icon" aria-hidden="true">
                          ⏱
                        </span>
                        <span className="tz-label">Difference</span>
                        <span className="tz-value">{diffText}</span>
                      </div>
                      <div className="tz-row">
                        <span
                          className={`tz-status-dot ${withinWorkingHours ? 'online' : 'offline'}`}
                          aria-hidden="true"
                        />
                        <span className="tz-label">Availability</span>
                        <span
                          className={`tz-value availability-text ${withinWorkingHours ? 'online' : 'offline'}`}
                        >
                          {availabilityDetail}
                        </span>
                      </div>
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
