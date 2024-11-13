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
    {
      text: 'Good code is easy for humans to understand.',
      author: 'Martin Fowler',
    },
    { text: 'Experience is learning from mistakes.', author: 'Oscar Wilde' },
    {
      text: 'Your most unhappy customers are your greatest source of learning.',
      author: 'Bill Gates',
    },
    {
      text: 'The best way to learn a language is by writing code in it.',
      author: 'Dennis Ritchie',
    },
    {
      text: 'The Web does not just connect machines, it connects people.',
      author: 'Tim Berners-Lee',
    },
    {
      text: "It's fine to celebrate success, but it is more important to heed the lessons of failure.",
      author: 'Bill Gates',
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
    const interval = setInterval(nextQuote, 3500);
    return () => clearInterval(interval);
  }, [nextQuote]);

  return (
    <Container className="quotes-section">
      <div className="quotes-container">
        <div className="quote-content">
          <FontAwesomeIcon icon={faQuoteLeft} className="quote-icon left" />
          <p className="quote-text">{quotes[currentQuote].text}</p>
          <FontAwesomeIcon icon={faQuoteRight} className="quote-icon right" />
          <p className="quote-author">{quotes[currentQuote].author}</p>
          <div className="quote-nav-btns">
            <button onClick={prevQuote} className="quote-nav-btn">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button onClick={nextQuote} className="quote-nav-btn">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          <div className="quote-points">
            {quotes.map((_, index) => (
              <span
                key={index}
                onClick={() => selectQuote(index)}
                className={`quote-point ${index === currentQuote ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Quotes;
