import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// Classic Rubik's Cube palette — instantly recognizable at a glance.
const COLORS = {
  red: '#c41e3a',
  orange: '#ff6f00',
  white: '#f2f2f2',
  yellow: '#ffd500',
  green: '#009e60',
  blue: '#0051ba',
};
const PLASTIC = '#161616';

const CUBIE_SIZE = 0.62;
const GAP = 0.06;
const SPACING = CUBIE_SIZE + GAP;

// `emissive` makes each sticker glow with its own color rather than only
// showing color where a light happens to hit it — this is what keeps every
// face reading as vivid regardless of rotation, and echoes the glow treatment
// already used elsewhere on the site (the profile photo's ring, the cursor
// glow) instead of relying on flat, angle-dependent diffuse lighting.
const faceMaterial = (isOuter, color) =>
  new THREE.MeshStandardMaterial({
    color: isOuter ? color : PLASTIC,
    emissive: isOuter ? color : '#000000',
    emissiveIntensity: isOuter ? 0.45 : 0,
    roughness: 0.4,
    metalness: 0,
  });

// A 3x3x3 Rubik's Cube (the true center cubie is skipped — it's always
// fully hidden inside the others, same as on a real cube). Built from real
// THREE.Material instances rather than JSX <meshStandardMaterial> children
// because a BoxGeometry's 6 faces each need a different sticker color,
// which only the imperative `material={[...]}` array form supports — the
// tradeoff is that R3F's automatic dispose-on-unmount only tracks materials
// it declared itself via JSX, not ones handed to it pre-built like this, so
// they're disposed manually below instead.
const useCubies = () =>
  useMemo(() => {
    const coords = [-1, 0, 1];
    const list = [];

    for (const x of coords) {
      for (const y of coords) {
        for (const z of coords) {
          if (x === 0 && y === 0 && z === 0) continue;

          list.push({
            key: `${x}${y}${z}`,
            position: [x * SPACING, y * SPACING, z * SPACING],
            materials: [
              faceMaterial(x === 1, COLORS.red),
              faceMaterial(x === -1, COLORS.orange),
              faceMaterial(y === 1, COLORS.white),
              faceMaterial(y === -1, COLORS.yellow),
              faceMaterial(z === 1, COLORS.green),
              faceMaterial(z === -1, COLORS.blue),
            ],
          });
        }
      }
    }

    return list;
  }, []);

const RubiksCube = () => {
  const cubies = useCubies();

  useEffect(() => {
    return () => {
      cubies.forEach((cubie) =>
        cubie.materials.forEach((material) => material.dispose()),
      );
    };
  }, [cubies]);

  return (
    <group rotation={[0.4, -0.5, 0]}>
      {cubies.map((cubie) => (
        <mesh
          key={cubie.key}
          position={cubie.position}
          material={cubie.materials}
        >
          <boxGeometry args={[CUBIE_SIZE, CUBIE_SIZE, CUBIE_SIZE]} />
        </mesh>
      ))}
    </group>
  );
};

const Scene = ({ autoRotate }) => (
  <>
    <ambientLight intensity={0.8} />
    <pointLight position={[4, 3, 4]} intensity={1.4} color="#ffffff" />
    <pointLight position={[-4, -2, 3]} intensity={0.7} color="#8ab4ff" />
    <RubiksCube />
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={0.6}
      autoRotate={autoRotate}
      autoRotateSpeed={4}
    />
  </>
);

Scene.propTypes = {
  autoRotate: PropTypes.bool.isRequired,
};

// A small rotatable Rubik's Cube the visitor can drag to spin in any
// direction. Transparent background, no card/border — meant to sit right
// alongside the CSS orbit balls as one more floating element around the
// profile photo, not as a separate isolated widget. Mounted only when the
// caller has already checked prefers-reduced-motion.
//
// The position/size styling lives on this wrapper div, not on <Canvas>
// itself: R3F sets its own inline position/width/height styles on the
// element it's given, and inline styles beat an external stylesheet rule
// of the same property — a className handed straight to <Canvas> would get
// its position/size silently overridden.
//
// Idles by default (frameloop="demand", no autoRotate) — the "always" mode
// redraws the scene at the display's refresh rate forever for as long as
// the tab stays open, even while the cube just sits there, which is what
// made a long browsing session feel progressively more sluggish. An
// IntersectionObserver flips both frameloop and autoRotate back on only
// while the cube is actually scrolled into view, so the idle spin is back
// by default, but bounded to "only while it's on screen" instead of
// "forever regardless of where you've scrolled to". Dragging still works
// even while off-screen/idle — OrbitControls asks for a render on demand
// the moment you interact with it either way.
const RotatableShape = () => {
  const wrapperRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="rotatable-shape" ref={wrapperRef}>
      <Canvas
        frameloop={isVisible ? 'always' : 'demand'}
        camera={{ position: [0, 0, 4.6], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene autoRotate={isVisible} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default RotatableShape;
