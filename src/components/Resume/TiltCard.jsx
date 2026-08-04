import { useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const TILT_DEGREES = 10;
const SPRING_CONFIG = { stiffness: 200, damping: 20, mass: 0.5 };
const DEFAULT_WHILE_HOVER = {
  y: -8,
  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
};
const DEFAULT_TRANSITION = { type: 'spring', stiffness: 300, damping: 22 };

/**
 * Drop-in replacement for a plain resume-card motion.div (project or
 * achievement items) that adds an Apple/Stripe-style mouse-tracked 3D tilt
 * (CSS perspective transform, no WebGL — there's no imagery to mount on a
 * 3D mockup, so depth comes from tilting the real card content instead).
 * Inert on touch devices and under prefers-reduced-motion. Every other
 * motion prop (variants, initial/whileInView/viewport, transition) passes
 * straight through so each caller keeps its own entrance animation.
 */
const TiltCard = ({
  children,
  className,
  whileHover = DEFAULT_WHILE_HOVER,
  transition = DEFAULT_TRANSITION,
  ...motionProps
}) => {
  const ref = useRef(null);
  const canTilt = useMediaQuery('(hover: hover) and (pointer: fine)');
  const prefersReducedMotion = useMediaQuery(
    '(prefers-reduced-motion: reduce)',
  );
  const tiltEnabled = canTilt && !prefersReducedMotion;

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const rotateX = useSpring(
    useTransform(pointerY, [0, 1], [TILT_DEGREES, -TILT_DEGREES]),
    SPRING_CONFIG,
  );
  const rotateY = useSpring(
    useTransform(pointerX, [0, 1], [-TILT_DEGREES, TILT_DEGREES]),
    SPRING_CONFIG,
  );

  const handleMouseMove = (event) => {
    if (!tiltEnabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width);
    pointerY.set((event.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      whileHover={whileHover}
      transition={transition}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        tiltEnabled
          ? { rotateX, rotateY, transformPerspective: 800 }
          : undefined
      }
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

TiltCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  whileHover: PropTypes.object,
  transition: PropTypes.object,
};

export default TiltCard;
