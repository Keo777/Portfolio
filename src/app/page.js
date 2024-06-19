'use client';
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import BgLines1 from "./bglines";
import dynamic from 'next/dynamic';
import styles from './components/ToggleSwitch.module.css';
import HologramImg from "./components/HologramImg";

const DynamicHero5 = dynamic(() => import('./Hero5'), { ssr: false });


// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const section1 = useRef(null);
  const nav = useRef(null);
  const xlMenu = useRef(null);
  const svgRef = useRef(null);
  const hologramRef = useRef([]);
  const tint = useRef(null);
  const [activeVideo, setActiveVideo] = useState(3);
  const menuContainer = useRef(null);
  const menuBtn = useRef(null);
  const menu = useRef(null);
  const [menuActive, setMenuActive] = useState(false);

  const handleMenuHover = (e) => {
    if (!menuActive) {
      setMenuActive(true);
    }
  }

  const handleMenuLeave = (e) => {
    if (menuActive) {
      setMenuActive(false);
    }
  }


  const handleMenuClick = (e) => {
    // Prevent default behavior and stop propagation to avoid multiple toggles
    e.preventDefault();
    e.stopPropagation();
    setMenuActive(prevState => !prevState);
    console.log("Menu active state toggled to:", !menuActive);
  };

  const toggleVideo = (videoIndex) => {
    setActiveVideo(videoIndex);
  };

  const cycleVideo = () => {
    setActiveVideo((prevVideo) => (prevVideo % 3) + 1);
  };

  useEffect(() => {
    const animateIntro = async () => {
     
      const tl = gsap.timeline({defaults: {ease: 'power4.inOut'},  });

      tl
        .to(hologramRef.current[0].current, {
          y: 0,
          x: 0,
          duration: 1.5,
          delay: 0.5,
        })
        .to(hologramRef.current[0].current, {
          opacity: 1,
          duration: 2,
        }, "<")
        .to(hologramRef.current[0].current, {
          x: "4%",
          opacity: 0.75,
          duration: 4,
        }, "-=.5")
        .to(avatar2.current, {
          x: "0%",
          opacity: 0.40,
          duration: 4,
        }, "<")
        
        .to(avatar3.current, {
          x: "-5%",
          opacity: 0.20,
          duration: 4,
        }, "-=4")
        .to(avatar4.current, {
          x: "-10%",
          opacity: 0.1,
          duration: 4,
          
        }, "-=4")
        .to(avatar5.current, {
          x: "-15%",
          opacity: 0.05,
          duration: 4,
          onComplete: setupScrollAnimations,
        }, "-=4")
        .to(tint.current, {
          opacity: '10%',
          duration: 2.5,
        }, "-=3")
        .to(nav.current, {
          y: 0,
          x: 0,
          duration: 2,
        }, "-=2.5")

    }

    const setupScrollAnimations = () => {


      // Adding ScrollTrigger animation for avatar2, avatar3, and avatar4
      gsap.to(hologramRef.current[0].current, {
        x: "10%",
        opacity: 0,
        scrollTrigger: {
          trigger: hologramRef.current[0].current,
          start: "top 9%", // start when the top of the element hits the bottom of the viewport
          end: "bottom 20%",   // end when the bottom of the element hits the top of the viewport
          scrub: true,         // smooth scrubbin, // prevents jumps by starting from current position
        },
      });

      gsap.to(avatar2.current, {
        x: "-5%",
        opacity: 0.0,
        scrollTrigger: {
          trigger: hologramRef.current[0].current,
          start: "top 9%", // start when the top of the element hits the bottom of the viewport
          end: "bottom 20%",   // end when the bottom of the element hits the top of the viewport
          scrub: true,         // smooth scrubbin, // prevents jumps by starting from current position
        },
      });

      gsap.to(avatar3.current, {
        x: "-20%",
        opacity: 0.0,
        scrollTrigger: {
          trigger: hologramRef.current[0].current,
          start: "top 9%",
          end: "bottom 20%",
          scrub: true,
        },
      });

      gsap.to(avatar4.current, {
        x: "-35%",
        opacity: 0,
        scrollTrigger: {
          trigger: hologramRef.current[0].current,
          start: "top 9%",
          end: "bottom 20%",
          scrub: true,
        },
      });

      gsap.to(avatar5.current, {
        x: "-50%",
        opacity: 0,
        scrollTrigger: {
          trigger: hologramRef.current[0].current,
          start: "top 9%",
          end: "bottom 20%",
          scrub: true,
        },
      });

      const svgPaths = svgRef.current.querySelectorAll('path');
    gsap.to(svgPaths, {
      y: 0,
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: section1.current,
        start: 'bottom 50%',
        toggleActions: 'play none reverse reverse',
      },
    });

      gsap.to(xlMenu.current, {
        y: "-5rem",
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: section1.current,
          start: 'bottom 50%',
          toggleActions: 'play none reverse reverse',
        },
      });

      gsap.to(menuContainer.current, {
        y: 0,
        x: 0,
        display: 'block',
        opacity: 1,
        duration: 1,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: section1.current,
          start: 'bottom 50%',
          toggleActions: 'play none reverse reverse',
        },
      });
    };

    animateIntro();

    

  }, []);

    // Colors corresponding to each video index
    const colors = {
      1: "radial-gradient(circle, #ff2727, #ff2086, #df5ed2, #908bfd, #00a7ff)",
      2: "radial-gradient(circle, #ff9727, #f0614f, #c43f6a, #833471, #3d2d62)", 
      3: "radial-gradient(circle, #2786ff, #4469c0, #434e86, #363650, #212121)", 
    };
  
    useEffect(() => {
      // Change the background color of the tint div
      if (tint.current) {
        tint.current.style.backgroundImage = colors[activeVideo] || "radial-gradient(circle, #2786ff, #4469c0, #434e86, #363650, #212121)";
      }
    }, [activeVideo]);

  return (
    <main id="main" className='bg-[#fff] overflow-hidden'>
      <div ref={nav} className='translate-y-[-100%] flex header w-[100%] h-[clamp(50px,5vw,100px)] fixed z-[20] top-0 justify-between text-[white] font-[monument] mix-blend-difference'>
        <div className='logo cursor-pointer m-[clamp(10px,1vw,25px)] w-[auto] uppercase'>
        <svg id="herologo" ref={svgRef} width="100%" height="100%" viewBox="0 0 532.16 75.54" preserveAspectRatio="xMinYMin meet" className='cursor-pointer'>
            <path className='translate-y-[-100%] cls-1' stroke="none" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" fill="rgba(255, 255, 255, 1)"  d="m55.73,34.37l44.76,40.57h-26.28l-32.51-30.35-22.69,16.37v13.97H0V1.94h19v37.86L71.67,1.94h28.82l-44.76,32.43Z"/>
            <path className='translate-y-[-100%] cls-1' stroke="none" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" fill="rgba(255, 255, 255, 1)"  d="m185.6,37.86C185.6,13.64,199.38.38,231.53.38s45.93,13.36,45.93,37.47-13.88,37.68-45.93,37.68-45.93-13.36-45.93-37.68Zm73.07,0c0-14.82-7.52-21.71-27.14-21.71s-27.14,6.79-27.14,21.71,7.62,21.92,27.14,21.92,27.14-6.99,27.14-21.92Z"/>
            <path className='translate-y-[100%] cls-1'  stroke="none" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" fill="rgba(255, 255, 255, 1)"  d="m379,1.94v73h-25.65l-50.35-54.75v54.75h-19V1.94h25.55l50.45,54.85V1.94h19Z"/>
            <path className='translate-y-[-100%] cls-1' stroke="none" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" fill="rgba(255, 255, 255, 1)"  d="m406,74.94h-19V1.94h19v73Z"/>
            <path className='translate-x-[-50%] cls-1'  stroke="none" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" fill="rgba(255, 255, 255, 1)"  d="m106.55,48.24v-19h73v19h-73Z"/>
            <path className='translate-y-[-100%] cls-1' stroke="none" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" fill="rgba(255, 255, 255, 1)"  d="m106.55,20.94V1.94h73v19h-73Z"/>
            <path className='translate-y-[100%] cls-1'  stroke="none" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" fill="rgba(255, 255, 255, 1)"  d="m106.55,75.54v-19h73v19h-73Z"/>
            <path className='translate-y-[100%] cls-1'  stroke="none" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" fill="rgba(255, 255, 255, 1)"  d="m433,74.94h-19V1.94h19v73Z"/>
            <path className='translate-y-[-100%] cls-1' stroke="none" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" fill="rgba(255, 255, 255, 1)"  d="m457.65,48.94c0,7.72,6.26,11.27,30.05,11.27,19.72,0,25.67-2.19,25.67-7.93,0-6.05-4.17-7.1-27.86-8.24-31.83-1.46-44.45-6.47-44.45-22.85S457.44,0,484.78,0s44.24,6.89,44.24,24.94h-18.78c0-8.03-8.04-10.02-27.55-10.02-18.47,0-22.85,1.77-22.85,7.2s4.38,6.68,25.67,7.93c28.8,1.57,46.64,3.13,46.64,21.6,0,19.51-18.47,23.48-45.5,23.48-29.95,0-47.79-5.11-47.79-26.19h18.78Z"/>
            
          </svg>
        </div>
        <div ref={xlMenu} className="hidden xl:flex w-auto h-auto absolute top-0 left-0 right-0 mx-auto items-center justify-center">
          <ul className='flex uppercase text-[clamp(8px,1.5vw,20px)]'>
            <li className='mx-[clamp(10px,2vw,40px)] my-[2rem]'>Home</li>
            <li className='mx-[clamp(10px,2vw,40px)] my-[2rem]'>About</li>
            <li className='mx-[clamp(10px,2vw,40px)] my-[2rem]'>Services</li>
            <li className='mx-[clamp(10px,2vw,40px)] my-[2rem]'>Work</li>
            <li className='mx-[clamp(10px,2vw,40px)] my-[2rem]'>Contact</li>
          </ul>
        </div>
        
        </div>
        <div ref={menuContainer} onMouseOver={handleMenuHover} onClick={handleMenuClick} onMouseLeave={handleMenuLeave} className={`${menuActive ? `${styles.menucontaineractive}` : `${styles.menucontainer}`} xl:hidden xl:translate-x-[150px] fixed top-0 right-0 w-auto h-[auto] z-[50]`}>
        <div ref={menuBtn} className='menu m-[1.5rem] 2xl:m-[2.75rem] absolute top-0 right-0 z-[51]' >
        <label className={`${styles.toggle}`}>
        <input className={`${menuActive && `${styles.active}`} ${styles.toggle}`} type="checkbox" onClick={(e) => e.stopPropagation()} />
        <div>
          <div>
            <span></span>
            <span></span>
          </div>
          <svg>
            <use xlinkHref="#path"></use>
          </svg>
          <svg>
            <use xlinkHref="#path"></use>
          </svg>
        </div>
      </label>

      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
        <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" id="path">
          <path d="M22,22 L2,22 C2,11 11,2 22,2 C33,2 42,11 42,22"></path>
        </symbol>
      </svg>
        </div>
  
      <nav ref={menu} className={`${menuActive && `${styles.active}`} ${styles.nav}`}>
        <ul>
          <li>element one</li>
          <li>element two</li>
          <li>element three</li>
          <li>element four</li>
        </ul>
      </nav>
      </div>
      
      
      <div ref={section1} id="section1" className='h-[calc(100vh-60px)] md:h-screen w-full relative bg-[#111]'>
      <BgLines1 />
      {/*<Image src={'/images/bg-img7.jpg'} width={3072} height={1856} className='w-full h-full absolute top-0 left-0 z-[0]' />*/}
      <div ref={tint} className='hidden md:inline-block bg-[#145363] opacity-0 w-full h-full absolute z-[5] mix-blend-color'></div>
      <div className='hidden md:inline-block noise w-[400vw] h-[400vh] left-[-100vw] top-[-100vh] mx-auto fixed z-[5]'></div>
       <div className=' h-full w-full left-0 right-0 mx-auto absolute overflow-hidden'>
       <HologramImg ref={hologramRef} numImages={5} src={'/images/keoniis-59.webp'} translateX={'0%'} opacity={1} width={1400} height={1473} />
      
        <DynamicHero5 activeVideo={activeVideo} toggleVideo={toggleVideo} cycleVideo={cycleVideo} />
        
      </div>
      </div>
      <div id="section2" className='w-[100%] h-[100vh] bg-[#fff]'>
      
      </div>
      
      
    </main>
  );
}
