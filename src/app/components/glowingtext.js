import React from 'react';

const GlowingText = ({ text }) => {
    const letters = text.split('');
  
    return (
      <div className='glowingText'>
        {letters.map((letter, index) => (
          <span key={index} className='letter text-[20rem]'>
            {letter}
          </span>
        ))}
      </div>
    );
  };
  
  export default GlowingText;