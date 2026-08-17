import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import OrgLogo from './OrgLogo';

// px/ms — tuned to feel ambient, not distracting, at a glance.
const AUTO_SCROLL_SPEED = 0.035;

// Renders the company list twice back-to-back so wrapping the scroll offset
// at the halfway point loops seamlessly in either direction, whether the
// loop is being driven by the auto-scroll rAF or by the user's own drag.
const InterviewMarquee = ({ companies }) => {
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const halfWidthRef = useRef(0);
  const rafRef = useRef(null);
  const lastTsRef = useRef(null);
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const applyTransform = () => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
    }
  };

  const wrapOffset = () => {
    const half = halfWidthRef.current;
    if (half <= 0) return;
    while (offsetRef.current <= -half) offsetRef.current += half;
    while (offsetRef.current > 0) offsetRef.current -= half;
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    // Content is duplicated (2N items), so scrollWidth spans 2N items and
    // 19 gaps — but the loop's true period (the shift that re-aligns copy A
    // with copy B) is N items plus N full gaps (9 internal + 1 connecting
    // the copies), i.e. scrollWidth/2 plus half a gap. Skipping that
    // half-gap correction wraps the loop a bit short of one true period,
    // which is invisible with few/small items but shows up as a visible
    // skip with larger items and gaps like these.
    //
    // Logos load asynchronously (several are lazy-loaded), so the track's
    // true width isn't known at mount — it grows as each image finishes
    // loading. Measuring once up front bakes in a too-small half-width,
    // which makes the wrap trigger before the duplicate copy has actually
    // scrolled into place, showing up as a visible jump back to the start.
    // A ResizeObserver keeps this in sync as images (and window size) change.
    const updateHalfWidth = () => {
      const gapPx = parseFloat(getComputedStyle(track).columnGap) || 0;
      halfWidthRef.current = (track.scrollWidth + gapPx) / 2;
    };
    updateHalfWidth();

    const resizeObserver = new ResizeObserver(updateHalfWidth);
    resizeObserver.observe(track);

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) {
      return () => resizeObserver.disconnect();
    }

    const step = (ts) => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = ts - lastTsRef.current;
      lastTsRef.current = ts;

      if (!draggingRef.current) {
        offsetRef.current -= AUTO_SCROLL_SPEED * dt;
        wrapOffset();
        applyTransform();
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      resizeObserver.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handlePointerDown = (event) => {
    draggingRef.current = true;
    setIsDragging(true);
    dragStartXRef.current = event.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!draggingRef.current) return;
    offsetRef.current =
      dragStartOffsetRef.current + (event.clientX - dragStartXRef.current);
    wrapOffset();
    applyTransform();
  };

  const endDrag = () => {
    draggingRef.current = false;
    setIsDragging(false);
  };

  return (
    <div className="interview-marquee">
      <div
        ref={trackRef}
        className={`interview-marquee-track${isDragging ? ' is-dragging' : ''}`}
        aria-label="Companies I have interviewed with"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {[...companies, ...companies].map((name, index) => (
          <div
            key={index}
            className="interview-icon"
            role="img"
            aria-label={name}
            aria-hidden={index >= companies.length}
            title={name}
          >
            <OrgLogo name={name} />
          </div>
        ))}
      </div>
    </div>
  );
};

InterviewMarquee.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default InterviewMarquee;
