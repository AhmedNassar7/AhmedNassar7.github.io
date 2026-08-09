import PropTypes from 'prop-types';

const COLORS = ['#646cff', '#535bf2', '#8ab4ff', '#a8b1ff'];

// Renders `text` with each letter cycling through the brand color palette —
// a cheap way to draw the eye to one key word in a heading without needing
// a whole new design element.
const GradientText = ({ text }) => (
  <span className="gradient-text">
    {text.split('').map((char, index) => (
      <span
        key={index}
        style={
          char === ' ' ? undefined : { color: COLORS[index % COLORS.length] }
        }
      >
        {char}
      </span>
    ))}
  </span>
);

GradientText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default GradientText;
