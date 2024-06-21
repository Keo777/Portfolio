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
  const hologramRef = useRef(null);
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
     
      const svgPaths = svgRef.current.querySelectorAll('path');
      const tl = gsap.timeline({defaults: {ease: 'power4.inOut'},  });
      

      tl
        
        .to(hologramRef.current.avatars[0].current, {
          x: "-3%",
          opacity: 0.9,
          duration: 4,
        }, "+=2.5")
        .to(hologramRef.current.avatars[1].current, {
          x: "0%",
          opacity: 0.50,
          duration: 4,
        }, "<")
        
        .to(hologramRef.current.avatars[2].current, {
          x: "3%",
          opacity: 0.35,
          duration: 4,
        }, "-=4")
        .to(hologramRef.current.avatars[3].current, {
          x: "6%",
          opacity: 0.20,
          duration: 4,
          
        }, "-=4")
        .to(hologramRef.current.avatars[4].current, {
          x: "9%",
          opacity: 0.05,
          duration: 4,
          onComplete: setupScrollAnimations,
        }, "-=4")
        .to(tint.current, {
          opacity: '10%',
          duration: 2.5,
        }, "-=3")
        .to(menuContainer.current, {
          y: 0,
          x: 0,
          duration: 1,
          ease: 'power4.inOut',
        }, "<")
        
      .to(svgPaths, {
      y: 0,
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power4.inOut',
      }, "<");

    };
  

    const setupScrollAnimations = () => {


      // Adding ScrollTrigger animation for avatar2, avatar3, and avatar4
      gsap.to(hologramRef.current.avatars[0].current, {
        x: "-20%",
        opacity: 0,
        scrollTrigger: {
          trigger: section1.current,
          start: "bottom 90%", // start when the top of the element hits the bottom of the viewport
          end: "bottom 20%",   // end when the bottom of the element hits the top of the viewport
          scrub: true,         // smooth scrubbin, // prevents jumps by starting from current position
        },
      });

      gsap.to(hologramRef.current.avatars[1].current, {
        x: "0%",
        opacity: 0.0,
        scrollTrigger: {
          trigger: section1.current,
          start: "bottom 90%", // start when the top of the element hits the bottom of the viewport
          end: "bottom 20%",   // end when the bottom of the element hits the top of the viewport
          scrub: true,         // smooth scrubbin, // prevents jumps by starting from current position
        },
      });

      gsap.to(hologramRef.current.avatars[2].current, {
        x: "20%",
        opacity: 0.0,
        scrollTrigger: {
          trigger: section1.current,
          start: "bottom 90%",
          end: "bottom 20%",
          scrub: true,
        },
      });

      gsap.to(hologramRef.current.avatars[3].current, {
        x: "40%",
        opacity: 0,
        scrollTrigger: {
          trigger: section1.current,
          start: "bottom 90%",
          end: "bottom 20%",
          scrub: true,
        },
      });

      gsap.to(hologramRef.current.avatars[4].current, {
        x: "60%",
        opacity: 0,
        scrollTrigger: {
          trigger: section1.current,
          start: "bottom 90%",
          end: "bottom 20%",
          scrub: true,
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

    useEffect(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.inOut' } });
    
      if (menuActive) {
        // Animate menu to translateX(0) when menuActive is true
        tl.to(menu.current, {
          translateX: 0,
          duration: 1,
          ease: 'power4.inOut'
        });
      } else {
        // Animate menu to translateX(100%) when menuActive is false
        tl.to(menu.current, {
          translateX: '100%',
          duration: 1,
          ease: 'power4.inOut'
        });
      }
    }, [menuActive]);

    useEffect(() => {
      const avatar1 = hologramRef.current.avatars[0];
      const avatar2 = hologramRef.current.avatars[1];
      const avatar3 = hologramRef.current.avatars[2];
      const avatar4 = hologramRef.current.avatars[3];
      const avatar5 = hologramRef.current.avatars[4];
      // Mouse movement effect for 3D tilt
      const maxRotate = 15; // Maximum rotation in degrees

      const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const deltaX = centerX - mouseX;
      const deltaY = centerY - mouseY;
      const rotateX = Math.max(-maxRotate, Math.min(maxRotate, deltaY * 0.08)); // Clamp rotationX
      const rotateY = Math.max(-maxRotate, Math.min(maxRotate, deltaX * 0.08)); // Clamp rotationY

      animateAvatars(rotateX, rotateY);
      };

      const handleDeviceOrientation = (e) => {
      const rotateX = Math.max(-maxRotate, Math.min(maxRotate, e.beta * 0.08)); // Clamp rotationX from beta
      const rotateY = Math.max(-maxRotate, Math.min(maxRotate, e.gamma * 0.08)); // Clamp rotationY from gamma

      animateAvatars(rotateX, rotateY);
      };

      const animateAvatars = (rotateX, rotateY) => {
      const avatars = [avatar1.current, avatar2.current, avatar3.current, avatar4.current, avatar5.current];
      
      avatars.forEach((avatar, index) => {
      const scale = (index + 1) / avatars.length; // Scale factor from 0.2 to 1
      const scaledRotateX = rotateX * scale;
      const scaledRotateY = rotateY * scale;
      
      gsap.to(avatar, {
        rotationX: scaledRotateX,
        rotationY: -scaledRotateY,
        delay: 0.1 * index,
        transformPerspective: 1200,
        ease: "power2.out",
        duration: .5,
      });

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
    <main id="main" className='bg-[#fff] overflow-hidden'>
      <div ref={nav} className='flex header w-[100%] min-h-[4rem] px-[5%] h-[clamp(2rem,6vw,5rem)] fixed z-[100] top-[0] left-[0] justify-between items-center border-b-[1px] border-[#ffffff1c] font-[monument] mix-blend-difference'>
        <div className='logo cursor-pointer w-[auto] uppercase my-[1rem] mix-blend-difference z-[98]'>
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
        <div ref={xlMenu} className="hidden w-auto h-auto absolute top-0 left-0 right-0 mx-auto items-center justify-center">
          <ul className='flex uppercase text-[clamp(8px,1.5vw,20px)]'>
            <li className='mx-[clamp(10px,2vw,40px)] my-[2rem]'>Home</li>
            <li className='mx-[clamp(10px,2vw,40px)] my-[2rem]'>About</li>
            <li className='mx-[clamp(10px,2vw,40px)] my-[2rem]'>Services</li>
            <li className='mx-[clamp(10px,2vw,40px)] my-[2rem]'>Work</li>
            <li className='mx-[clamp(10px,2vw,40px)] my-[2rem]'>Contact</li>
          </ul>
        </div>
        <div ref={menuContainer} onClick={handleMenuClick} className={`${menuActive ? `${styles.menucontaineractive}` : `${styles.menucontainer}`} xl:translate-x-[150px] z-[101]`}>
        <div ref={menuBtn} className='menu top-0 right-0 z-[101]' >
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
        </div>
        
        </div>
        <nav ref={menu} className='translate-x-[100%] navmenu fixed bg-[#111] h-[100vh] w-full md:w-auto top-0 right-0 text-white z-[99]'>
        <div className='body p-[100px] xl:pr-[200px] 3xl:pr-[400px] flex justify-center md:justify-between'>
          <div className='nav flex flex-col text-[clamp(2rem,2.5vw,3rem)] font-[monument] uppercase gap-[12px] leading-[clamp(2.5rem,5vw,5rem)] mt-[clamp(1rem,4vh,20rem)]'>
            <div className='header'>
              <p className='text-[20px] border-b-[1px] mb-[50px]'>Navigation</p>
              <ul>
                <li>Home</li>
                <li>About</li>
                <li>Services</li>
                <li>Work</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      
      
      
      <div ref={section1} id="section1" className='h-[calc(100vh-60px)] md:h-screen w-full relative bg-[#111]'>
      <video
        id="video3"
        autoPlay
        muted
        loop
        playsInline
        className="blurred w-[100%] h-[100%] absolute bottom-[0%] left-0 object-cover opacity-21"
      >
        <source src="/images/bg30.webm" type="video/webm" />
      </video>
      <BgLines1 />
      {/*<Image src={'/images/bg-img7.jpg'} width={3072} height={1856} className='w-full h-full absolute top-0 left-0 z-[0]' />*/}
      <div ref={tint} className='hidden md:inline-block bg-[#145363] opacity-0 w-full h-full absolute z-[5] mix-blend-color'></div>
      <div className='hidden lg:inline-block noise w-[400vw] h-[400vh] left-[-100vw] top-[-100vh] mx-auto fixed z-[10]'></div>
       <div className=' h-full w-full left-0 right-0 mx-auto absolute overflow-hidden'>
       <HologramImg ref={hologramRef} numImages={5} src={'/images/keoniis-62.webp'} translateX={'0%'} opacity={0} width={1400} height={1473} />
      
        <DynamicHero5 activeVideo={activeVideo} toggleVideo={toggleVideo} cycleVideo={cycleVideo} />
        
      </div>
      </div>
      <div id="section2" className='w-[100%] h-[100vh] bg-[#fff]'>
      
      </div>
      
      
    </main>
  );
}
