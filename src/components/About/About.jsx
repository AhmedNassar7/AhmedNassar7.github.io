import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGraduationCap,
  faRocket,
  faLightbulb,
  faPhone,
  faEnvelope,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import './About.scss';

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 50,
    });
  }, []);

  const personalInfo = [
    {
      icon: faGraduationCap,
      text: 'Senior Computer Science Student',
    },
    {
      icon: faRocket,
      text: 'Passionate about Web Development',
    },
    {
      icon: faLightbulb,
      text: 'Contribute to Open-Source Projects',
    },
  ];

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

  return (
    <section id="about" className="about-section">
      <Container>
        <h2 className="section-title text-center mb-5" data-aos="fade-up">
          About Me
        </h2>
        <Row className="justify-content-center">
          <Col md={6} className="mb-4" data-aos="fade-right">
            <div className="about-card">
              <h3 className="column-title">Personal Information</h3>
              <ul className="list-unstyled">
                {personalInfo.map((item, index) => (
                  <li key={index} className="info-item">
                    <FontAwesomeIcon icon={item.icon} className="info-icon" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
          <Col md={6} className="mb-4" data-aos="fade-left">
            <div className="about-card">
              <h3 className="column-title">Contact Information</h3>
              <ul className="list-unstyled">
                {contactInfo.map((item, index) => (
                  <li key={index} className="info-item">
                    <FontAwesomeIcon icon={item.icon} className="info-icon" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
