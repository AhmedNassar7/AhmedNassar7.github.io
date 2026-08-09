import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import './ConfettiBurst.scss';

const PIECE_COUNT = 60;
const COLORS = ['#646cff', '#535bf2', '#8ab4ff', '#a8b1ff', '#ffd166'];

const buildPieces = (seed) =>
  Array.from({ length: PIECE_COUNT }, (_, i) => {
    // Launch outward and upward from the button like a firework, then
    // gravity pulls each piece back down as it fades — not a uniform
    // circle of confetti, which would read as static rather than a burst.
    const angle = (Math.random() - 0.5) * Math.PI * 1.4 - Math.PI / 2;
    const distance = 90 + Math.random() * 160;
    return {
      id: `${seed}-${i}`,
      color: COLORS[i % COLORS.length],
      dx: Math.cos(angle) * distance,
      dy: Math.sin(angle) * distance,
      fall: 80 + Math.random() * 100,
      rotate: (Math.random() - 0.5) * 720,
      size: 5 + Math.random() * 5,
      delay: Math.random() * 0.15,
      duration: 1 + Math.random() * 0.6,
    };
  });

// A one-shot confetti/firework burst fired from a fixed point (the submit
// button) — reserved for an actual success moment (a delivered message),
// not decoration for every click, so it still feels like a reward when it
// happens. Reuses the same "small colored pieces flying outward and
// fading" language as the cursor's click spark, just bigger and with
// gravity, for a proper celebratory burst rather than a subtle tick.
const ConfettiBurst = ({ triggerKey, originX, originY }) => {
  const pieces = useMemo(
    () => (triggerKey ? buildPieces(triggerKey) : []),
    [triggerKey],
  );

  return (
    <div className="confetti-layer" aria-hidden="true">
      <AnimatePresence>
        {pieces.map((piece) => (
          <motion.span
            key={piece.id}
            className="confetti-piece"
            style={{
              left: originX,
              top: originY,
              width: piece.size,
              height: piece.size * 0.4,
              background: piece.color,
            }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            animate={{
              x: piece.dx,
              y: piece.dy + piece.fall,
              opacity: 0,
              rotate: piece.rotate,
            }}
            transition={{
              duration: piece.duration,
              delay: piece.delay,
              ease: 'easeOut',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

ConfettiBurst.propTypes = {
  // Any truthy value that changes on each successful submit — re-triggers
  // the burst since a fresh set of pieces only mounts when this changes.
  triggerKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  originX: PropTypes.number.isRequired,
  originY: PropTypes.number.isRequired,
};

export default ConfettiBurst;
