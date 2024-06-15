import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const RippleText = ({ text }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const fontSize = 40;
      const letters = text.split('');
      const distortStrength = 10; // Strength of distortion effect
  
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  
      function drawText() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = `${fontSize}px Arial`;
        context.fillStyle = 'rgba(255, 255, 255, 0.8)';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
  
        letters.forEach((letter, index) => {
          context.save();
          // Distort each letter
          const dx = Math.random() * distortStrength * 2 - distortStrength;
          const dy = Math.random() * distortStrength * 2 - distortStrength;
          context.translate(index * fontSize + fontSize / 2, canvas.height / 2);
          context.transform(1, 0, dx / fontSize, 1, 0, dy / 2);
          context.fillText(letter, 0, 0);
          context.restore();
        });
      }
  
      gsap.to({}, {
        repeat: -1,
        duration: 1,
        onRepeat: drawText,
      });
    }, [text]);
  
    return <canvas ref={canvasRef} />;
  };

export default RippleText;