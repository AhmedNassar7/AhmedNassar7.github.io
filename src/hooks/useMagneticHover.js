import { useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import { useMediaQuery } from './useMediaQuery';

const SPRING_CONFIG = { stiffness: 150, damping: 15, mass: 0.1 };

/**
 * Makes an element gently pull toward the cursor while hovered, springing
 * back to its resting position on mouseleave. Inert on touch devices and
 * under prefers-reduced-motion, matching TiltCard's gating.
 *
 * @param {number} strength - Fraction of the cursor's offset from center
 *   the element actually moves (0.4 = moves 40% of the way toward it).
 * @returns {{ ref, style, onMouseMove, onMouseLeave }} Spread directly onto
 *   a `motion.*` element.
 */
export const useMagneticHover = (strength = 0.4) => {
  const ref = useRef(null);
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');
  const prefersReducedMotion = useMediaQuery(
    '(prefers-reduced-motion: reduce)',
  );
  const enabled = canHover && !prefersReducedMotion;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING_CONFIG);
  const springY = useSpring(y, SPRING_CONFIG);

  const onMouseMove = (event) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    ref,
    style: enabled ? { x: springX, y: springY } : undefined,
    onMouseMove,
    onMouseLeave,
  };
};
