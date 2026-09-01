import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, animate as tween } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { addLikes, isFirebaseReady, subscribeToLikes } from '../../firebase';
import { trackEvent } from '../../utils/analytics';
import RollingNumber from './RollingNumber';
import './LikeButton.scss';

// How many likes one visitor can add, ever (persisted in localStorage). The
// counter is meant to reflect "lots of different people liked this", not how
// long one person can hold the button down, so it's capped — and the same
// ceiling should be mirrored in the Realtime Database rule (see firebase.js).
const MAX_PER_VISITOR = 50;

// Rapid clicks are accumulated and sent as a single transaction this long
// after the last one, so a burst of 20 taps is one write, not 20.
const FLUSH_DELAY_MS = 900;

const STORAGE_KEY = 'likes:contributed';

const readContributed = () => {
  try {
    const raw = Number(localStorage.getItem(STORAGE_KEY));
    return Number.isFinite(raw) && raw > 0 ? Math.min(raw, MAX_PER_VISITOR) : 0;
  } catch {
    return 0;
  }
};

const writeContributed = (value) => {
  try {
    localStorage.setItem(STORAGE_KEY, String(value));
  } catch {
    // Private-mode / disabled storage — the cap just won't persist across
    // reloads for this visitor, which is an acceptable degradation.
  }
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let heartId = 0;

const LikeButton = () => {
  // The live/animated total, excluding this visitor's not-yet-saved taps.
  // null until the first value streams in from the server.
  const [displayBase, setDisplayBase] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [buffered, setBuffered] = useState(0);
  const [contributed, setContributed] = useState(readContributed);
  const [hearts, setHearts] = useState([]);
  const [pop, setPop] = useState(0);
  const [nudge, setNudge] = useState(0);

  const bufferedRef = useRef(0);
  const contributedRef = useRef(contributed);
  const flushTimer = useRef(null);
  const revealStarted = useRef(false);
  const reduceMotion = useRef(prefersReducedMotion());
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
    const amount = bufferedRef.current;
    if (amount <= 0 || !isFirebaseReady) return;

    // Hand the buffered likes to the in-flight slot in the same tick we
    // clear the buffer, so displayValue (base + buffered + inFlight) stays
    // put — no jump.
    flushingRef.current = true;
    inFlightRef.current = amount;
    bufferedRef.current = 0;
    setBuffered(0);

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
      });
      // Anything tapped while the write was in flight goes out next.
      if (bufferedRef.current > 0) {
        clearTimeout(flushTimer.current);
        flushTimer.current = setTimeout(flush, FLUSH_DELAY_MS);
      }
    } catch {
      // Write failed — return the likes to the buffer and retry shortly.
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

  const maxedOut = contributed >= MAX_PER_VISITOR;

  const handleLike = () => {
    if (!isFirebaseReady) return;

    // `contributed` already counts every tap this visitor has made,
    // including the ones still buffered — so the cap check is against it
    // alone, not contributed + buffered (that would double-count and stop
    // at half the real limit).
    if (contributedRef.current >= MAX_PER_VISITOR) {
      setNudge((n) => n + 1);
      return;
    }

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
  const label = maxedOut
    ? `You've liked this site ${MAX_PER_VISITOR} times — thank you!`
    : hasLiked
      ? `You've liked this site ${contributed} time${contributed === 1 ? '' : 's'}. Tap to add another.`
      : 'Like this site';

  return (
    <div className="like-dock">
      <div className="like-dock__hearts" aria-hidden="true">
        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.span
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
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <motion.button
        type="button"
        className={`like-dock__button${hasLiked ? ' is-liked' : ''}${
          maxedOut ? ' is-maxed' : ''
        }`}
        onClick={handleLike}
        aria-label={label}
        aria-pressed={hasLiked}
        title={label}
        initial={{ opacity: 0, y: 24, scale: 0.9 }}
        animate={
          nudge
            ? { opacity: 1, y: 0, scale: 1, x: [0, -6, 6, -4, 4, 0] }
            : { opacity: 1, y: 0, scale: 1, x: 0 }
        }
        transition={
          nudge
            ? { duration: 0.4, ease: 'easeInOut' }
            : { type: 'spring', stiffness: 260, damping: 22, delay: 0.4 }
        }
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.94 }}
      >
        <motion.span
          className="like-dock__icon"
          key={pop}
          initial={pop ? { scale: 0.6 } : false}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 14 }}
        >
          <FontAwesomeIcon icon={faHeart} />
        </motion.span>
        <RollingNumber
          value={loaded ? displayValue : null}
          animate={!reduceMotion.current}
        />
        <span className="like-dock__sr" role="status" aria-live="polite">
          {loaded
            ? `${displayValue.toLocaleString('en-US')} likes`
            : 'Loading like count'}
        </span>
      </motion.button>
    </div>
  );
};

export default LikeButton;
