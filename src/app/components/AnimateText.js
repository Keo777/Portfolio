import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Particles from 'react-tsparticles';

const TextWithParticles = ({ text }) => {
  const textRef = useRef(null);
  const particleRef = useRef(null);
  const [isParticlesInitialized, setIsParticlesInitialized] = useState(false);
  const particleContainerRef = useRef(null);

  const particleOptions = {
    background: {
      color: {
        value: "#fff"
      }
    },
    particles: {
      number: {
        value: 10,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: "#000"
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 1,
        random: true
      },
      size: {
        value: 3,
        random: true
      },
      move: {
        enable: true,
        speed: 1
      }
    }
  };

  useEffect(() => {
    const textElement = textRef.current;

    // Define GSAP animation
    const hoverAnimation = gsap.to(textElement, {
      scale: 1.2,
      duration: 0.3,
      paused: true,
    });

    // Event listeners
    const handleMouseEnter = () => {
      hoverAnimation.play();
      if (particleContainerRef.current) {
        particleContainerRef.current.startAnimation();
      }
    };

    const handleMouseLeave = () => {
      hoverAnimation.reverse();
      if (particleContainerRef.current) {
        particleContainerRef.current.stopAnimation();
      }
    };

    textElement.addEventListener('mouseenter', handleMouseEnter);
    textElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      textElement.removeEventListener('mouseenter', handleMouseEnter);
      textElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (particleRef.current && particleRef.current.containerRef.current) {
      setIsParticlesInitialized(true);
      particleContainerRef.current = particleRef.current.containerRef.current;
    }
  }, []);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div ref={textRef} style={{ fontWeight: 'bold', position: 'relative', zIndex: 1, fontSize: '20rem' }}>
        {text}
      </div>
      {isParticlesInitialized && (
        <Particles
          id="tsparticles"
          options={particleOptions}
          style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 20 }}
          width="100%"
          height="100%"
          ref={particleRef}
        />
      )}
    </div>
  );
};

export default TextWithParticles;