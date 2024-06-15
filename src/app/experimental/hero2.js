'use client'
// components/Hero.js
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import SplitType from "split-type";
import Image from 'next/image';
import YoyoVideo from './yoyovideo';

gsap.registerPlugin(ScrollTrigger);

const Hero2 = () => {
  const heroRef = useRef(null);
  const topPanelRef = useRef(null);
  const bottomPanelRef = useRef(null);
  const firsttext = useRef(null);
  const firsttext2 = useRef(null);

  useEffect(() => {
    // Splittext
    const firstline = new SplitType('#firstline');
    const name = new SplitType('#name');

    gsap.set(topPanelRef.current, { yPercent: 0 });
    gsap.set(bottomPanelRef.current, { yPercent: 0 });

    const tl = gsap.timeline({ defaults: { ease: 'power4.inOut' } });

    tl.to([firsttext.current, firsttext2.current], {
      y: (index) => (index === 0 ? -150 : 150),
      ease: 'power1.out',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        scrub: true,
      },
    });
  }, []);

  return (
    <div ref={heroRef} style={{ position: 'relative', height: '100vh', transformStyle: 'preserve-3d' }} className='perspective w-full top-0 left-0 z-[50] text-[#fff] uppercase  justify-center items-center'>
      <YoyoVideo />
      <div
        ref={topPanelRef}
        style={{
          position: 'absolute',
          top: 0,
          left: '0%',
          right: '0%',
          height: '100vh',
          width: '100%',
          zIndex: 50,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.3s ease-out',
       
        }}
        className='flex justify-center'
      >

        
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ zIndex: 60 }} className="w-full h-full">
          
        <defs>
    <pattern id="brickwall"  patternUnits="userSpaceOnUse" preserveAspectRatio="xMidYMid slice" width="100" height="100">
      <image href="/images/bgdark2.jpeg" x="0" y="0" width="100" height="100"  />
    </pattern>
  </defs>
  <defs>
    <filter id="blendFilter">
      <feBlend mode="color-dodge" in="SourceGraphic" in2="BackgroundImage" result="blendResult"/>
    </filter>
    <pattern id="imagePattern" patternUnits="objectBoundingBox" width="1" height="1">
      <image href="/images/keoniis-25.png" x="55" y="30" width="50" height="50"  preserveAspectRatio="xMidYMid meet" />
    </pattern>
  </defs>
          <defs>
            
            <mask id='mask1' x="0" y="0" width="100%" height="100%">
              
              <rect x="0" y="0" width="100%" height="100%" fill="#fff" />
             
              <text ref={firsttext} x="40%" y="50%" textAnchor="middle" dominantBaseline="hanging" className='text-[1rem] leading-[1rem] font-[GothamBlack] tracking-[1rem]' fill="#000">Keoniis</text>
              
            </mask>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="#f2f2f2" mask="url(#mask1)" />
         
        
        </svg>
        {/*<Image src={'/images/keoniis-25.png'} width={737} height={1397} className='w-[35%] absolute bottom-[-10%] right-[5%]  z-[61] mix-blend-multiply' />*/}
        
      </div>
     
    </div>
  );
};

export default Hero2;