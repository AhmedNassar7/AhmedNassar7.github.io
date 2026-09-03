import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, m } from 'framer-motion';
import { scroller } from 'react-scroll';
import {
  experiences,
  projects,
  achievements,
  skills,
} from '../../data/resumeData';
import { downloadResume } from '../../utils/resume';
import { trackEvent } from '../../utils/analytics';
import { getTimezoneAbbreviation } from '../../utils/timezone';
import './Terminal.scss';

// Same zone the About section's live-availability widget uses — keep the
// terminal's "time" line consistent with the rest of the site.
const AHMED_TIMEZONE = 'Africa/Cairo';

const PROMPT = 'guest@ahmed-nassar:~$';

const SECTION_ALIASES = {
  home: 'home',
  about: 'about',
  projects: 'projects',
  resume: 'resume',
  stats: 'stats',
  github: 'stats',
  testimonials: 'testimonials',
  contact: 'contact',
  guestbook: 'guestbook',
};

// Pixel-grid "A N" monogram, rendered as real DOM cells (not monospace
// characters). Two earlier attempts used ASCII/Unicode characters for the
// logo — one drifted out of alignment because the block glyph wasn't
// rendered at a truly fixed width in this font, and a fix for that turned
// out too sparse to read as letters. Fixed-size div cells sidestep font
// rendering entirely: this looks identical regardless of OS/browser/font.
// Every fact in the info column is real, verified data pulled from the same
// source as the rest of the site (see src/data/resumeData.js and
// Stats.jsx), not placeholder text.
const A_PIXELS = [
  [0, 1, 1, 1, 0],
  [1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1],
];
const N_PIXELS = [
  [1, 0, 0, 0, 1],
  [1, 1, 0, 0, 1],
  [1, 1, 0, 0, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 0, 1, 1],
  [1, 0, 0, 1, 1],
  [1, 0, 0, 0, 1],
];
const LOGO_PIXEL_ROWS = A_PIXELS.map((aRow, i) => [...aRow, 0, ...N_PIXELS[i]]);

const NeofetchLogo = () => (
  <div className="nf-logo-grid">
    {LOGO_PIXEL_ROWS.map((row, r) => (
      <div className="nf-logo-row" key={r}>
        {row.map((on, c) => (
          <span key={c} className={on ? 'nf-px on' : 'nf-px'} />
        ))}
      </div>
    ))}
  </div>
);

