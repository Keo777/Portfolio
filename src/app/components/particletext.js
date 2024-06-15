import React, { useRef, useEffect } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles/tsparticles.bundle';
import { gsap } from 'gsap';

const TextWithParticles = ({ text }) => {
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const textElement = textRef.current;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      context.clearRect(0, 0, canvas.width, canvas.height);

      const textMetrics = context.measureText(text);
      const textWidth = textMetrics.width;
      const textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;

      const textX = (canvas.width - textWidth) / 2;
      const textY = (canvas.height + textHeight) / 2;

      context.font = '48px Arial';
      context.fillText(text, textX, textY);

      const pixelData = context.getImageData(0, 0, canvas.width, canvas.height).data;

      for (let i = 0; i < pixelData.length; i += 4) {
        const x = (i / 4) % canvas.width;
        const y = Math.floor((i / 4) / canvas.width);

        const distanceToMouse = Math.sqrt(Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2));

        if (distanceToMouse < 25 && pixelData[i + 3] > 0) {
          gsap.to(textElement, {
            textShadow: `0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.5)`,
            duration: 0.5,
            ease: 'power2.inOut',
          });

          const particles = particlesRef.current;
          particles.addParticle({
            x,
            y,
            size: 2,
            speed: { horizontal: Math.random() - 0.5, vertical: Math.random() - 0.5 },
          });
        }
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [text]);

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  const particlesLoaded = async (container) => {
    particlesRef.current = container;
  };

  return (
    <div>
      <canvas ref={canvasRef} width={500} height={100} />
      <div ref={textRef} style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
        {text}
      </div>
      <Particles
        id="particles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: false,
          particles: {
            number: {
              value: 0,
              density: {
                enable: false,
              },
            },
            color: {
              value: '#ffffff',
            },
            shape: {
              type: 'circle',
            },
            opacity: {
              value: 0.5,
              random: false,
            },
            size: {
              value: 3,
              random: true,
            },
            move: {
              enable: true,
              speed: 6,
              direction: 'none',
              random: false,
              straight: false,
              out_mode: 'out',
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
            },
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: false,
                mode: 'repulse',
              },
              onclick: {
                enable: false,
                mode: 'push',
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 400,
                line_linked: {
                  opacity: 1,
                },
              },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
              push: {
                particles_nb: 4,
              },
              remove: {
                particles_nb: 2,
              },
            },
          },
          retina_detect: true,
        }}
      />
    </div>
  );
};

export default TextWithParticles;