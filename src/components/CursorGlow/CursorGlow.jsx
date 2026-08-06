import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import './CursorGlow.scss';

let rippleId = 0;

// A soft light that follows the cursor, plus an expanding ring on every
// click. Only for visitors who can actually hover with a precise pointer —
// touch devices have no persistent cursor position, and this is pure
// decoration, so prefers-reduced-motion opts out entirely and never pays
// for the listeners.
const CursorGlow = ({ theme }) => {
  const glowRef = useRef(null);
  const rafRef = useRef(null);
  const [active, setActive] = useState(false);
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const supportsFinePointer = window.matchMedia(
      '(hover: hover) and (pointer: fine)',
    ).matches;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (!supportsFinePointer || prefersReducedMotion) return undefined;

    setActive(true);

    const handleMove = (event) => {
      // Coalesce to one DOM write per frame instead of one per mousemove —
      // mousemove can fire far faster than the display refreshes.
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        if (!glowRef.current) return;
        glowRef.current.style.setProperty('--glow-x', `${event.clientX}px`);
        glowRef.current.style.setProperty('--glow-y', `${event.clientY}px`);
      });
    };

    const handleClick = (event) => {
      const id = rippleId++;
      setRipples((prev) => [
        ...prev,
        { id, x: event.clientX, y: event.clientY },
      ]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
      }, 700);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('click', handleClick);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!active) return null;

  return (
    <>
      <div
        ref={glowRef}
        className={`cursor-glow-blob cursor-glow-blob--${theme}`}
        aria-hidden="true"
      />
      <div className="cursor-ripple-layer" aria-hidden="true">
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              className="cursor-ripple"
              style={{ left: ripple.x, top: ripple.y }}
              initial={{ opacity: 0.6, scale: 0.3 }}
              animate={{ opacity: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

CursorGlow.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default CursorGlow;