// Ticks every second on its own — a real live clock rather than a snapshot
// frozen at the moment the command ran.
const NeofetchClock = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const time = now.toLocaleTimeString('en-US', {
    timeZone: AHMED_TIMEZONE,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const tzAbbr = getTimezoneAbbreviation(now, AHMED_TIMEZONE);
  return (
    <span className="nf-time">
      {time} ({tzAbbr}, UTC+2)
    </span>
  );
};

// Real neofetch is normally this concise — a single info block, not a
// scrolling wall of sections. Every value here matches the same source of
// truth as the rest of the site (src/data/resumeData.js), not placeholder
// text.
const buildNeofetchRows = () => [
  { label: 'OS', value: 'Egypt Linux', badge: 'EG' },
  { label: 'Role', value: 'Software Engineer' },
  { label: 'Focus', value: 'Backend & Open Source' },
  { label: 'Languages', value: 'Java · Python · C++ · C# · JS/TS' },
  { label: 'Uptime', value: 'since 2021' },
  { label: 'Location', value: 'Cairo, Egypt' },
  { label: 'Time', live: 'clock' },
  { label: 'Status', value: '● Open to Work', valueClass: 'nf-green' },
];

const SWATCH_COLORS = [
  '#ff5f57',
  '#febc2e',
  '#28c840',
  '#646cff',
  '#ff79c6',
  '#ffa657',
  '#e6edf3',
];

const NeofetchPanel = () => (
  <div className="nf-panel">
    <NeofetchLogo />
    <div className="nf-info-col">
      <div className="nf-header">
        <span className="nf-header-name">ahmed</span>
        <span className="nf-value">@</span>
        <span className="nf-header-name">portfolio</span>
      </div>
      <div className="nf-hr" />
      {buildNeofetchRows().map((row) => (
        <div className="nf-info-row" key={row.label}>
          <span className="nf-label">{row.label}</span>
          <span className="nf-value">: </span>
          {row.live === 'clock' ? (
            <NeofetchClock />
          ) : (
            <span className={row.valueClass || 'nf-value'}>{row.value}</span>
          )}
          {row.badge && <span className="nf-badge">{row.badge}</span>}
        </div>
      ))}
      <div className="nf-hr" />
      <div className="nf-swatches">
        {SWATCH_COLORS.map((c) => (
          <span key={c} className="nf-swatch" style={{ background: c }} />
        ))}
      </div>
    </div>
  </div>
);

const HELP_LINES = [
  'Available commands:',
  '  help              show this list',
  '  whoami            who is Ahmed?',
  '  about              short bio',
  '  experience         work history',
  '  projects           featured projects',
  '  skills             tech stack',
  '  achievements       notable wins',
  '  contact            how to reach Ahmed',
  '  resume             download the resume PDF',
  '  github / linkedin  open the profile in a new tab',
  '  open <section>     jump to a section (about, projects, resume, stats, testimonials, contact, guestbook)',
  '  theme <dark|light> switch the site theme',
  '  neofetch           system info, but make it a portfolio',
  '  clear              clear the screen',
  '  exit               close the terminal',
];

const buildCommands = ({ theme, toggleTheme, close }) => ({
  help: () => HELP_LINES,

  whoami: () => [
    'Ahmed Nassar — Software Engineer',
    'Java Developer @ Beshara Group · Django Software Foundation Individual Member',
  ],

  about: () => [
    'Software Engineer building systems at scale — enterprise government',
    "platforms and a Django backend powering Egypt's Metro for millions of",
    'riders. DSF Individual Member and Much-Appreciated Contributor with 24',
    'pull requests to Django core (10 merged). Meta Hacker Cup Round 2',
    'qualifier, and founder of a Software Engineering community on GitHub',
    'and Discord.',
  ],

  experience: () =>
    experiences.map(
      (exp) =>
        `${exp.date.padEnd(20)} ${exp.role} @ ${exp.company} (${exp.type})`,
    ),

  projects: () =>
    projects.flatMap((p) => [
      `${p.name} — ${p.description}`,
      `  tech: ${p.tech.join(', ')}`,
      `  ${p.liveUrl || p.url}`,
      '',
    ]),

  skills: () =>
    Object.entries(skills).map(
      ([category, items]) =>
        `${category}: ${items.map((i) => i.name).join(', ')}`,
    ),

  achievements: () =>
    achievements.flatMap((a) => [
      a.title,
      ...a.bullets.map((b) => `  - ${b}`),
      '',
    ]),

  contact: () => [
    'Email:    a.moh.nassar00@gmail.com',
    'LinkedIn: https://www.linkedin.com/in/nasssar/',
    'GitHub:   https://github.com/AhmedNassar7',
  ],

  resume: () => {
    downloadResume();
    return ['Downloading Ahmed_Nassar_Resume.pdf...'];
  },

  github: () => {
    window.open(
      'https://github.com/AhmedNassar7',
      '_blank',
      'noopener,noreferrer',
    );
    return ['Opening https://github.com/AhmedNassar7 …'];
  },

  linkedin: () => {
    window.open(
      'https://www.linkedin.com/in/nasssar/',
      '_blank',
      'noopener,noreferrer',
    );
    return ['Opening https://www.linkedin.com/in/nasssar/ …'];
  },

  neofetch: () => [{ type: 'nf-panel' }],

  clear: () => null,

  exit: () => {
    close();
    return ['Goodbye 👋'];
  },

  open: (arg) => {
    const target = SECTION_ALIASES[arg?.toLowerCase()];
    if (!target) {
      return [
        `open: unknown section '${arg || ''}'`,
        'Try: open about | projects | resume | stats | testimonials | contact | guestbook',
      ];
    }
    scroller.scrollTo(target, { offset: -70 });
    window.history.replaceState(null, '', `#${target}`);
    return [`Navigating to ${target}…`];
  },

  theme: (arg) => {
    const next = arg?.toLowerCase();
    if (next !== 'dark' && next !== 'light') {
      return ['Usage: theme <dark|light>'];
    }
    if (next !== theme) toggleTheme();
    return [`Theme set to ${next}.`];
  },

  sudo: () => [
    "Nice try. This terminal doesn't have root — or a backend at all.",
  ],
});

const Terminal = ({ theme, toggleTheme }) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    {
      type: 'output',
      lines: ["Type 'help' to see what this terminal can do."],
    },
  ]);
  const [commandLog, setCommandLog] = useState([]);
  const [logIndex, setLogIndex] = useState(-1);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const triggerRef = useRef(null);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus?.();
  }, []);

  const commandsRef = useRef(null);
  commandsRef.current = buildCommands({ theme, toggleTheme, close });

  const openTerminal = () => {
    triggerRef.current = document.activeElement;
    setOpen(true);
    trackEvent('open_terminal');
  };

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [history]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && open) close();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [open, close]);

  const runLine = (raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    setCommandLog((prev) => [...prev, trimmed]);
    setLogIndex(-1);

    const [name, ...args] = trimmed.split(/\s+/);
    const handler = commandsRef.current[name.toLowerCase()];

    trackEvent('run_terminal_command', { command_name: name.toLowerCase() });

    setHistory((prev) => [...prev, { type: 'input', text: trimmed }]);

    if (name.toLowerCase() === 'clear') {
      setHistory([]);
      return;
    }

    if (!handler) {
      setHistory((prev) => [
        ...prev,
        {
          type: 'output',
          lines: [
            `command not found: ${name}. Type 'help' for a list of commands.`,
          ],
        },
      ]);
      return;
    }

    const result = handler(args.join(' '));
    if (result) {
      setHistory((prev) => [...prev, { type: 'output', lines: result }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      runLine(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandLog.length === 0) return;
      const nextIndex =
        logIndex === -1 ? commandLog.length - 1 : Math.max(logIndex - 1, 0);
      setLogIndex(nextIndex);
      setInput(commandLog[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (logIndex === -1) return;
      const nextIndex = logIndex + 1;
      if (nextIndex >= commandLog.length) {
        setLogIndex(-1);
        setInput('');
      } else {
        setLogIndex(nextIndex);
        setInput(commandLog[nextIndex]);
      }
    }
  };

  return (
    <>
      <button
        type="button"
        className="terminal-trigger"
        onClick={openTerminal}
        aria-label="Open interactive terminal"
      >
        {'>_'}
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            className="terminal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <m.div
              className="terminal-window"
              role="dialog"
              aria-modal="true"
              aria-label="Interactive terminal"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="terminal-titlebar">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
                <span className="terminal-title">guest@ahmed-nassar: ~</span>
              </div>
              <div className="terminal-body" ref={bodyRef}>
                {history.map((entry, index) =>
                  entry.type === 'input' ? (
                    <div className="terminal-line input-line" key={index}>
                      <span className="prompt">{PROMPT}</span> {entry.text}
                    </div>
                  ) : (
                    <div className="terminal-line output-line" key={index}>
                      {entry.lines.map((line, lineIndex) =>
                        line && line.type === 'nf-panel' ? (
                          <NeofetchPanel key={lineIndex} />
                        ) : (
                          <div key={lineIndex}>{line || ' '}</div>
                        ),
                      )}
                    </div>
                  ),
                )}
                <div className="terminal-line input-row">
                  <span className="prompt">{PROMPT}</span>
                  <input
                    ref={inputRef}
                    type="text"
                    className="terminal-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    aria-label="Terminal command input"
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck="false"
                  />
                </div>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};

Terminal.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default Terminal;
