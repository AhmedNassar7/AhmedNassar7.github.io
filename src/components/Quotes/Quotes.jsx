import { useState, useEffect, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faQuoteLeft,
  faQuoteRight,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import './Quotes.scss';

const Quotes = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  const quotes = [
    {
      text: "Programming is not about typing, it's about thinking.",
      author: 'Bjarne Stroustrup',
    },
    { text: 'Make it work, make it right, make it fast.', author: 'Kent Beck' },
    {
      text: 'Simplicity is prerequisite for reliability.',
      author: 'Edsger W. Dijkstra',
    },
    {
      text: 'First, solve the problem. Then, write the code.',
      author: 'John Johnson',
    },
    {
      text: 'The biggest risk is not taking any risk.',
      author: 'Mark Zuckerberg',
    },
    { text: 'Experience is learning from mistakes.', author: 'Oscar Wilde' },
    {
      text: "The Web doesn't just connect machines, it connects people.",
      author: 'Tim Berners-Lee',
    },
    {
      text: 'Talk is cheap. Show me the code.',
      author: 'Linus Torvalds',
    },
    {
      text: 'Testing leads to failure, and failure leads to understanding.',
      author: 'Burt Rutan',
    },
    {
      text: "It's not a bug; it's an undocumented feature.",
      author: 'Anonymous',
    },
  ];

  const nextQuote = useCallback(() => {
    setCurrentQuote((prevQuote) => (prevQuote + 1) % quotes.length);
  }, [quotes.length]);

  const prevQuote = () => {
    setCurrentQuote(
      (prevQuote) => (prevQuote - 1 + quotes.length) % quotes.length,
    );
  };

  const selectQuote = (index) => {
    setCurrentQuote(index);
  };

  useEffect(() => {
    const interval = setInterval(nextQuote, 5000);
    return () => clearInterval(interval);
  }, [nextQuote]);

  return (
    <Container id="quotes" className="quotes-section">
      <h2 className="section-title text-center mb-5" data-aos="fade-up">
        Quotes
      </h2>
      <div className="quotes-container">
        <div className="quote-content">
          <FontAwesomeIcon icon={faQuoteLeft} className="quote-icon left" />
          <p className="quote-text">{quotes[currentQuote].text}</p>
          <FontAwesomeIcon icon={faQuoteRight} className="quote-icon right" />
          <p className="quote-author">{quotes[currentQuote].author}</p>
          <div className="quote-nav-btns">
            <button
              onClick={prevQuote}
              className="quote-nav-btn"
              aria-label="Previous quote"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              onClick={nextQuote}
              className="quote-nav-btn"
              aria-label="Next quote"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          <div className="quote-points">
            {quotes.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => selectQuote(index)}
                className={`quote-point ${index === currentQuote ? 'active' : ''}`}
                aria-label={`Go to quote ${index + 1}`}
                aria-current={index === currentQuote}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Quotes;
