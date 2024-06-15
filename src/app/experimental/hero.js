'use client'
// components/Hero.js
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import SplitType from "split-type";
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
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
    <div ref={heroRef} style={{ position: 'fixed', height: '100vh', transformStyle: 'preserve-3d' }} className=' perspective w-full top-0 left-0 z-[50] text-[#fff] uppercase  justify-center items-center'>
      <div
        ref={topPanelRef}
        style={{
          position: 'absolute',
          top: 0,
          left: '0%',
          right: '0%',
          height: '100vh',
          zIndex: 50,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.3s ease-out',
       
        }}
        className='flex justify-center'
      >

        
        <svg viewBox="0 0 285 120" preserveAspectRatio='none' style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 60 }}>
          
        <defs>
    <pattern id="brickwall" patternUnits="objectBoundingBox" width="1" height="1">
      <image href="/images/bglight2.jpg" x="-50" y="0" width="400" height="200"  preserveAspectRatio="xMidYMid meet" />
    </pattern>
  </defs>
  <defs>
    <filter id="blendFilter">
      <feBlend mode="color-dodge" in="SourceGraphic" in2="BackgroundImage" result="blendResult"/>
    </filter>
    <pattern id="imagePattern" patternUnits="objectBoundingBox" width="1" height="1">
      <image href="/images/keoniis-25.png" x="220" y="20" width="70" height="100"  preserveAspectRatio="xMidYMid meet" />
    </pattern>
  </defs>
          <defs>
            
            <mask id='mask1' x="0" y="0" width="100%" height="100%">
              
              <rect x="0" y="0" width="100%" height="100%" fill="#fff" />
             
              <text ref={firsttext} x="50%" y="100%" textAnchor="middle" dominantBaseline="text-after-edge" className='text-[5rem] leading-[3.5rem] font-[Akerley]' fill="#000">Keoniis</text>
              
            </mask>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#brickwall)" mask="url(#mask1)" />
          <rect x="0" y="0" width="100%" height="100%" fill="url(#imagePattern)" mask="url(#mask1)" />
        
        </svg>
        {/*<Image src={'/images/keoniis4.png'} width={737} height={1397} className='w-[30%] absolute bottom-[-70%] right-[0%]  z-[61] mix-blend-multiply' />*/}
        
      </div>
      {/*<div
        ref={bottomPanelRef}
        style={{
          position: 'absolute',
          top: '23vh',
          left: '-25%',
          right: '-25%',
          height: '115%',
          zIndex: 50,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.3s ease-out',
          transform: 'rotateX(100deg)',
        }}
        className='flex justify-center mx-auto'
      >
        <svg viewBox="0 0 285 100" preserveAspectRatio='none' style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 60 }}>
        <defs>
    <pattern id="darkbg" patternUnits="objectBoundingBox" width="1" height="1">
      <image href="/images/bgdark.jpg" x="-50" y="0" width="400" height="200"  preserveAspectRatio="xMidYMid meet" />
    </pattern>
  </defs>
          <defs>
            <mask id='mask2' x="0" y="0" width="100%" height="100%">
              <rect x="0" y="0" width="100%" height="100%" fill="#fff" />
              <text ref={firsttext2} x="50%" y="100%" textAnchor="middle" dominantBaseline="text-after-edge" className='text-[5rem] leading-[3.5rem] font-[Akerley]' fill="#000">Keoniis</text>
            </mask>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#darkbg)" mask="url(#mask2)" />
        </svg>
        
      </div>*/}
    </div>
  );
};

export default Hero;