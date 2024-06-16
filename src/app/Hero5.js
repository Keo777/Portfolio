import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import YoyoVideo from './yoyovideo';

const Hero5 = ({ activeVideo, toggleVideo, cycleVideo }) => {
  const containerRef = useRef(null);
  const firsttext = useRef(null);
  const secondtext = useRef(null);
  const thirdtext = useRef(null);
  const fourthtext = useRef(null);
  const svgRef = useRef(null);
  const [showYoyoVideo, setShowYoyoVideo] = useState(false);

  useEffect(() => {
    const animateIntro = async () => {

    const tl = gsap.timeline({defaults: {ease: 'power4.inOut'}})

    tl

    .to(firsttext.current, {
      y: 0, opacity: 1, stagger: 0.5, duration: 1, 
    }, "")
    .to(firsttext.current, {
      clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)', duration: 2
    }, "-=1.25")
    .to(secondtext.current, {
      y: 0, opacity: 1, stagger: 0.5, duration: 1, 
    }, "-=1.75")
    .to(secondtext.current, {
      clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)', duration: 2
    }, "-=2")
    .to(svgRef.current.querySelectorAll('path'), {
      y: 0,
      duration: 1,
      stagger: 0.01,
      ease: 'power4.inOut'
    }, "-=1.5")
    .to(svgRef.current.querySelectorAll('path'), {
      x: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.01,
      ease: "back.out(1.7)",
      onComplete: reverseSvgPaths
    }, "-=0.5")
    .to([firsttext.current, secondtext.current], {
      letterSpacing: '2rem', opacity: 0, duration: 0.5, ease: "expoScale(0.5,7,none)",
    }, "-=.25")
    .to(thirdtext.current, {
      y: 0, opacity: 1, stagger: 0.5, duration: 1.5, 
    }, )
    .to(thirdtext.current, {
      clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)', duration: 1.75
    }, "-=1.45")
    .to(fourthtext.current, {
      y: 0, opacity: 1, stagger: 0.5, duration: 2,
    }, "-=2")
    
    .to(fourthtext.current, {
      clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)', duration: 2
    }, "-=2.25")
    
    .add(() => {
      // Mount the YoyoVideo component at this point in the timeline
      setShowYoyoVideo(true);
    }, "-=1.25");
  };

  const reverseSvgPaths = () => {
    const svgPaths = svgRef.current.querySelectorAll('path');
    gsap.to(svgPaths, {
      y: (index, target) => {
        return target.getAttribute('class').includes('translate-y-[-100%]') ? '-150%' : '150%';
      },
      x: (index, target) => {
        return target.getAttribute('class').includes('translate-x-[-50%]') ? '-250%' : '0';
      },
      opacity: 0,
      duration: 1,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'bottom bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  };

  gsap.to([thirdtext.current, fourthtext.current], {
    letterSpacing: '1.5vw',
    opacity: 0,
    scrollTrigger: {
      trigger: containerRef.current,
        start: 'bottom bottom',
        end: 'bottom top',  
      scrub: true,        
    },
  });

  
  
  animateIntro();

  // Mouse movement effect for 3D tilt
  const maxRotate = 7; // Maximum rotation in degrees

  const handleMouseMove = (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const deltaX = centerX - mouseX;
    const deltaY = centerY - mouseY;
    const rotateX = Math.max(-maxRotate, Math.min(maxRotate, deltaY * 0.015)); // Clamp rotationX
    const rotateY = Math.max(-maxRotate, Math.min(maxRotate, deltaX * 0.015)); // Clamp rotationY
  
    tiltText(rotateX, rotateY);
  };
  
  const handleDeviceOrientation = (e) => {
    const rotateX = Math.max(-maxRotate, Math.min(maxRotate, e.beta * 0.5)); // Clamp rotationX from beta
    const rotateY = Math.max(-maxRotate, Math.min(maxRotate, e.gamma * 0.5)); // Clamp rotationY from gamma
  
    tiltText(rotateX, rotateY);
  };
  
  const tiltText = (rotateX, rotateY) => {

    gsap.to([thirdtext.current, fourthtext.current], {
      rotationX: rotateX,
      rotationY: -rotateY,
      transformPerspective: 500,
      ease: "power2.out",
      duration: 2,
    });
  };

  window.addEventListener("mousemove", handleMouseMove);
window.addEventListener("deviceorientation", handleDeviceOrientation);

return () => {
  window.removeEventListener("mousemove", handleMouseMove);
  window.removeEventListener("deviceorientation", handleDeviceOrientation);
};


  }, []);

  return (
    <div ref={containerRef} className='h-full w-full left-0 top-0 absolute z-[6] overflow-hidden'>
      <div className='w-[100%] h-[auto] xl:w-[50%] absolute bottom-0 left-0 top-[50%] xl:top-[40%] m-auto text-center'>
        <div className="overflow-hidden text-[clamp(30px,6vw,70px)] leading-[clamp(30px,6vw,70px)] uppercase font-[monument] text-[#fff] tracking-[0rem] whitespace-nowrap">
          <span ref={firsttext} className='translate-y-[100%] opacity-0 inline-block split2'>Hey There,</span>
        </div>
        <div className="overflow-hidden text-[clamp(30px,6vw,70px)] leading-[clamp(30px,6vw,70px)] 2xl:ml-[10%] uppercase font-[monument] text-[#fff] tracking-[0rem] whitespace-nowrap">
          <span ref={secondtext} className='translate-y-[-100%] opacity-0 inline-block split'>My Name&apos;s</span>
        </div>
        </div>
        <div className='w-[100%] h-[auto] xl:w-[50%] absolute bottom-0 left-0 top-[50%] xl:top-[38%] m-auto text-center'>
        <div className="overflow-hidden text-[clamp(45px,8vw,80px)] leading-[clamp(45px,8vw,80px)] 3xl:text-[clamp(45px,8vw,100px)] 3xl:leading-[clamp(45px,8vw,90px)] xl:pl-[5%] 2xl:pl-[12%] uppercase font-[monument] text-[#fff] tracking-[0rem]">
          <span ref={thirdtext} className='translate-y-[120%] inline-block split2'>Creative</span>
        </div>
        <div className="overflow-hidden text-[clamp(45px,8vw,80px)] leading-[clamp(45px,8vw,80px)] 3xl:text-[clamp(45px,8vw,100px)] 3xl:leading-[clamp(45px,8vw,90px)] xl:pl-[5%] 2xl:pl-[12%] uppercase font-[monument] text-[#fff] tracking-[0rem]">
          <span ref={fourthtext} className='translate-y-[-120%] inline-block split'>Developer</span>
        </div>
      </div>
      {/*<div className='absolute right-0 top-[50%] flex-col w-[20%] text-white'>
        <button className='w-full' onClick={() => toggleVideo(1)}>Video 1</button>
        <button className='w-full' onClick={() => toggleVideo(2)}>Video 2</button>
        <button className='w-full' onClick={() => toggleVideo(3)}>Video 3</button>
      </div>*/}
      <div className='absolute w-[97%] 2xl:w-[90%] h-auto bottom-[2%] left-0 right-0 mx-auto z-[5]'>
        
      <svg onClick={cycleVideo} ref={svgRef} id="herologo" width="100%" height="100%" viewBox="0 0 507 85" preserveAspectRatio="none" className='cursor-pointer'>
          <defs>
            <clipPath id="clipPath">
              <path className='translate-y-[-100%] cls-1' d="m54.31,38.12l42.48,43.21h-24.94l-30.81-32.26-21.52,17.36v14.9H1.5V3.59h18.01v40.29L69.48,3.59h27.31l-42.48,34.53Z"/>
              <path className='translate-y-[-100%] cls-1' d="m177.47,41.61c0-25.88,13.08-40.11,43.52-40.11s43.52,14.32,43.52,40.11-13.18,40.29-43.52,40.29-43.52-14.32-43.52-40.29Zm69.31,0c0-15.83-7.11-23.23-25.69-23.23s-25.69,7.3-25.69,23.23,7.21,23.42,25.69,23.42,25.69-7.49,25.69-23.42Z"/>
              <path className='translate-y-[100%] cls-1'  d="m360.83,3.59v77.75h-24.27l-47.78-58.5v58.5h-18.01V3.59h24.18l47.88,58.69V3.59h18.01Z"/>
              <path className='translate-y-[-100%] cls-1' d="m386.43,81.33h-18.01V3.59h18.01v77.75Z"/>
              <path className='translate-x-[-50%] cls-1' d="m102.95,52.89v-19.91h69.21v19.91h-69.21Z"/>
              <path className='translate-y-[-100%] cls-1' d="m102.95,23.5V3.59h69.21v19.91h-69.21Z"/>
              <path className='translate-y-[100%] cls-1'  d="m102.95,81.33v-19.91h69.21v19.91h-69.21Z"/>
              <path className='translate-y-[100%] cls-1'  d="m412.03,81.33h-18.01V3.59h18.01v77.75Z"/>
              <path className='translate-y-[-100%] cls-1' d="m435.55,53.84c0,8.22,5.95,11.99,28.43,11.99,18.61,0,24.28-2.36,24.28-8.41,0-6.42-3.96-7.56-26.36-8.79-30.04-1.51-42.04-6.89-42.04-24.37s15.49-22.57,41.28-22.57,41.75,7.37,41.75,26.55h-17.76c0-8.6-7.56-10.68-25.98-10.68s-21.64,1.89-21.64,7.65c0,6.05,4.15,7.08,24.28,8.41,27.2,1.7,44.02,3.31,44.02,23.05,0,20.78-17.47,25.03-42.98,25.03-28.24,0-45.15-5.48-45.15-27.87h17.85,0Z"/>
            </clipPath>
          </defs>
          <foreignObject x="0" y="0" width="100%" height="100%" style={{ clipPath: 'url(#clipPath)'}} className='webkitclip'>
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', backgroundColor: 'rgba(255, 255, 255, 0.01)' }}>
      {showYoyoVideo && <YoyoVideo activeVideo={activeVideo} toggleVideo={toggleVideo} />}
    </div>
  </foreignObject>

            <path stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5" strokeLinejoin="round" strokeLinecap="round" fill="none" className='translate-y-[-100%] cls-1' d="m54.31,38.12l42.48,43.21h-24.94l-30.81-32.26-21.52,17.36v14.9H1.5V3.59h18.01v40.29L69.48,3.59h27.31l-42.48,34.53Z"/>
            <path stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5" strokeLinejoin="round" strokeLinecap="round" fill="none" className='translate-y-[-100%] cls-1' d="m177.47,41.61c0-25.88,13.08-40.11,43.52-40.11s43.52,14.32,43.52,40.11-13.18,40.29-43.52,40.29-43.52-14.32-43.52-40.29Zm69.31,0c0-15.83-7.11-23.23-25.69-23.23s-25.69,7.3-25.69,23.23,7.21,23.42,25.69,23.42,25.69-7.49,25.69-23.42Z"/>
            <path stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5" strokeLinejoin="round" strokeLinecap="round" fill="none" className='translate-y-[100%] cls-1' d="m360.83,3.59v77.75h-24.27l-47.78-58.5v58.5h-18.01V3.59h24.18l47.88,58.69V3.59h18.01Z"/>
            <path stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5" strokeLinejoin="round" strokeLinecap="round" fill="none" className='translate-y-[-100%] cls-1' d="m386.43,81.33h-18.01V3.59h18.01v77.75Z"/>
            <path stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5" strokeLinejoin="round" strokeLinecap="round" fill="none" className='translate-x-[-50%] opacity-0 cls-1' d="m102.95,52.89v-19.91h69.21v19.91h-69.21Z"/>
            <path stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5" strokeLinejoin="round" strokeLinecap="round" fill="none" className='translate-y-[-100%] cls-1' d="m102.95,23.5V3.59h69.21v19.91h-69.21Z"/>
            <path stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5" strokeLinejoin="round" strokeLinecap="round" fill="none" className='translate-y-[100%] cls-1' d="m102.95,81.33v-19.91h69.21v19.91h-69.21Z"/>
            <path stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5" strokeLinejoin="round" strokeLinecap="round" fill="none" className='translate-y-[100%] cls-1' d="m412.03,81.33h-18.01V3.59h18.01v77.75Z"/>
            <path stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5" strokeLinejoin="round" strokeLinecap="round" fill="none" className='translate-y-[-100%] cls-1' d="m435.55,53.84c0,8.22,5.95,11.99,28.43,11.99,18.61,0,24.28-2.36,24.28-8.41,0-6.42-3.96-7.56-26.36-8.79-30.04-1.51-42.04-6.89-42.04-24.37s15.49-22.57,41.28-22.57,41.75,7.37,41.75,26.55h-17.76c0-8.6-7.56-10.68-25.98-10.68s-21.64,1.89-21.64,7.65c0,6.05,4.15,7.08,24.28,8.41,27.2,1.7,44.02,3.31,44.02,23.05,0,20.78-17.47,25.03-42.98,25.03-28.24,0-45.15-5.48-45.15-27.87h17.85,0Z"/>
            
          
            <path stroke="white" strokeWidth="0.5" strokeLinejoin="round" strokeLinecap="round" fill="none" className='animated translate-y-[-100%] cls-1' d="m54.31,38.12l42.48,43.21h-24.94l-30.81-32.26-21.52,17.36v14.9H1.5V3.59h18.01v40.29L69.48,3.59h27.31l-42.48,34.53Z"/>
            <path stroke="white" strokeWidth="0.5" strokeLinejoin="round" strokeLinecap="round" fill="none" className='animated translate-y-[-100%] cls-1' d="m177.47,41.61c0-25.88,13.08-40.11,43.52-40.11s43.52,14.32,43.52,40.11-13.18,40.29-43.52,40.29-43.52-14.32-43.52-40.29Zm69.31,0c0-15.83-7.11-23.23-25.69-23.23s-25.69,7.3-25.69,23.23,7.21,23.42,25.69,23.42,25.69-7.49,25.69-23.42Z"/>
            <path stroke="white" strokeWidth="0.5" strokeLinejoin="round" strokeLinecap="round" fill="none" className='animated translate-y-[100%] cls-1' d="m360.83,3.59v77.75h-24.27l-47.78-58.5v58.5h-18.01V3.59h24.18l47.88,58.69V3.59h18.01Z"/>
            <path stroke="white" strokeWidth="0.5" strokeLinejoin="round" strokeLinecap="round" fill="none" className='animated translate-y-[-100%] cls-1' d="m386.43,81.33h-18.01V3.59h18.01v77.75Z"/>
            <path stroke="white" strokeWidth="0.5" strokeLinejoin="round" strokeLinecap="round" fill="none" className='animated translate-x-[-50%] opacity-0 cls-1' d="m102.95,52.89v-19.91h69.21v19.91h-69.21Z"/>
            <path stroke="white" strokeWidth="0.5" strokeLinejoin="round" strokeLinecap="round" fill="none" className='animated translate-y-[-100%] cls-1' d="m102.95,23.5V3.59h69.21v19.91h-69.21Z"/>
            <path stroke="white" strokeWidth="0.5" strokeLinejoin="round" strokeLinecap="round" fill="none" className='animated translate-y-[100%] cls-1' d="m102.95,81.33v-19.91h69.21v19.91h-69.21Z"/>
            <path stroke="white" strokeWidth="0.5" strokeLinejoin="round" strokeLinecap="round" fill="none" className='animated translate-y-[100%] cls-1' d="m412.03,81.33h-18.01V3.59h18.01v77.75Z"/>
            <path stroke="white" strokeWidth="0.5" strokeLinejoin="round" strokeLinecap="round" fill="none" className='animated translate-y-[-100%] cls-1' d="m435.55,53.84c0,8.22,5.95,11.99,28.43,11.99,18.61,0,24.28-2.36,24.28-8.41,0-6.42-3.96-7.56-26.36-8.79-30.04-1.51-42.04-6.89-42.04-24.37s15.49-22.57,41.28-22.57,41.75,7.37,41.75,26.55h-17.76c0-8.6-7.56-10.68-25.98-10.68s-21.64,1.89-21.64,7.65c0,6.05,4.15,7.08,24.28,8.41,27.2,1.7,44.02,3.31,44.02,23.05,0,20.78-17.47,25.03-42.98,25.03-28.24,0-45.15-5.48-45.15-27.87h17.85,0Z"/>
            
          
        </svg>
      </div>
      
    </div>
  );
};

export default Hero5;
