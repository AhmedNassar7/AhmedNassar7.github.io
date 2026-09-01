import { useEffect, useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenNib, faSpinner } from '@fortawesome/free-solid-svg-icons';
import {
  addGuestbookEntry,
  isFirebaseReady,
  subscribeToGuestbook,
} from '../../firebase';
import { useVirtualPageView } from '../../hooks/useVirtualPageView';
import { trackEvent } from '../../utils/analytics';
import { getInitials } from '../../utils/initials';
import './Guestbook.scss';

const NAME_MAX = 40;
const MESSAGE_MAX = 280;
const COOLDOWN_MS = 60_000;
const STORAGE_KEY = 'guestbook:lastPost';

const readLastPost = () => {
  try {
    return Number(localStorage.getItem(STORAGE_KEY)) || 0;
  } catch {
    return 0;
  }
};

const relativeTime = (ts) => {
  const diff = Date.now() - ts;
  if (diff < 45_000) return 'just now';
  const mins = Math.round(diff / 60_000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(ts).toLocaleDateString(undefined, {
    month: 'short',
    year: 'numeric',
  });
};

const Guestbook = () => {
  const sectionRef = useVirtualPageView('Guestbook', '/#guestbook');
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [error, setError] = useState('');
  const lastPostRef = useRef(readLastPost());

  useEffect(() => {
    if (!isFirebaseReady) return undefined;
    return subscribeToGuestbook(setEntries);
  }, []);

  if (!isFirebaseReady) return null;

  const trimmedName = name.trim();
  const trimmedMessage = message.trim();
  const cooling = Date.now() - lastPostRef.current < COOLDOWN_MS;
  const canSubmit =
    trimmedName && trimmedMessage && status !== 'sending' && !cooling;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (website) return; // bot filled the hidden field — silently drop
    if (!trimmedName || !trimmedMessage) {
      setError('Add your name and a message first.');
      return;
    }
    if (cooling) {
      setError('You just signed — give it a minute before posting again.');
      return;
    }

    setStatus('sending');
    try {
      const saved = await addGuestbookEntry({
        name: trimmedName,
        message: trimmedMessage,
      });
      // No optimistic insert — RTDB updates its local cache and fires the
      // subscription with the new entry right away, so it appears on its
      // own without risking a duplicate.
      setName('');
      setMessage('');
      setStatus('done');
      lastPostRef.current = saved.ts;
      try {
        localStorage.setItem(STORAGE_KEY, String(saved.ts));
      } catch {
        // storage disabled — cooldown just won't persist across reloads
      }
      trackEvent('sign_guestbook', { message_length: saved.message.length });
    } catch (submitError) {
      setStatus('error');
      setError(
        submitError?.message || 'Could not save that — please try again.',
      );
    }
  };

  return (
    <section id="guestbook" className="guestbook-section" ref={sectionRef}>
      <Container>
        <h2 className="section-title text-center" data-aos="fade-up">
          Guestbook
        </h2>
        <p className="guestbook-intro text-center" data-aos="fade-up">
          Passing through? Leave a note — it shows up below for everyone.
          {entries.length > 0 && (
            <span className="guestbook-count-badge">
              {entries.length} {entries.length === 1 ? 'note' : 'notes'}
            </span>
          )}
        </p>

        <form
          className="guestbook-form"
          onSubmit={handleSubmit}
          data-aos="fade-up"
        >
          <input
            type="text"
            className="guestbook-input"
            placeholder="Your name"
            value={name}
            maxLength={NAME_MAX}
            onChange={(e) => setName(e.target.value)}
            aria-label="Your name"
          />
          <textarea
            className="guestbook-input guestbook-textarea"
            placeholder="Say something nice…"
            value={message}
            maxLength={MESSAGE_MAX}
            rows={3}
            onChange={(e) => setMessage(e.target.value)}
            aria-label="Your message"
          />
          {/* Honeypot — hidden from people, catnip for bots */}
          <input
            type="text"
            className="guestbook-hp"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            aria-hidden="true"
          />

          <div className="guestbook-form__foot">
            <span className="guestbook-count">
              {trimmedMessage.length}/{MESSAGE_MAX}
            </span>
            <button
              type="submit"
              className="guestbook-submit"
              disabled={!canSubmit}
            >
              {status === 'sending' ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                <FontAwesomeIcon icon={faPenNib} />
              )}
              Sign
            </button>
          </div>

          {error && <p className="guestbook-error">{error}</p>}
          {status === 'done' && !error && (
            <p className="guestbook-ok">Signed — thanks for stopping by.</p>
          )}
        </form>

        <ul className="guestbook-list" aria-live="polite">
          <AnimatePresence initial={false}>
            {entries.map((entry) => (
              <motion.li
                key={entry.id}
                className="guestbook-entry"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <span className="guestbook-entry__avatar" aria-hidden="true">
                  {getInitials(entry.name || '?')}
                </span>
                <div className="guestbook-entry__body">
                  <p className="guestbook-entry__meta">
                    <span className="guestbook-entry__name">{entry.name}</span>
                    <span className="guestbook-entry__time">
                      {relativeTime(entry.ts)}
                    </span>
                  </p>
                  <p className="guestbook-entry__message">{entry.message}</p>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
          {entries.length === 0 && (
            <li className="guestbook-empty">
              No notes yet — be the first to sign.
            </li>
          )}
        </ul>
      </Container>
    </section>
  );
};

export default Guestbook;
