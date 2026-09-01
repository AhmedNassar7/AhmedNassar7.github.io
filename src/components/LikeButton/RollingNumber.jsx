import { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import './RollingNumber.scss';

// The like total. On every change the new figure slides up into place
// behind a clipped window — enough motion to feel live without the
// per-digit odometer that was prone to font-dependent misalignment.
// Reduced motion (or animate=false) just swaps the text.
const RollingNumber = ({ value, animate }) => {
  const text =
    value === null
      ? '—'
      : Math.max(0, Math.round(value)).toLocaleString('en-US');

  if (!animate || value === null) {
    return (
      <span className="rolling-number" aria-hidden="true">
        {text}
      </span>
    );
  }

  return (
    <span className="rolling-number" aria-hidden="true">
      <motion.span
        key={text}
        className="rolling-number__value"
        initial={{ y: '0.55em', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.26, ease: 'easeOut' }}
      >
        {text}
      </motion.span>
    </span>
  );
};

RollingNumber.propTypes = {
  value: PropTypes.number,
  animate: PropTypes.bool,
};

export default memo(RollingNumber);
