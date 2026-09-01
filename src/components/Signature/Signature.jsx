import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useInView } from 'framer-motion';
import { AHMED_NASSAR_SIGNATURE } from './signaturePaths';
import './Signature.scss';

// The real signature. Drop a file at src/assets/images/signature.(svg|png|
// webp) and it's used automatically, no code change:
//   • signature.svg  — inlined, so it inherits the page text colour and
//     shows correctly on both themes with no background;
//   • signature.png/.webp — shown as an <img> (dark theme inverts it).
// Whichever is present replaces the drawn placeholder below.
const SIGNATURE_SVG =
  Object.values(
    import.meta.glob('../../assets/images/signature.svg', {
      query: '?raw',
      import: 'default',
      eager: true,
    }),
  )[0] ?? null;

const SIGNATURE_IMG =
  Object.values(
    import.meta.glob('../../assets/images/signature.{png,webp,jpg,jpeg}', {
      query: '?url',
      import: 'default',
      eager: true,
    }),
  )[0] ?? null;

// Belt-and-braces: never inject a <script> even from our own asset.
const cleanSvg = (raw) =>
  typeof raw === 'string'
    ? raw.replace(/<script[\s\S]*?<\/script>/gi, '')
    : null;

const INLINE_SVG = cleanSvg(SIGNATURE_SVG);

// One pen stroke of the drawn placeholder. Measures its own length so the
// dash sweep matches the geometry, then reveals as `inView` flips.
const InkStroke = ({ d, delay, inView }) => {
  const ref = useRef(null);
  const [length, setLength] = useState(1400);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof el.getTotalLength !== 'function') return;
    try {
      const measured = el.getTotalLength();
      if (measured > 0) setLength(Math.ceil(measured * 1.02));
    } catch {
      // No layout engine (jsdom) — keep the fallback length.
    }
  }, [d]);

  return (
    <path
      ref={ref}
      className="signature__ink"
      d={d}
      style={{
        strokeDasharray: length,
        strokeDashoffset: inView ? 0 : length,
        transitionDelay: `${delay}s`,
      }}
    />
  );
};

InkStroke.propTypes = {
  d: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
  inView: PropTypes.bool.isRequired,
};

// A self-writing signature. A real signature asset wipes on left-to-right
// (as if being signed); otherwise the placeholder strokes draw themselves
// on in order. `paths` overrides: pass an array of `d` strings to use your
// own traced strokes, or `null` for the name in an OS cursive font.
const Signature = ({ name = 'Ahmed Nassar', paths, className = '' }) => {
  const wrapRef = useRef(null);
  const textRef = useRef(null);
  const inView = useInView(wrapRef, { once: true, margin: '-40px' });
  const [textLength, setTextLength] = useState(1800);

  const auto = paths === undefined;
  const useInlineSvg = auto && Boolean(INLINE_SVG);
  const useImg = auto && !useInlineSvg && Boolean(SIGNATURE_IMG);
  const strokes = auto ? AHMED_NASSAR_SIGNATURE : paths;
  const useStrokes =
    !useInlineSvg && !useImg && Array.isArray(strokes) && strokes.length > 0;

  useEffect(() => {
    if (useInlineSvg || useImg || useStrokes) return;
    const el = textRef.current;
    if (!el || typeof el.getComputedTextLength !== 'function') return;
    try {
      const measured = el.getComputedTextLength();
      if (measured > 0) setTextLength(Math.ceil(measured * 1.05));
    } catch {
      // jsdom — keep the fallback length.
    }
  }, [name, useInlineSvg, useImg, useStrokes]);

  const label = `${name} — signature`;

  return (
    <div
      ref={wrapRef}
      className={`signature${inView ? ' is-drawn' : ''}${
        className ? ` ${className}` : ''
      }`}
    >
      {useInlineSvg ? (
        <span
          className="signature__reveal signature__reveal--svg"
          role="img"
          aria-label={label}
          dangerouslySetInnerHTML={{ __html: INLINE_SVG }}
        />
      ) : useImg ? (
        <span className="signature__reveal">
          <img
            className="signature__img"
            src={SIGNATURE_IMG}
            alt={label}
            draggable={false}
            loading="lazy"
          />
        </span>
      ) : (
        <svg
          className="signature__svg"
          viewBox="0 0 560 170"
          role="img"
          aria-label={label}
        >
          {useStrokes ? (
            strokes.map((d, index) => (
              <InkStroke
                key={index}
                d={d}
                delay={index * 0.5}
                inView={inView}
              />
            ))
          ) : (
            <text
              ref={textRef}
              className="signature__ink signature__ink--text"
              x="16"
              y="112"
              style={{
                strokeDasharray: textLength,
                strokeDashoffset: inView ? 0 : textLength,
              }}
            >
              {name}
            </text>
          )}
        </svg>
      )}
    </div>
  );
};

Signature.propTypes = {
  name: PropTypes.string,
  paths: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
};

export default Signature;
