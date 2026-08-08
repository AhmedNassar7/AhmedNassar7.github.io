import { useCallback } from 'react';
import PropTypes from 'prop-types';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';

const ParticlesBackground = ({ theme }) => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: 'transparent',
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: 'push',
            },
            onHover: {
              enable: true,
              mode: 'repulse',
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: theme === 'dark' ? '#ffffff' : '#000000',
          },
          links: {
            color: theme === 'dark' ? '#ffffff' : '#000000',
            distance: 150,
            enable: true,
            opacity: 0.25,
            width: 1,
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: {
              default: 'bounce',
            },
            random: false,
            speed: 2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 50,
            // onClick below pushes 4 more particles per click with no cap
            // otherwise — clicking anywhere on the page (nav links,
            // buttons, the cube, ...) adds to this permanently, so a
            // normal browsing session climbs well past the initial 50 and
            // keeps getting more expensive to render (more particles means
            // more pairwise link-distance checks every frame) the longer
            // it goes on. This library's `limit` is a plain number, not an
            // object — once the count would exceed it, addParticle() (see
            // tsparticles-engine's Core/Particles.js) automatically removes
            // the oldest particles to make room, so clicking still feels
            // responsive instead of silently doing nothing past the cap.
            limit: 80,
          },
          opacity: {
            value: 0.3,
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};
ParticlesBackground.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default ParticlesBackground;
