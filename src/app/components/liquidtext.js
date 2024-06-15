import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LiquidText = ({ text }) => {
    const canvasRef = useRef(null);
    const textRef = useRef({ width: 0, height: 0 });
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
  
      const setCanvasSize = () => {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      };
  
      const drawText = () => {
        setCanvasSize();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
        const fontSize = canvas.width / text.length;
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
  
        const textX = 10;
        const textY = canvas.height / 2;
  
        ctx.fillStyle = 'white';
        ctx.fillText(text, textX, textY);
  
        // Store text dimensions
        const metrics = ctx.measureText(text);
        textRef.current.width = metrics.width;
        textRef.current.height = fontSize;
      };
  
      const handleMouseMove = (event) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
  
        gsap.to(canvas, {
          duration: 0.5,
          ease: "power4.out",
          x: (mouseX - canvas.width / 2) * 0.1,
          y: (mouseY - canvas.height / 2) * 0.1
        });
      };
  
      drawText();
      window.addEventListener('resize', drawText);
  
      return () => {
        window.removeEventListener('resize', drawText);
      };
    }, [text]);

  return <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }}></canvas>;
};

export default LiquidText;