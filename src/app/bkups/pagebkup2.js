'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import SplitType from "split-type";
import HoverButton from "./components/Hoverbtn";
import ReflectiveText from "./reflectivetext";
import GlowingText from "./components/glowingtext";
import About from "./about";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

export default function Home() {


  useEffect(() => {
    const animateIntro = async () => {
      // Splittext animation
      const first = new SplitType('#first');
      const second = new SplitType('#second');
      const third = new SplitType('#third');
      const fourth = new SplitType('#fourth');
      const video1 = document.getElementById('video');
      const block1 = document.querySelector('#block1');
      const block2 = document.querySelector('#block2');
      const block3 = document.querySelector('#block3');
      const ufo = document.querySelector('#ufo');
      const about = document.querySelector('#about');
      const allblocks = [block1, block2, block3];

      const tl = gsap.timeline({ defaults: { ease: 'power4.inOut', } });

      gsap.set([third.chars, fourth.chars], { display: 'inline-block' });

      tl
        .to(block1, { x: "-60%", duration: 1.3, ease: "elastic.out(1,0.5)" }, "")
        .to(block2, { x: "-60%", duration: 1.3, ease: "elastic.out(1,0.5)" }, "<")
        .to(block3, { x: "-60%", duration: 1.3, ease: "elastic.out(1,0.5)" }, "<")
        .to(first.chars, { y: 0, opacity: 1, stagger: 0.05, duration: .5, }, "<" )
        .to(second.chars, { y: 0, opacity: 1, stagger: 0.05, duration: .5, }, )
        .to(first.words, { y: "10rem", opacity: 0, stagger: 0.05, duration: .5 }, "+=0.6")
        .to(second.words, { y: "10rem", opacity: 0, stagger: 0.05, duration: .5 }, "<")
        .to(block1, { x: "100%", duration: 3, ease: "elastic.out(1,0.6)" }, "-=.1")
        .to(block2, { x: "100%", duration: 3, ease: "elastic.out(1,0.6)" }, "<")
        .to(block3, { x: "100%", duration: 3, ease: "elastic.out(1,0.6)" }, "<")
        .to(third.chars, { y: 0, opacity: 1, stagger: 0.05, duration: 0.5 }, "<")
        .to(fourth.chars, { y: 0, opacity: 1, stagger: 0.05, duration: 0.5 }, "<")
  
        .to("#bgwhite", { y: "100%", duration: 1.2,  ease: "bounce.out"  }, "-=1.3")
        .to(video1, { onStart: () => video1.play() }, "<")
        .to(ufo, { y: 0, duration: 2, ease: "elastic.out(1,0.6)"}, )
        
        .to(fourth.chars, { y: "-50vh", opacity: 1, stagger: 0.05, duration: 0.5 }, "-=.8")
        .to(third.chars, { y: "-50vh", opacity: 1, stagger: 0.05, duration: 0.5 }, "-=1.3")
        .to(ufo, { y: "-50vh", duration: 1, ease: "elastic.out(1,0.6)"}, )
        .to("#avatar", { x: 0, y: 0, opacity: 1, duration: 0.5 },"-=.5" )
        .to("#container2", { display: "block", duration: 1}, "<")
        .to(allblocks, { onUpdate: function() {allblocks.forEach(block => {block.style.mixBlendMode = "normal"});}}, "<")
        .to(allblocks, { x: "50%", duration: 1, ease: "elastic.out(1,0.6)" }, "<")
        .to(ufo, { y: 0, x: "-60vh", duration: 2, ease: "elastic.out(1,0.6)"}, "<")

        .to(third.chars, { y: 0, opacity: 1, stagger: 0.05, duration: 0.5 }, "-=1.3")
        .to(fourth.chars, { y: 0, opacity: 1, stagger: 0.05, duration: 0.5 }, "<")
        .to(ufo, { y: "-50vh", duration: 1.5, ease: "elastic.out(1,0.6)"}, )
        .to(["#thirddiv", "#fourthdiv"], { overflow: "visible" }, "<" )
      
        .to(block1, { x: "30%", duration: 0.4 },"<" )
        .to(block2, { x: "50%", duration: 0.4 }, "<")
        .to(block3, { x: "70%", duration: 0.4 }, "<")
        .to(allblocks, { x: "50%", duration: 0.4 }, "-=1")
        .to(block1, { x: "100%", duration: 0.4 }, "-=.5")
        .to(block2, { x: "-50%", duration: 1.5, ease: "bounce.out" }, "<")
        .to(block3, { x: "100%", duration: 0.4, }, "<")
    
        .to(block2, { x: "-100%", duration: 0.4 }, "-=.3" )

        .to(third.chars, {fontSize: "15rem", duration: .7}, "<")
        .to(fourth.chars, {fontSize: "15rem", duration: .7}, "<+=.1")

        .to("#bgwhite", { y: "0%", duration: 1.2,  ease: "bounce.out"  }, "<")

       

        .to(third.chars, {
          rotation: (index) => (index === 2 || index === 4 ? -20 : 0), // Apply rotation to 'T' and 'R'
          transformOrigin: (index) => (index === 2 || index === 4 ? 'top right' : 'center'),
          duration: 1,
          stagger: 0.1,
          ease: "elastic.out(1,0.6)",
        })

        .to(about, { y: "-10vh", opacity: 1, duration: 1.5, ease: "power4.out" }); // Pop up the "About" component
      
      
    };

    animateIntro();
  }, []);

  return (
    <main id="main" className='relative bg-white'>
      <div className='header w-[100%] fixed flex z-[4] top-0 justify-between text-[white] mix-blend-difference'>
        <div className='logo cursor-pointer mx-5'>
          <h1 className='inter-sans text-[3rem] text-white inline-block'>keoniis.</h1>
        </div>
        <div className='nav flex items-center'>
          <ul className='mx-5 flex flex-column relative text-[20px] uppercase'>
            <li className='p-10'>Home</li>
            <li className='p-10'>About</li>
            <li className='p-10'>Services</li>
            <li className='p-10'>Work</li>
            <li className='p-10'>Contact</li>
          </ul>
        </div>
      </div>

      <div className='relative h-[100vh] w-full overflow-hidden bg-black'>
        <video id="video" preload="none" loop muted playsInline className=' blurred w-full h-auto z-[2] absolute top-0 left-0 bottom-0 right-[-5%]'>
          <source src="/images/bg23.mp4" type="video/mp4" />
        </video>
        <div id="bgoverlay" className='absolute z-[2] w-[100%] h-[100%] top-0 left-0 bg-black/0 '></div>
        <div id="bgwhite" className='absolute z-[2] w-[100%] h-[100%] bottom-0 left-0 bg-white/100 '></div>
        <div id="block1" className='absolute z-[3] w-[100%] h-[33.33%] bottom-0 left-0 bg-[#fff] mix-blend-difference '></div>
        <div id="block2" className='absolute z-[3] w-[100%] h-[33.33%] bottom-[33.33%] left-0 bg-[#fff] mix-blend-difference '></div>
        <div id="block3" className='absolute z-[3] w-[100%] h-[33.33%] bottom-[66.66%] left-0 bg-[#fff] mix-blend-difference '></div>


        <div className='w-full h-full max-w-[2400px] absolute left-0 right-0 mx-auto'>
        <Image id="avatar" src={'/images/keoniis-20.png'} height={1460} width={928} className='w-[33%] 2xl:w-[33%] absolute bottom-[-15%] 2xl:bottom-[-5%] right-[0%] 2xl:right-[3%] translate-x-[-15%] opacity-0 z-[4]' />
        <Image id="ufo" src={'/images/ufo.svg'} height={100} width={700} className='absolute z-[4] top-0 left-0 right-0 mx-auto translate-y-[-50vh]' /> 
        <div className=' absolute w-[100%] h-full top-0 left-0 z-[4] mix-blend-difference uppercase'>
  
          <div className='absolute w-[50%] h-[100%] right-0 overflow-hidden z-[4]  uppercase text-left flex-col content-center items-center'>
            <div className='w-[auto] h-[auto] overflow-hidden'>
          <h1 id="first" className='w-full first leading-[6rem] 2xl:leading-[9rem] text-[7rem] 2xl:text-[10rem] text-white  mont-heavy'>HELLO</h1>
            </div>
            <div className='w-[auto] h-[auto] overflow-hidden'>
          <h1 id="second" className='w-full second leading-[6rem] 2xl:leading-[9rem] text-[7rem] 2xl:text-[10rem] text-white  mont-heavy'>I'M KEONIIS</h1>
          </div>
          </div>
          <div id="container2" className='absolute h-full left-[0] right-0 overflow-hidden z-[4]  uppercase flex-col flex justify-center content-center items-center'>
          <div id="thirddiv" className='w-[auto] h-[auto] overflow-hidden'>
          <h1 id="third" className='third leading-[5rem] 2xl:leading-[8rem] text-[6rem] 2xl:text-[10rem] text-white mont-heavy'>Creative</h1>
          </div>
          <div id="fourthdiv" className='w-[auto] h-[auto] overflow-hidden'>
          <h1 id="fourth" className='fourth leading-[5rem] 2xl:leading-[8rem] text-[6rem] 2xl:text-[10rem] text-white mont-heavy'>Developer</h1>
          </div>
  </div>
    </div>
        

          
      
        </div>
        
      </div>
      <About id="about" className='translate-y-[-20%]'  />
      
      
    </main>
  );
}
