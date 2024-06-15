import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const HoverButton = ({ text }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;

    const handleMouseMove = (e) => {
      const { offsetX, offsetY, target } = e;
      const { offsetWidth: width, offsetHeight: height } = target;

      const x = (offsetX / width - 0.5) * 40;
      const y = (offsetY / height - 0.5) * 40;

      gsap.to(button, {
        duration: 0.3,
        x,
        y,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        duration: 0.3,
        x: 0,
        y: 0,
        ease: 'power2.out',
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <button ref={buttonRef} className="hover-button">
      {text}
      <style jsx>{`
        .hover-button {
          position: relative;
          padding: 10px 20px;
          font-size: 15rem;
          
          color: white;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </button>
  );
};

export default HoverButton;