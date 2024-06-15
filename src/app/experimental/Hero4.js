import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero4 = () => {
  const containerRef = useRef(null);
  
  return (
    <div ref={containerRef} style={{ height: '100vh', overflow: 'hidden' }} className='w-full left-0 2xl:left-[0%] top-0 absolute z-[3]'>
      <div className="top-div text-left absolute top-0 left-0 right-0" style={{ height: '50%' }}>
        <h1 className="text-[12rem] leading-[13rem] font-[GothamMedium]  uppercase  text-[#fff] absolute bottom-0 left-0 right-0 tracking-[-1.5rem] mix-blend-difference" style={{ height: ''}}>Hey There, I'm</h1>
      </div>
      <div className="bottom-div text-left absolute bottom-0 left-[0%] right-0 overflow-hidden" style={{ height: '50%' }}>
        <h1 className="text-[19rem] leading-[13rem] font-[GothamMedium]  uppercase text-[#fff] tracking-[-1.5rem]"><span className='text-[#c72222] font-[GothamBlack]'>Keoniis.</span></h1>
        
        
      </div>
    </div>
  );
};

export default Hero4;