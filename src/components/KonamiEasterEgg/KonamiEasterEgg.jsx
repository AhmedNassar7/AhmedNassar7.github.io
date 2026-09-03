import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { trackEvent } from '../../utils/analytics';
import './KonamiEasterEgg.scss';

// ↑ ↑ ↓ ↓ ← → ← → B A
const SEQUENCE = [
  'arrowup',
  'arrowup',
  'arrowdown',
  'arrowdown',
  'arrowleft',
  'arrowright',
  'arrowleft',
  'arrowright',
  'b',
  'a',
];

const COLORS = [
  '#646cff',
  '#535bf2',
  '#8ab4ff',
  '#a8b1ff',
  '#ffd166',
  '#ff4d6d',
  '#ffffff',
];
const PIECE_COUNT = 90;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const buildPieces = () =>
  Array.from({ length: PIECE_COUNT }, (_, i) => {
    const size = 6 + Math.random() * 8;
    return {
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.7,
      duration: 2.4 + Math.random() * 1.9,
      drift: (Math.random() - 0.5) * 180,
      rotate: (Math.random() - 0.5) * 900,
      color: COLORS[i % COLORS.length],
      width: size,
      height: Math.random() > 0.5 ? size : size * 0.45,
      round: Math.random() > 0.6,
    };
  });

// Type the Konami code anywhere on the page → a one-shot confetti fall and
// a small toast. Pure decoration: reduced-motion gets just the toast, and
// nothing here blocks or captures input.
const KonamiEasterEgg = () => {
  const [active, setActive] = useState(false);
  const [pieces, setPieces] = useState([]);
  const progress = useRef(0);
  const hideTimer = useRef(null);

  const fire = useCallback(() => {
    const reduced = prefersReducedMotion();
    setPieces(reduced ? [] : buildPieces());
    setActive(true);
    trackEvent('easter_egg', { id: 'konami_code' });

    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(
      () => {
        setActive(false);
        setPieces([]);
      },
      reduced ? 2600 : 4800,
    );
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      // Ignore keystrokes aimed at a text field.
      const tag = event.target?.tagName;
      if (
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        event.target?.isContentEditable
      ) {
        return;
      }
      const key = event.key.toLowerCase();
      if (key === SEQUENCE[progress.current]) {
        progress.current += 1;
        if (progress.current === SEQUENCE.length) {
          progress.current = 0;
          fire();
        }
      } else {
        // Allow a wrong key to be the start of a fresh attempt.
        progress.current = key === SEQUENCE[0] ? 1 : 0;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      clearTimeout(hideTimer.current);
    };
  }, [fire]);

  return (
    <AnimatePresence>
      {active && (
        <>
          <div className="konami-confetti" aria-hidden="true">
            {pieces.map((piece) => (
              <m.span
                key={piece.id}
                className={`konami-piece${
                  piece.round ? ' konami-piece--round' : ''
                }`}
                style={{
                  left: `${piece.left}%`,
                  width: piece.width,
                  height: piece.height,
                  background: piece.color,
                }}
                initial={{ y: '-12vh', opacity: 1, rotate: 0 }}
                animate={{
                  y: '114vh',
                  x: piece.drift,
                  rotate: piece.rotate,
                  opacity: [1, 1, 0.9, 0],
                }}
                transition={{
                  duration: piece.duration,
                  delay: piece.delay,
                  ease: 'easeIn',
                }}
              />
            ))}
          </div>

          <m.div
            className="konami-toast"
            role="status"
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          >
            <span className="konami-toast__emoji" aria-hidden="true">
              🎮
            </span>
            You found the Konami code!
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default KonamiEasterEgg;
