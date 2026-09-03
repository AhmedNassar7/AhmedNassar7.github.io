import { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, m, animate as tween } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { addLikes, isFirebaseReady, subscribeToLikes } from '../../firebase';
import { trackEvent } from '../../utils/analytics';
import RollingNumber from './RollingNumber';
import './LikeButton.scss';

// No per-visitor limit — it's just a friendly number, so anyone can keep
// tapping. The only ceiling is per *write*: a burst is batched and sent in
// chunks of at most this many, staying under the Realtime Database rule
// that rejects any single write moving the total by more than 50 (the
// server-side backstop against a scripted client inflating it in bulk).
const MAX_PER_FLUSH = 45;

// Rapid clicks are accumulated and sent as one transaction this long after
// the last tap, so a burst of taps is one write, not one per tap.
const FLUSH_DELAY_MS = 900;

const STORAGE_KEY = 'likes:contributed';
const VISITOR_KEY = 'likes:visitorId';

const readContributed = () => {
  try {
    const raw = Number(localStorage.getItem(STORAGE_KEY));
    return Number.isFinite(raw) && raw > 0 ? raw : 0;
  } catch {
    return 0;
  }
};

// A stable, random, non-identifying id kept in localStorage so the
// `like_site` analytics event can tell a returning liker apart from a new
// one without any account or personal data. Not sent anywhere except GA4,
// and a visitor clearing site data simply becomes "new" again.
const readVisitorId = () => {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id =
        (typeof crypto !== 'undefined' && crypto.randomUUID?.()) ||
        `v-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    // Storage disabled — the like still sends, just without a stable id.
    return null;
  }
};

const writeContributed = (value) => {
  try {
    localStorage.setItem(STORAGE_KEY, String(value));
  } catch {
    // Private-mode / disabled storage — "you liked N times" just won't
    // persist across reloads, which is an acceptable degradation.
  }
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let heartId = 0;

const LikeButton = ({ scrolled = false }) => {
  // The live/animated total, excluding this visitor's not-yet-saved taps.
  // null until the first value streams in from the server.
  const [displayBase, setDisplayBase] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [buffered, setBuffered] = useState(0);
  const [contributed, setContributed] = useState(readContributed);
  const [hearts, setHearts] = useState([]);
  const [pop, setPop] = useState(0);

  const bufferedRef = useRef(0);
  const contributedRef = useRef(contributed);
  const flushTimer = useRef(null);
  const revealStarted = useRef(false);
  const reduceMotion = useRef(prefersReducedMotion());
  // Set once at mount so a like is attributed to a first-time vs returning
  // liker based on state from *before* this visit, not after it.
  const visitorIdRef = useRef(readVisitorId());
  const wasReturningLikerRef = useRef(contributed > 0);
  // Last total seen from the server.
  const serverRef = useRef(null);
  // True while a write is in flight; its likes are held in inFlightRef and
  // shown optimistically, and server echoes are ignored until it resolves
  // so displayBase can't leap ahead of the reconciliation.
  const flushingRef = useRef(false);
  const inFlightRef = useRef(0);

  // Live subscription to the shared total. The first value triggers a
  // one-time count-up from 0 (the same reveal the Stats counters use, so it
  // reads as part of the same site); every later value just updates in place
  // as other people like in real time.
  useEffect(() => {
    if (!isFirebaseReady) return undefined;

    let controls;
    const unsubscribe = subscribeToLikes((total) => {
      setLoaded(true);
      serverRef.current = total;

      // Mid-write, runTransaction echoes the optimistic new value here
      // before the promise resolves — skip it so the displayed number is
      // driven solely by the reconciliation in flush().
      if (flushingRef.current) return;

      if (revealStarted.current) {
        setDisplayBase(total);
        return;
      }
      revealStarted.current = true;

      if (reduceMotion.current) {
        setDisplayBase(total);
        return;
      }

      controls = tween(0, total, {
        duration: 1.2,
        ease: 'easeOut',
        onUpdate: (v) => setDisplayBase(Math.round(v)),
      });
    });

    return () => {
      if (controls) controls.stop();
      unsubscribe();
    };
  }, []);

  const flush = useCallback(async () => {
    if (flushingRef.current) return;
    const amount = Math.min(bufferedRef.current, MAX_PER_FLUSH);
    if (amount <= 0 || !isFirebaseReady) return;

    // Hand this chunk to the in-flight slot in the same tick we take it out
    // of the buffer, so displayValue (base + buffered + inFlight) stays put.
    flushingRef.current = true;
    inFlightRef.current = amount;
    bufferedRef.current -= amount;
    setBuffered(bufferedRef.current);

    try {
      const committedTotal = await addLikes(amount);
      inFlightRef.current = 0;
      flushingRef.current = false;
      // Trust the server's post-commit total; it already includes the likes
      // we were showing optimistically, and they leave inFlight in the same
      // render — so the number settles without a double-count or a bounce.
      setDisplayBase(
        typeof committedTotal === 'number'
          ? committedTotal
          : (serverRef.current ?? 0),
      );
      trackEvent('like_site', {
        amount,
        visitor_total: contributedRef.current,
        // Anonymous attribution — see readVisitorId(). Lets GA4 answer
        // "who's liking" (new vs returning, from where) without any account.
        visitor_id: visitorIdRef.current ?? undefined,
        is_returning_liker: wasReturningLikerRef.current,
        referrer: (document.referrer || '').slice(0, 100) || undefined,
        page_path: `${window.location.pathname}${window.location.hash}`.slice(
          0,
          100,
        ),
      });
      // More taps queued (either buffered while in flight, or the remainder
      // of a burst bigger than one chunk) — send the next one.
      if (bufferedRef.current > 0) {
        clearTimeout(flushTimer.current);
        flushTimer.current = setTimeout(flush, FLUSH_DELAY_MS);
      }
    } catch {
      // Write failed — return this chunk to the buffer and retry shortly.
      bufferedRef.current += inFlightRef.current;
      inFlightRef.current = 0;
      flushingRef.current = false;
      setBuffered(bufferedRef.current);
      clearTimeout(flushTimer.current);
      flushTimer.current = setTimeout(flush, FLUSH_DELAY_MS * 3);
    }
  }, []);

  // Never drop buffered likes when the tab goes away mid-batch.
  useEffect(() => {
    const flushNow = () => {
      if (bufferedRef.current > 0) flush();
    };
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') flushNow();
    };
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', flushNow);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', flushNow);
      clearTimeout(flushTimer.current);
      flushNow();
    };
  }, [flush]);

  const handleLike = () => {
    if (!isFirebaseReady) return;

    bufferedRef.current += 1;
    setBuffered(bufferedRef.current);

    const nextContributed = contributedRef.current + 1;
    contributedRef.current = nextContributed;
    setContributed(nextContributed);
    writeContributed(nextContributed);

    setPop((p) => p + 1);

    if (!reduceMotion.current) {
      const id = heartId++;
      setHearts((prev) => [
        ...prev,
        {
          id,
          x: (Math.random() - 0.5) * 34,
          rotate: (Math.random() - 0.5) * 40,
        },
      ]);
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, 900);
      if (navigator.vibrate) navigator.vibrate(10);
    }

    clearTimeout(flushTimer.current);
    flushTimer.current = setTimeout(flush, FLUSH_DELAY_MS);
  };

  if (!isFirebaseReady) return null;

  // The visitor's own taps — still buffered, or handed to an in-flight
  // write — are added on top of the live base so a tap always moves the
  // number instantly and never bounces when the write lands.
  const displayValue = (displayBase ?? 0) + buffered + inFlightRef.current;

  const hasLiked = contributed > 0;
  const label = hasLiked
    ? `You've liked this site ${contributed} time${
        contributed === 1 ? '' : 's'
      }. Tap to add another.`
    : 'Like this site';

  return (
    <div className={`like-dock${scrolled ? ' is-docked' : ''}`}>
      <div className="like-dock__hearts" aria-hidden="true">
        <AnimatePresence>
          {hearts.map((heart) => (
            <m.span
              key={heart.id}
              className="like-dock__floating-heart"
              initial={{ opacity: 0, y: 0, scale: 0.5, x: 0, rotate: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: -58,
                scale: 1,
                x: heart.x,
                rotate: heart.rotate,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            >
              <FontAwesomeIcon icon={faHeart} />
            </m.span>
          ))}
        </AnimatePresence>
      </div>

      <m.button
        type="button"
        className={`like-dock__button${hasLiked ? ' is-liked' : ''}`}
        onClick={handleLike}
        aria-label={label}
        aria-pressed={hasLiked}
        title={label}
        initial={{ opacity: 0, y: 24, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.4 }}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.94 }}
      >
        <m.span
          className="like-dock__icon"
          key={pop}
          initial={pop ? { scale: 0.6 } : false}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 14 }}
        >
          <FontAwesomeIcon icon={faHeart} />
        </m.span>
        <RollingNumber value={loaded ? displayValue : null} />
        <span className="like-dock__sr" role="status" aria-live="polite">
          {loaded
            ? `${displayValue.toLocaleString('en-US')} likes`
            : 'Loading like count'}
        </span>
      </m.button>
    </div>
  );
};

LikeButton.propTypes = {
  // True once the page is scrolled far enough that the scroll-to-top button
  // is showing — the pill then makes room for it at its right end.
  scrolled: PropTypes.bool,
};

export default LikeButton;
