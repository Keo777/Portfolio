import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Image from 'next/image';
import svg4everybody from 'svg4everybody';
import HeroVideo from './HeroVideo';

gsap.registerPlugin(ScrollTrigger);

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
  const [isMobile, setIsMobile] = useState(false);

 {/*} useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    console.log('User Agent:', userAgent); // Debugging purpose to check user agent string

    const isIOS = /iphone|ipad|ipod|ios/.test(userAgent);

    if (isIOS) {
      setShouldRenderHeroVideo(false); // Disable rendering on iOS devices
    }
  }, []); */}

  useEffect(() => {
    svg4everybody();
    animateIntro();
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1536);
    };

    // Initial check
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  useEffect(() => {
    // Setup GSAP animation for thirdtext and fourthtext based on isMobile state
    const setupScrollTriggerAnimation = () => {
      const elementsToAnimate = [thirdtext.current, fourthtext.current];

      elementsToAnimate.forEach((element, index) => {
        const animation = gsap.to(element, {
          scale: 0.25,
          x: isMobile ? "0%" : "25%",
          opacity: 0,
          delay: 1 * index,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'bottom bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        // Store the animation in a data attribute for cleanup
        element.animation = animation;
      });
    };

    setupScrollTriggerAnimation();

    // Cleanup ScrollTrigger on component unmount
    return () => {
      // Kill only the ScrollTriggers related to thirdtext and fourthtext
      [thirdtext.current, fourthtext.current].forEach(element => {
        if (element.animation) {
          element.animation.kill();
        }
      });
    };
  }, [isMobile]);

  const animateIntro = () => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.inOut' } });

    tl.to(firsttext.current, {
      y: 0,
      opacity: 1,
      stagger: 0.5,
      duration: 1,
    }, "")
      .to(firsttext.current, {
        clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
        duration: 2
      }, "-=1.25")
      .to(secondtext.current, {
        y: 0,
        opacity: 1,
        stagger: 0.5,
        duration: 1,
      }, "-=1.75")
      .to(secondtext.current, {
        clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
        duration: 2
      }, "-=2")
      .to(svgRef.current.querySelectorAll('path'), {
        y: 0,
        duration: 1,
        stagger: 0.01,
        ease: 'power4.inOut'
      }, "-=1.5")
      .to(svgContainer.current, {
        opacity: 1,
        duration: 1,
        ease: 'power4.inOut'
      }, "<")
      .to(svgRef.current.querySelectorAll('path'), {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.01,
        ease: "back.out(1.7)",
        onComplete: reverseSvgPaths
      }, "-=0.5")
      .to([firsttext.current, secondtext.current], {
        y: "-100%",
        opacity: 0,
        duration: 0.5,
        ease: "expoScale(0.5,7,none)",
      }, "-=.25")
      .to(thirdtext.current, {
        y: 0,
        opacity: 1,
        stagger: 0.5,
        duration: 1.5,
      })
      .to(thirdtext.current, {
        clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
        duration: 1.75
      }, "-=1.45")
      .to(fourthtext.current, {
        y: 0,
        opacity: 1,
        stagger: 0.5,
        duration: 2,
      }, "-=2")
      .to(fourthtext.current, {
        clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
        duration: 2
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


  return (
    <div ref={containerRef} className='h-full w-full left-0 top-0 absolute flex items-center justify-center z-[50] overflow-hidden uppercase font-[monument] text-[#fff] tracking-[0rem] whitespace-nowrap'>
      <div className='w-[100%] 2xl:w-[90%] h-[auto] text-[clamp(40px,7vw,115px)] leading-[clamp(35px,6vw,95px)] absolute bottom-0 left-0 right-0 top-[50%] xl:top-[45%] 2xl:top-[40%] m-auto text-center'>
        <div className="overflow-hidden">
          <span ref={firsttext} className='translate-y-[100%] opacity-0 inline-block split2'>Hey There,</span>
        </div>
        <div className="overflow-hidden">
          <span ref={secondtext} className='translate-y-[-100%] opacity-0 inline-block split'>My Name&apos;s</span>
        </div>
        </div>
        <div className='flex-col w-[97%] 2xl:w-[90%] 2xl:pb-[5%] h-auto absolute text-center 2xl:text-left text-[clamp(45px,7vw,150px)] leading-[clamp(40px,6vw,125px)]'>
        <div className="overflow-hidden">
          <span ref={thirdtext} className='translate-y-[120%] inline-block split2'>Creative</span>
        </div>
        <div className="overflow-hidden">
          <span ref={fourthtext} className='translate-y-[-120%] inline-block split'>Developer</span>
        </div>
      </div>
      {/*<div className='absolute right-0 top-[50%] flex-col w-[20%] text-white'>
        <button className='w-full' onClick={() => toggleVideo(1)}>Video 1</button>
        <button className='w-full' onClick={() => toggleVideo(2)}>Video 2</button>
        <button className='w-full' onClick={() => toggleVideo(3)}>Video 3</button>
      </div>*/}
      <div ref={svgContainer} className='absolute w-[97%] 2xl:w-[90%] h-auto bottom-[12%] md:bottom-[2%] left-0 right-0 mx-auto z-[5] opacity-0'>
        
      <svg onClick={cycleVideo} ref={svgRef} id="herologo" width="100%" height="100%" viewBox="0 0 507 85" preserveAspectRatio="none" className='cursor-pointer overflow-visible'>

            <path stroke="rgba(255, 255, 255, 0.5)" strokeWidth={shouldRenderHeroVideo && "1" || "3"} strokeLinejoin="round" strokeLinecap="round" fill={shouldRenderHeroVideo && "rgba(255, 255, 255, 1)" || "rgba(255, 255, 255, 1"} className='translate-y-[-100%] cls-1' d={pathK}/>
            <path stroke="rgba(255, 255, 255, 0.5)" strokeWidth={shouldRenderHeroVideo && "1" || "3"} strokeLinejoin="round" strokeLinecap="round" fill={shouldRenderHeroVideo && "rgba(255, 255, 255, 1)" || "rgba(255, 255, 255, 1"} className='translate-y-[-100%] cls-1' d={pathO}/>
            <path stroke="rgba(255, 255, 255, 0.5)" strokeWidth={shouldRenderHeroVideo && "1" || "3"} strokeLinejoin="round" strokeLinecap="round" fill={shouldRenderHeroVideo && "rgba(255, 255, 255, 1)" || "rgba(255, 255, 255, 1"} className='translate-y-[100%] cls-1' d={pathN}/>
            <path stroke="rgba(255, 255, 255, 0.5)" strokeWidth={shouldRenderHeroVideo && "1" || "3"} strokeLinejoin="round" strokeLinecap="round" fill={shouldRenderHeroVideo && "rgba(255, 255, 255, 1)" || "rgba(255, 255, 255, 1"} className='translate-y-[-100%] cls-1' d={pathI1}/>
            <path stroke="rgba(255, 255, 255, 0.5)" strokeWidth={shouldRenderHeroVideo && "1" || "3"} strokeLinejoin="round" strokeLinecap="round" fill={shouldRenderHeroVideo && "rgba(255, 255, 255, 1)" || "rgba(255, 255, 255, 1"} className='translate-x-[-50%] cls-1' d={pathEMiddle}/>
            <path stroke="rgba(255, 255, 255, 0.5)" strokeWidth={shouldRenderHeroVideo && "1" || "3"} strokeLinejoin="round" strokeLinecap="round" fill={shouldRenderHeroVideo && "rgba(255, 255, 255, 1)" || "rgba(255, 255, 255, 1"} className='translate-y-[-100%] cls-1' d={pathETop}/>
            <path stroke="rgba(255, 255, 255, 0.5)" strokeWidth={shouldRenderHeroVideo && "1" || "3"} strokeLinejoin="round" strokeLinecap="round" fill={shouldRenderHeroVideo && "rgba(255, 255, 255, 1)" || "rgba(255, 255, 255, 1"} className='translate-y-[100%] cls-1' d={pathEBottom}/>
            <path stroke="rgba(255, 255, 255, 0.5)" strokeWidth={shouldRenderHeroVideo && "1" || "3"} strokeLinejoin="round" strokeLinecap="round" fill={shouldRenderHeroVideo && "rgba(255, 255, 255, 1)" || "rgba(255, 255, 255, 1"} className='translate-y-[100%] cls-1' d={pathI2}/>
            <path stroke="rgba(255, 255, 255, 0.5)" strokeWidth={shouldRenderHeroVideo && "1" || "3"} strokeLinejoin="round" strokeLinecap="round" fill={shouldRenderHeroVideo && "rgba(255, 255, 255, 1)" || "rgba(255, 255, 255, 1"} className='translate-y-[-100%] cls-1' d={pathS}/>
            
          
            <path stroke="rgba(255, 255, 255, 0.75)" strokeWidth={shouldRenderHeroVideo && "1" || "3"} strokeLinejoin="round" strokeLinecap="round" fill="none" className={`${shouldRenderHeroVideo ? 'animated' : 'animated-ios'} translate-y-[-100%] cls-1`} d={pathK}/>
            <path stroke="rgba(255, 255, 255, 0.75)" strokeWidth={shouldRenderHeroVideo && "1" || "3"} strokeLinejoin="round" strokeLinecap="round" fill="none" className={`${shouldRenderHeroVideo ? 'animated' : 'animated-ios'} translate-y-[-100%] cls-1`} d={pathO}/>
            <path stroke="rgba(255, 255, 255, 0.75)" strokeWidth={shouldRenderHeroVideo && "1" || "3"} strokeLinejoin="round" strokeLinecap="round" fill="none" className={`${shouldRenderHeroVideo ? 'animated' : 'animated-ios'} translate-y-[100%] cls-1`} d={pathN}/>
            <path stroke="rgba(255, 255, 255, 0.75)" strokeWidth={shouldRenderHeroVideo && "1" || "3"} strokeLinejoin="round" strokeLinecap="round" fill="none" className={`${shouldRenderHeroVideo ? 'animated' : 'animated-ios'} translate-y-[-100%] cls-1`} d={pathI1}/>
            <path stroke="rgba(255, 255, 255, 0.75)" strokeWidth={shouldRenderHeroVideo && "1" || "3"} strokeLinejoin="round" strokeLinecap="round" fill="none" className={`${shouldRenderHeroVideo ? 'animated' : 'animated-ios'} translate-x-[-50%] cls-1`} d={pathEMiddle}/>
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
          <foreignObject x="0" y="0" width="100%" height="100%" style={{ clipPath: 'url(#clipPath)', WebkitClipPath: 'url(#clipPath)',}} className='hidden xl:block overflow-visible'>
          <div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0)' }}>
            {shouldRenderHeroVideo && showHeroVideo && <HeroVideo activeVideo={activeVideo} containerRef={containerRef} toggleVideo={toggleVideo} />}
          </div>
        </foreignObject>
        </svg>
      </div>
      
    </div>
  );
};

export default Hero5;
