import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import svg4everybody from 'svg4everybody';
import HeroVideo from './HeroVideo';

const Hero5 = ({ activeVideo, toggleVideo, cycleVideo }) => {
  const containerRef = useRef(null);
  const firsttext = useRef(null);
  const secondtext = useRef(null);
  const thirdtext = useRef(null);
  const fourthtext = useRef(null);
  const svgRef = useRef(null);
  const svgContainer = useRef(null);
  const pathK = "m54.31,38.12l42.48,43.21h-24.94l-30.81-32.26-21.52,17.36v14.9H1.5V3.59h18.01v40.29L69.48,3.59h27.31l-42.48,34.53Z";
  const pathO = "m177.47,41.61c0-25.88,13.08-40.11,43.52-40.11s43.52,14.32,43.52,40.11-13.18,40.29-43.52,40.29-43.52-14.32-43.52-40.29Zm69.31,0c0-15.83-7.11-23.23-25.69-23.23s-25.69,7.3-25.69,23.23,7.21,23.42,25.69,23.42,25.69-7.49,25.69-23.42Z";
  const pathN = "m360.83,3.59v77.75h-24.27l-47.78-58.5v58.5h-18.01V3.59h24.18l47.88,58.69V3.59h18.01Z";
  const pathI1 = "m386.43,81.33h-18.01V3.59h18.01v77.75Z";
  const pathEMiddle = "m102.95,52.89v-19.91h69.21v19.91h-69.21Z";
  const pathETop = "m102.95,23.5V3.59h69.21v19.91h-69.21Z";
  const pathEBottom = "m102.95,81.33v-19.91h69.21v19.91h-69.21Z";
  const pathI2 = "m412.03,81.33h-18.01V3.59h18.01v77.75Z";
  const pathS = "m435.55,53.84c0,8.22,5.95,11.99,28.43,11.99,18.61,0,24.28-2.36,24.28-8.41,0-6.42-3.96-7.56-26.36-8.79-30.04-1.51-42.04-6.89-42.04-24.37s15.49-22.57,41.28-22.57,41.75,7.37,41.75,26.55h-17.76c0-8.6-7.56-10.68-25.98-10.68s-21.64,1.89-21.64,7.65c0,6.05,4.15,7.08,24.28,8.41,27.2,1.7,44.02,3.31,44.02,23.05,0,20.78-17.47,25.03-42.98,25.03-28.24,0-45.15-5.48-45.15-27.87h17.85,0Z";
  const [showHeroVideo, setShowHeroVideo] = useState(false);
  const [shouldRenderHeroVideo, setShouldRenderHeroVideo] = useState(true); // Default to true, meaning it renders on non-iOS devices

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    console.log('User Agent:', userAgent); // Debugging purpose to check user agent string

    const isIOS = /iphone|ipad|ipod|ios/.test(userAgent);

    if (isIOS) {
      setShouldRenderHeroVideo(false); // Disable rendering on iOS devices
    }
  }, []);

  useEffect(() => {
    svg4everybody();
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
      // Mount the HeroVideo component at this point in the timeline
      setShowHeroVideo(true);
    }, "-=1.25");
  };

  const reverseSvgPaths = () => {
    const svgPaths = svgRef.current.querySelectorAll('path');
    
    gsap.to(svgPaths, {
      y: (index, target) => {
        return target.getAttribute('class').includes('translate-y-[-100%]') ? '-150%' : target.getAttribute('class').includes('translate-y-[100%]') ? '150%' : '';
      },
      x: (index, target) => {
        return target.getAttribute('class').includes('translate-x-[-50%]') ? '-250%' : '0';
      },
      opacity: 0,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'bottom 70%',
        scrub: true,
      },
    });
  };

  gsap.to([thirdtext.current, fourthtext.current], {
    scale: 0.25,
    opacity: 0,
    scrollTrigger: {
      trigger: containerRef.current,
        start: 'bottom bottom',
        end: 'bottom top',  
      scrub: true,        
    },
  });

  
  
  animateIntro();


  }, []);

  return (
    <div ref={containerRef} className='h-full w-full left-0 top-0 absolute z-[50] overflow-hidden'>
      <div className='w-[100%] 2xl:w-[90%] h-[auto] absolute bottom-0 left-0 right-0 top-[50%] xl:top-[45%] 2xl:top-[40%] m-auto text-center 2xl:text-left'>
        <div className="overflow-hidden text-[clamp(40px,7vw,115px)] leading-[clamp(35px,6vw,85px)] uppercase font-[monument] text-[#fff] tracking-[0rem] whitespace-nowrap">
          <span ref={firsttext} className='translate-y-[100%] opacity-0 inline-block split2'>Hey There,</span>
        </div>
        <div className="overflow-hidden text-[clamp(40px,7vw,115px)] leading-[clamp(35px,6vw,85px)] uppercase font-[monument] text-[#fff] tracking-[0rem] whitespace-nowrap">
          <span ref={secondtext} className='translate-y-[-100%] opacity-0 inline-block split'>My Name&apos;s</span>
        </div>
        </div>
        <div className='w-[100%] 2xl:w-[90%] h-[auto] absolute bottom-0 left-0 right-0 top-[45%] xl:top-[40%] 2xl:top-[35%] m-auto text-center 2xl:text-left'>
        <div className="overflow-hidden text-[clamp(40px,8vw,125px)] leading-[clamp(35px,6.5vw,90px)] 3xl:text-[clamp(45px,8vw,150px)] 3xl:leading-[clamp(45px,8vw,115px)] uppercase font-[monument] text-[#fff] tracking-[0rem]">
          <span ref={thirdtext} className='translate-y-[120%] inline-block split2'>Creative</span>
        </div>
        <div className="overflow-hidden text-[clamp(40px,8vw,125px)] leading-[clamp(35px,6.5vw,90px)] 3xl:text-[clamp(45px,8vw,150px)] 3xl:leading-[clamp(45px,8vw,115px)] uppercase font-[monument] text-[#fff] tracking-[0rem]">
          <span ref={fourthtext} className='translate-y-[-120%] inline-block split'>Developer</span>
        </div>
      </div>
      {/*<div className='absolute right-0 top-[50%] flex-col w-[20%] text-white'>
        <button className='w-full' onClick={() => toggleVideo(1)}>Video 1</button>
        <button className='w-full' onClick={() => toggleVideo(2)}>Video 2</button>
        <button className='w-full' onClick={() => toggleVideo(3)}>Video 3</button>
      </div>*/}
      <div ref={svgContainer} className='absolute w-[97%] 2xl:w-[90%] h-auto bottom-[5%] md:bottom-[2%] left-0 right-0 mx-auto z-[5]'>
        
      <svg onClick={cycleVideo} ref={svgRef} id="herologo" width="100%" height="100%" viewBox="0 0 507 85" preserveAspectRatio="none" className='cursor-pointer'>

            <path stroke="rgba(255, 255, 255, 0.5)" strokeWidth={shouldRenderHeroVideo && "1" || "3"} strokeLinejoin="round" strokeLinecap="round" fill={shouldRenderHeroVideo && "rgba(255, 255, 255, 1)" || "rgba(255, 255, 255, 1"} className='translate-y-[-100%] cls-1' d={pathK}/>
            <path stroke="rgba(255, 255, 255, 0.5)" strokeWidth={shouldRenderHeroVideo && "1" || "3"} strokeLinejoin="round" strokeLinecap="round" fill={shouldRenderHeroVideo && "rgba(255, 255, 255, 1)" || "rgba(255, 255, 255, 1"} className='translate-y-[-100%] cls-1' d={pathO}/>
            <path stroke="rgba(255, 255, 255, 0.5)" strokeWidth={shouldRenderHeroVideo && "1" || "3"} strokeLinejoin="round" strokeLinecap="round" fill={shouldRenderHeroVideo && "rgba(255, 255, 255, 1)" || "rgba(255, 255, 255, 1"} className='translate-y-[100%] cls-1' d={pathN}/>
            <path stroke="rgba(255, 255, 255, 0.5)" strokeWidth={shouldRenderHeroVideo && "1" || "3"} strokeLinejoin="round" strokeLinecap="round" fill={shouldRenderHeroVideo && "rgba(255, 255, 255, 1)" || "rgba(255, 255, 255, 1"} className='translate-y-[-100%] cls-1' d={pathI1}/>
            <path stroke="rgba(255, 255, 255, 0.5)" strokeWidth={shouldRenderHeroVideo && "1" || "3"} strokeLinejoin="round" strokeLinecap="round" fill={shouldRenderHeroVideo && "rgba(255, 255, 255, 1)" || "rgba(255, 255, 255, 1"} className='translate-x-[-50%] opacity-0 cls-1' d={pathEMiddle}/>
            <path stroke="rgba(255, 255, 255, 0.5)" strokeWidth={shouldRenderHeroVideo && "1" || "3"} strokeLinejoin="round" strokeLinecap="round" fill={shouldRenderHeroVideo && "rgba(255, 255, 255, 1)" || "rgba(255, 255, 255, 1"} className='translate-y-[-100%] cls-1' d={pathETop}/>
            <path stroke="rgba(255, 255, 255, 0.5)" strokeWidth={shouldRenderHeroVideo && "1" || "3"} strokeLinejoin="round" strokeLinecap="round" fill={shouldRenderHeroVideo && "rgba(255, 255, 255, 1)" || "rgba(255, 255, 255, 1"} className='translate-y-[100%] cls-1' d={pathEBottom}/>
            <path stroke="rgba(255, 255, 255, 0.5)" strokeWidth={shouldRenderHeroVideo && "1" || "3"} strokeLinejoin="round" strokeLinecap="round" fill={shouldRenderHeroVideo && "rgba(255, 255, 255, 1)" || "rgba(255, 255, 255, 1"} className='translate-y-[100%] cls-1' d={pathI2}/>
            <path stroke="rgba(255, 255, 255, 0.5)" strokeWidth={shouldRenderHeroVideo && "1" || "3"} strokeLinejoin="round" strokeLinecap="round" fill={shouldRenderHeroVideo && "rgba(255, 255, 255, 1)" || "rgba(255, 255, 255, 1"} className='translate-y-[-100%] cls-1' d={pathS}/>
            
          
            <path stroke="rgba(255, 255, 255, 0.75)" strokeWidth={shouldRenderHeroVideo && "1" || "3"} strokeLinejoin="round" strokeLinecap="round" fill="none" className={`${shouldRenderHeroVideo ? 'animated' : 'animated-ios'} translate-y-[-100%] cls-1`} d={pathK}/>
            <path stroke="rgba(255, 255, 255, 0.75)" strokeWidth={shouldRenderHeroVideo && "1" || "3"} strokeLinejoin="round" strokeLinecap="round" fill="none" className={`${shouldRenderHeroVideo ? 'animated' : 'animated-ios'} translate-y-[-100%] cls-1`} d={pathO}/>
            <path stroke="rgba(255, 255, 255, 0.75)" strokeWidth={shouldRenderHeroVideo && "1" || "3"} strokeLinejoin="round" strokeLinecap="round" fill="none" className={`${shouldRenderHeroVideo ? 'animated' : 'animated-ios'} translate-y-[100%] cls-1`} d={pathN}/>
            <path stroke="rgba(255, 255, 255, 0.75)" strokeWidth={shouldRenderHeroVideo && "1" || "3"} strokeLinejoin="round" strokeLinecap="round" fill="none" className={`${shouldRenderHeroVideo ? 'animated' : 'animated-ios'} translate-y-[-100%] cls-1`} d={pathI1}/>
            <path stroke="rgba(255, 255, 255, 0.75)" strokeWidth={shouldRenderHeroVideo && "1" || "3"} strokeLinejoin="round" strokeLinecap="round" fill="none" className={`${shouldRenderHeroVideo ? 'animated' : 'animated-ios'} translate-x-[-50%] opacity-0 cls-1`} d={pathEMiddle}/>
            <path stroke="rgba(255, 255, 255, 0.75)" strokeWidth={shouldRenderHeroVideo && "1" || "3"} strokeLinejoin="round" strokeLinecap="round" fill="none" className={`${shouldRenderHeroVideo ? 'animated' : 'animated-ios'} translate-y-[-100%] cls-1`} d={pathETop}/>
            <path stroke="rgba(255, 255, 255, 0.75)" strokeWidth={shouldRenderHeroVideo && "1" || "3"} strokeLinejoin="round" strokeLinecap="round" fill="none" className={`${shouldRenderHeroVideo ? 'animated' : 'animated-ios'} translate-y-[100%] cls-1`} d={pathEBottom}/>
            <path stroke="rgba(255, 255, 255, 0.75)" strokeWidth={shouldRenderHeroVideo && "1" || "3"} strokeLinejoin="round" strokeLinecap="round" fill="none" className={`${shouldRenderHeroVideo ? 'animated' : 'animated-ios'} translate-y-[100%] cls-1`} d={pathI2}/>
            <path stroke="rgba(255, 255, 255, 0.75)" strokeWidth={shouldRenderHeroVideo && "1" || "3"} strokeLinejoin="round" strokeLinecap="round" fill="none" className={`${shouldRenderHeroVideo ? 'animated' : 'animated-ios'} translate-y-[-100%] cls-1`} d={pathS}/>
            
            <defs>
            <clipPath id="clipPath">
              <path className='translate-y-[-100%] cls-1' d={pathK}/>
              <path className='translate-y-[-100%] cls-1' d={pathO}/>
              <path className='translate-y-[100%] cls-1'  d={pathN}/>
              <path className='translate-y-[-100%] cls-1' d={pathI1}/>
              <path className='translate-x-[-50%] cls-1' d={pathEMiddle}/>
              <path className='translate-y-[-100%] cls-1' d={pathETop}/>
              <path className='translate-y-[100%] cls-1'  d={pathEBottom}/>
              <path className='translate-y-[100%] cls-1'  d={pathI2}/>
              <path className='translate-y-[-100%] cls-1' d={pathS}/>
            </clipPath>
          </defs>
          <foreignObject x="0" y="0" width="100%" height="100%" style={{ clipPath: 'url(#clipPath)', WebkitClipPath: 'url(#clipPath)',}} className='inline-block'>
          <div style={{ width: '100%', height: '100%', overflow: 'hidden', backgroundColor: 'rgba(255, 255, 255, 0)' }}>
            {shouldRenderHeroVideo && showHeroVideo && <HeroVideo activeVideo={activeVideo} toggleVideo={toggleVideo} />}
          </div>
        </foreignObject>
        </svg>
      </div>
      
    </div>
  );
};

export default Hero5;
