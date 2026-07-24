import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import { scroller } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faUser,
  faFileLines,
  faChartLine,
  faComments,
  faEnvelope,
  faMoon,
  faSun,
  faDownload,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { trackEvent } from '../../utils/analytics';
import { downloadResume } from '../../utils/resume';
import './CommandPalette.scss';

// Bootstrap's global `scroll-behavior: smooth` (from bootstrap/scss/root)
// already animates any window.scrollTo call, and it fights react-scroll's
// own JS-driven (smooth/duration) animation, stalling it. Omitting
// smooth/duration here lets the CSS behavior do the animating instead.
const goTo = (section) => {
  scroller.scrollTo(section, { offset: -70 });
  window.history.replaceState(null, '', `#${section}`);
};

const CommandPalette = ({ theme, toggleTheme }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const triggerRef = useRef(null);

  const commands = useMemo(
    () => [
      {
        id: 'home',
        label: 'Go to Home',
        icon: faHouse,
        run: () => goTo('home'),
      },
      {
        id: 'about',
        label: 'Go to About',
        icon: faUser,
        run: () => goTo('about'),
      },
      {
        id: 'resume',
        label: 'Go to Resume',
        icon: faFileLines,
        run: () => goTo('resume'),
      },
      {
        id: 'stats',
        label: 'Go to GitHub Stats',
        icon: faChartLine,
        run: () => goTo('stats'),
      },
      {
        id: 'testimonials',
        label: 'Go to Testimonials',
        icon: faComments,
        run: () => goTo('testimonials'),
      },
      {
        id: 'contact',
        label: 'Go to Contact',
        icon: faEnvelope,
        run: () => goTo('contact'),
      },
      {
        id: 'theme',
        label:
          theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme',
        icon: theme === 'dark' ? faSun : faMoon,
        run: toggleTheme,
      },
      {
        id: 'download-resume',
        label: 'Download Resume (PDF)',
        icon: faDownload,
        run: downloadResume,
      },
      {
        id: 'github',
        label: 'Open GitHub Profile',
        icon: faGithub,
        run: () =>
          window.open(
            'https://github.com/AhmedNassar7',
            '_blank',
            'noopener,noreferrer',
          ),
      },
      {
        id: 'linkedin',
        label: 'Open LinkedIn Profile',
        icon: faLinkedin,
        run: () =>
          window.open(
            'https://www.linkedin.com/in/nasssar/',
            '_blank',
            'noopener,noreferrer',
          ),
      },
      {
        id: 'email',
        label: 'Email Ahmed',
        icon: faEnvelope,
        run: () => {
          trackEvent('generate_lead', { lead_source: 'email_link' });
          window.location.href = 'mailto:a.moh.nassar00@gmail.com';
        },
      },
    ],
    [theme, toggleTheme],
  );

  const results = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter((cmd) => cmd.label.toLowerCase().includes(q));
  }, [commands, query]);

  const closePalette = useCallback(() => {
    setOpen(false);
    setQuery('');
    setActiveIndex(0);
    triggerRef.current?.focus?.();
  }, []);

  const openPalette = useCallback(() => {
    triggerRef.current = document.activeElement;
    setOpen(true);
    trackEvent('open_command_palette');
  }, []);

  const runCommand = useCallback(
    (cmd) => {
      trackEvent('run_command', { command_id: cmd.id });
      cmd.run();
      closePalette();
    },
    [closePalette],
  );

  // Global shortcut: Cmd/Ctrl+K opens, Escape closes.
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isShortcut =
        (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
      if (isShortcut) {
        e.preventDefault();
        setOpen((prev) => {
          if (prev) return prev;
          triggerRef.current = document.activeElement;
          return true;
        });
      } else if (e.key === 'Escape' && open) {
        closePalette();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, closePalette]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleInputKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % Math.max(results.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(
        (prev) =>
          (prev - 1 + Math.max(results.length, 1)) %
          Math.max(results.length, 1),
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[activeIndex]) {
        runCommand(results[activeIndex]);
      }
    }
  };

  return (
    <>
      <button
        type="button"
        className="command-palette-trigger"
        onClick={openPalette}
        aria-label="Open command palette (Ctrl+K)"
      >
        <span className="key">Ctrl</span>
        <span className="key">K</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="command-palette-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePalette}
          >
            <motion.div
              className="command-palette"
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 340, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <input
                ref={inputRef}
                type="text"
                className="command-palette-input"
                placeholder="Type a command or search…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                aria-label="Search commands"
                aria-activedescendant={
                  results[activeIndex]
                    ? `cmd-${results[activeIndex].id}`
                    : undefined
                }
                role="combobox"
                aria-expanded="true"
                aria-controls="command-palette-list"
              />
              <ul
                className="command-palette-list"
                id="command-palette-list"
                role="listbox"
              >
                {results.length === 0 && (
                  <li className="command-palette-empty">
                    No matching commands
                  </li>
                )}
                {results.map((cmd, index) => (
                  // Keyboard activation is handled by the owning <input>'s
                  // onKeyDown (arrow keys move activeIndex, Enter runs it) via
                  // the standard aria-activedescendant combobox pattern, so
                  // this option itself only needs a mouse handler.
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                  <li
                    key={cmd.id}
                    id={`cmd-${cmd.id}`}
                    role="option"
                    aria-selected={index === activeIndex}
                    className={`command-palette-item ${index === activeIndex ? 'active' : ''}`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => runCommand(cmd)}
                  >
                    <FontAwesomeIcon icon={cmd.icon} className="command-icon" />
                    {cmd.label}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

CommandPalette.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default CommandPalette;
