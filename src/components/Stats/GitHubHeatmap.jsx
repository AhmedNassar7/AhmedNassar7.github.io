import { GitHubCalendar } from 'react-github-calendar';
import PropTypes from 'prop-types';
import 'react-github-calendar/tooltips.css';

const GITHUB_USERNAME = 'AhmedNassar7';

const GitHubHeatmap = ({ theme }) => {
  return (
    <div className="github-heatmap">
      <GitHubCalendar
        username={GITHUB_USERNAME}
        colorScheme={theme === 'dark' ? 'dark' : 'light'}
        // Level 0 is the "no activity" neutral (matches the card surface);
        // levels 1-4 are a validated single-hue ordinal ramp (see
        // dataviz skill: node scripts/validate_palette.js --ordinal) so
        // low-activity days stay visually distinct from empty ones.
        theme={{
          light: ['#ebedf0', '#a7b0f7', '#8089f5', '#646cff', '#3f3fb0'],
          dark: ['#242433', '#4b4f8f', '#6066c2', '#7076e0', '#9aa0ff'],
        }}
        blockSize={11}
        blockMargin={4}
        fontSize={13}
        showWeekdayLabels
      />
    </div>
  );
};

GitHubHeatmap.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default GitHubHeatmap;
