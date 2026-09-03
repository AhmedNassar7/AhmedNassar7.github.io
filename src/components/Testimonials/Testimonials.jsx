import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { m, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faQuoteLeft,
  faChevronLeft,
  faChevronRight,
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import mahmoudSakrPhoto from '../../assets/images/testimonials/mahmoud-sakr.jpg';
import mahmoudSakrPhotoWebp from '../../assets/images/testimonials/mahmoud-sakr.webp';
import hassanELDashPhoto from '../../assets/images/testimonials/hassan-eldash.jpg';
import hassanELDashPhotoWebp from '../../assets/images/testimonials/hassan-eldash.webp';
import mennaIbrahimPhoto from '../../assets/images/testimonials/menna-ibrahim.jpg';
import mennaIbrahimPhotoWebp from '../../assets/images/testimonials/menna-ibrahim.webp';
import mahmoudShalabyPhoto from '../../assets/images/testimonials/mahmoud-shalaby.jpg';
import mahmoudShalabyPhotoWebp from '../../assets/images/testimonials/mahmoud-shalaby.webp';
import './Testimonials.scss';
import { trackEvent } from '../../utils/analytics';
import { useVirtualPageView } from '../../hooks/useVirtualPageView';
import { getInitials } from '../../utils/initials';

const LINKEDIN_RECOMMENDATIONS_URL =
  'https://www.linkedin.com/in/nasssar/details/recommendations/';

const testimonials = [
  {
    name: 'Mahmoud Sakr',
    role: 'Senior Backend Developer @ Al Jabr Holding',
    relationship: "Ahmed's Instructor (Python Track) at ITI",
    quote:
      'He is a highly talented developer with a deep understanding of building scalable, secure, and efficient backend systems.',
    photo: mahmoudSakrPhoto,
    photoWebp: mahmoudSakrPhotoWebp,
  },
  {
    name: 'Hassan ELDash',
    role: 'Software Architect & Instructor @ ITI',
    relationship: "Ahmed's Instructor (React Track) at ITI",
    quote:
      "Ahmed has shown remarkable growth and expertise in the React development track. He excels in creating responsive, efficient web applications, showcasing strong skills in React, Redux, and modern web development practices. With his creativity and problem-solving mindset, I'm confident Ahmed will be a valuable asset to any team. Highly recommended!",
    photo: hassanELDashPhoto,
    photoWebp: hassanELDashPhotoWebp,
  },
  {
    name: 'Menna Ibrahim',
    role: '.NET Developer @ Gemini Media',
    relationship: "Ahmed's Instructor (Web Fundamentals Track) at ITI",
    quote:
      'I had the pleasure of training Ahmed at the ITI Winter Training. He is a smart and ambitious engineer who is always eager to learn and strengthen his fundamentals. Ahmed is a fast learner, continuously seeking to improve himself and expand his skill set. He would be a valuable addition to any team.',
    photo: mennaIbrahimPhoto,
    photoWebp: mennaIbrahimPhotoWebp,
  },
  {
    name: 'Mahmoud Shalaby',
    role: 'Design & Optimize Subject Matter Expert @ Nokia',
    relationship: "Ahmed's Mentor at Nokia",
    quote:
      'Ahmed showed a very good example of commitment and dedication during the internship sessions and final presentation. Also, he is a very good team player.',
    photo: mahmoudShalabyPhoto,
    photoWebp: mahmoudShalabyPhotoWebp,
  },
];

const TestimonialAvatar = ({ photo, photoWebp, name }) => {
  const [imgFailed, setImgFailed] = useState(false);

  if (photo && !imgFailed) {
    return (
      <picture>
        {photoWebp && <source srcSet={photoWebp} type="image/webp" />}
        <img
          src={photo}
          alt={name}
          className="testimonial-avatar-photo"
          width="400"
          height="400"
          onError={() => setImgFailed(true)}
        />
      </picture>
    );
  }

  return <div className="testimonial-avatar">{getInitials(name)}</div>;
};

TestimonialAvatar.propTypes = {
  photo: PropTypes.string,
  photoWebp: PropTypes.string,
  name: PropTypes.string.isRequired,
};

const Testimonials = () => {
  const sectionRef = useVirtualPageView('Testimonials', '/#testimonials');
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = () => {
    setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(next, 12000);
    return () => clearInterval(interval);
  }, [next]);

  const testimonial = testimonials[current];

  return (
    <section
      id="testimonials"
      className="testimonials-section"
      ref={sectionRef}
    >
      <Container>
        <h2 className="section-title text-center mb-5" data-aos="fade-up">
          Testimonials
        </h2>

        <div className="testimonials-container">
          <FontAwesomeIcon icon={faQuoteLeft} className="quote-icon" />

          <AnimatePresence mode="wait">
            <m.div
              key={current}
              className="testimonial-content"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <p className="testimonial-quote">{testimonial.quote}</p>
              <div className="testimonial-person">
                <TestimonialAvatar
                  photo={testimonial.photo}
                  photoWebp={testimonial.photoWebp}
                  name={testimonial.name}
                />
                <div className="testimonial-meta">
                  <div className="testimonial-name">{testimonial.name}</div>
                  <div className="testimonial-role">{testimonial.role}</div>
                  <div className="testimonial-relationship">
                    {testimonial.relationship}
                  </div>
                </div>
              </div>
            </m.div>
          </AnimatePresence>

          <div className="testimonial-nav-btns">
            <button
              onClick={prev}
              className="testimonial-nav-btn"
              aria-label="Previous testimonial"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              onClick={next}
              className="testimonial-nav-btn"
              aria-label="Next testimonial"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>

          <div className="testimonial-points">
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrent(index)}
                className={`testimonial-point ${index === current ? 'active' : ''}`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === current}
              />
            ))}
          </div>
        </div>

        <div className="testimonials-footer">
          <m.a
            href={LINKEDIN_RECOMMENDATIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-cta"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
            onClick={() =>
              trackEvent('cta_click', { cta_id: 'view_recommendations' })
            }
          >
            <FontAwesomeIcon icon={faLinkedin} />
            See all recommendations on LinkedIn
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className="external-icon"
            />
          </m.a>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
