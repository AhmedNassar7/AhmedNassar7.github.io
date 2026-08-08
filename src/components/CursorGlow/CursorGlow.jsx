import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import './CursorGlow.scss';

let burstIdCounter = 0;

const SPARK_COUNT = 8;
// Brand indigo/violet family — same palette as the cursor glow itself and
// the rest of the site, so the click effect reads as "energy burst" rather
// than a literal, unrelated fire/orange accent.
const SPARK_COLORS = ['#646cff', '#535bf2', '#8ab4ff', '#a8b1ff'];

// A soft light that follows the cursor, plus a burst of small sparks that
// shoot outward and fade on every click. Only for visitors who can actually
// hover with a precise pointer — touch devices have no persistent cursor
// position, and this is pure decoration, so prefers-reduced-motion opts out
// entirely and never pays for the listeners.
const CursorGlow = ({ theme }) => {
  const glowRef = useRef(null);
  const rafRef = useRef(null);
  const [active, setActive] = useState(false);
  const [sparks, setSparks] = useState([]);

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
      const burstId = burstIdCounter++;
      // Evenly spaced angles (with a little jitter) instead of fully random
      // ones — a pure random spread tends to leave visible gaps or clumps
      // at only 8 particles, where an even spacing reads as a clean burst.
      const newSparks = Array.from({ length: SPARK_COUNT }, (_, i) => {
        const angle =
          (i / SPARK_COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const distance = 28 + Math.random() * 24;
        return {
          id: `${burstId}-${i}`,
          burstId,
          x: event.clientX,
          y: event.clientY,
          dx: Math.cos(angle) * distance,
          dy: Math.sin(angle) * distance,
          color: SPARK_COLORS[i % SPARK_COLORS.length],
        };
      });

      setSparks((prev) => [...prev, ...newSparks]);
      setTimeout(() => {
        setSparks((prev) => prev.filter((spark) => spark.burstId !== burstId));
      }, 650);
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
      <div className="cursor-spark-layer" aria-hidden="true">
        <AnimatePresence>
          {sparks.map((spark) => (
            <motion.span
              key={spark.id}
              className="cursor-spark"
              style={{
                left: spark.x,
                top: spark.y,
                '--spark-color': spark.color,
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: spark.dx, y: spark.dy, opacity: 0, scale: 0.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
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
