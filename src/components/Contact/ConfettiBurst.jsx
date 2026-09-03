import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, m } from 'framer-motion';
import './ConfettiBurst.scss';

const SHELL_COUNT = 3;
const PIECES_PER_SHELL = 45;
const COLORS = [
  '#646cff',
  '#535bf2',
  '#8ab4ff',
  '#a8b1ff',
  '#ffd166',
  '#ffffff',
];

// Three separate "shells" bursting in sequence (like real fireworks
// launched moments apart) instead of one single explosion — this is what
// actually makes it read as fireworks rather than a bigger version of the
// cursor's click spark.
const buildShells = (seed, originX, originY) =>
  Array.from({ length: SHELL_COUNT }, (_, shellIndex) => {
    // Each shell launches from a slightly different spot near the button
    // and a bit higher up, rather than all three stacked on the exact
    // same point.
    const shellX = originX + (Math.random() - 0.5) * 140;
    const shellY = originY - 40 - Math.random() * 90;
    const shellDelay = shellIndex * 0.28;
    const isSpark = shellIndex % 2 === 1; // alternate shapes between shells

    const pieces = Array.from({ length: PIECES_PER_SHELL }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 70 + Math.random() * 150;
      return {
        id: `${seed}-${shellIndex}-${i}`,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        isSpark,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
        fall: 60 + Math.random() * 90,
        rotate: (Math.random() - 0.5) * 720,
        size: isSpark ? 4 + Math.random() * 3 : 5 + Math.random() * 6,
        delay: shellDelay + Math.random() * 0.1,
        duration: 0.9 + Math.random() * 0.7,
      };
    });

    return { x: shellX, y: shellY, pieces };
  });

// A one-shot firework display fired near the submit button — reserved for
// an actual success moment (a delivered message), not decoration for every
// click, so it still feels like a reward when it happens.
const ConfettiBurst = ({ triggerKey, originX, originY }) => {
  const shells = useMemo(
    () => (triggerKey ? buildShells(triggerKey, originX, originY) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [triggerKey],
  );

  return (
    <div className="confetti-layer" aria-hidden="true">
      <AnimatePresence>
        {shells.flatMap((shell) =>
          shell.pieces.map((piece) => (
            <m.span
              key={piece.id}
              className={
                piece.isSpark
                  ? 'confetti-piece confetti-piece--spark'
                  : 'confetti-piece'
              }
              style={{
                left: shell.x,
                top: shell.y,
                width: piece.size,
                height: piece.isSpark ? piece.size : piece.size * 0.4,
                background: piece.color,
                boxShadow: piece.isSpark ? `0 0 6px ${piece.color}` : 'none',
              }}
              initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.4 }}
              animate={{
                x: piece.dx,
                y: piece.dy + piece.fall,
                opacity: 0,
                rotate: piece.rotate,
                scale: 1,
              }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: 'easeOut',
              }}
            />
          )),
        )}
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
