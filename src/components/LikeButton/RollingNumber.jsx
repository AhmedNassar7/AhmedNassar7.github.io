import { memo } from 'react';
import PropTypes from 'prop-types';
import './RollingNumber.scss';

// Just the formatted like total. During the intro count-up the number
// itself changes many times a second, which reads as a counter rolling
// upward — no extra per-change transition (an earlier one re-triggered
// every frame and left the digits flickering half-faded while counting).
const RollingNumber = ({ value }) => {
  const text =
    value === null
      ? '—'
      : Math.max(0, Math.round(value)).toLocaleString('en-US');

  return (
    <span className="rolling-number" aria-hidden="true">
      {text}
    </span>
  );
};

RollingNumber.propTypes = {
  value: PropTypes.number,
};

export default memo(RollingNumber);
