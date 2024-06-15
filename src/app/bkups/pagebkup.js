'use client';
import Image from "next/image";
import {gsap} from "gsap";
import { useEffect, useRef } from "react";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import SplitType from "split-type";
import HoverButton from "./components/Hoverbtn";


export default function Home() {

  useEffect(() => {

     // Splittext animation
  const first = new SplitType('#first')
  const second = new SplitType('#second')
  const third = new SplitType('#third')
  const fourth = new SplitType('#fourth')
  const video1 = document.getElementById('video');

  const tl = gsap.timeline({defaults: {ease: 'power4.inOut'}})

  tl

  
  .to(first.chars, {
    y: 0,
    opacity: 1,
    stagger: .07,
    duration: .4,
  })

  .to(second.chars, {
    y: 0,
    opacity: 1,
    stagger: .07,
    duration: .4
  }, "+=.6")


  .to(first.chars, {
    y: "-10rem",
    opacity: 0,
    stagger: .07,
    duration: .4,
  }, "+=.6")

  .to(second.chars, {
    y: "-10rem",
    opacity: 0,
    stagger: .07,
    duration: .4
  }, "<")

  .to(third.chars, {
    y: 0,
    opacity: 1,
    stagger: .07,
    duration: .4,
  })

  .to(fourth.chars, {
    y: 0,
    opacity: 1,
    stagger: .07,
    duration: .4
  }, "<")

  .to("#bgwhite", {
    y: "100%",
    duration: .5
  }, )

  .to(video1, {
    onStart: () => video1.play()
  }, "<")

  .to("#avatar", {
    x: 0,
    y: 0,
    opacity: 1,
    duration: .6
  }, )

  

  .to("#block1", {
    x: "-50%",
    duration: .4
  }, )

  .to("#block2", {
    x: "-50%",
    duration: .4
  }, "<")

  .to("#block3", {
    x: "-50%",
    duration: .4
  }, "<")

  

  .to("#block1", {
    x: "-70%",
    duration: .4
  }, "+=1")

  .to("#block2", {
    x: "-50%",
    duration: .4
  }, "<")

  .to("#block3", {
    x: "-30%",
    duration: .4
  }, "<")

  .to("#block1", {
    x: "-50%",
    duration: .4
  }, )

  .to("#block2", {
    x: "-50%",
    duration: .4
  }, "<")

  .to("#block3", {
    x: "-50%",
    duration: .4
  }, "<")


  .to("#block1", {
    x: "50%",
    duration: .4
  }, )

  .to("#block2", {
    x: "50%",
    duration: .4
  }, "<")

  .to("#block3", {
    x: "50%",
    duration: .4
  }, "<")


  .to("#block1", {
    x: "30%",
    duration: .4
  }, "+=1")

  .to("#block2", {
    x: "50%",
    duration: .4
  }, "<")

  .to("#block3", {
    x: "70%",
    duration: .4
  }, "<")

  const handleVideoEnd = () => {
    video1.pause();
  };

  video1.addEventListener('ended', handleVideoEnd);

  

  

    {/*gsap.registerPlugin(ScrollTrigger);
    requestAnimationFrame(animate);

    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        scrub: true,
        onUpdate: e => direction = e.direction * -0.5
      },
      x: "-=500px"
    }) */}
  }, [])

 







// Infinite Scroll Text

 {/* const firstText = useRef(null);
  const secondText = useRef(null);
  let slider = useRef(null);
  let xPercent = 0;
  let direction = -0.5;

  const animate = () => {
    if(xPercent < -100){
      xPercent = 0;
    }
    else if(xPercent > 0){
      xPercent = -100;
    }
    gsap.set(firstText.current, {xPercent: xPercent})
    gsap.set(secondText.current, {xPercent: xPercent})
    requestAnimationFrame(animate);
    xPercent += 0.1 * direction;
  } */}

  // Glitch text effect

   
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  const glitched = e => {
    let iterations = 0;

    const interval = setInterval(() => {
      e.target.innerText = e.target.innerText.split("")
      .map((letter, index) => {
        if(index < iterations) {
          const arr = e.target.dataset
          return arr.value[index];
        }
       return letters[Math.floor(Math.random() * 26)]
    })
      .join("");

      if(iterations >= e.target.dataset.value.length) clearInterval(interval);

      iterations += 1 / 2;
    }, 30);
  };


  return (
    <main className='relative bg-blue-600'>

      <div className='header w-[100%] fixed flex z-[4] top-0 justify-between text-[white] mix-blend-difference'>
        <div className='logo cursor-pointer mx-5'><h1 className='inter-sans text-[3rem] text-white inline-block'>keoniis.</h1></div>
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

      <video id="video" preload="none" muted playsInline className='blurred w-full h-auto z-[2] absolute top-0 left-0 bottom-0 right-[-5%]'>
      <source src="/images/bg10.mp4" type="video/mp4" />
      </video>
      <div id="bgwhite" className='absolute z-[2] w-[100%] h-[100%] bottom-0 left-0 bg-white/100 '></div>
      <div id="block1" className='absolute z-[3] w-[100%] h-[33.33%] bottom-0 left-0 bg-white/100 mix-blend-difference '></div>
      <div id="block2" className='absolute z-[3] w-[100%] h-[33.33%] bottom-[33.33%] left-0 bg-white/100 mix-blend-difference '></div>
     <div id="block3" className='absolute z-[3] w-[100%] h-[33.33%] bottom-[66.66%] left-0 bg-white/100 mix-blend-difference '></div>

       

        <div className='w-full h-full max-w-[2200px] absolute left-0 right-0 mx-auto'>
        <Image id="avatar" src={'/images/keoniis-18.png'} height={1465} width={929} className='w-[33%] 2xl:w-[37%] absolute bottom-[-15%] 2xl:bottom-[-10%] right-[0%] 2xl:right-[3%] translate-x-[15%] opacity-0 z-[4]' />
        <div className=' absolute w-[100%] h-[auto] left-[0] top-[calc(50%-10rem)] 2xl:top-[35%] z-[4] mix-blend-difference uppercase'>
  
          <div className='absolute h-auto left-0 right-0 mx-auto overflow-hidden top-[calc(50%-10rem)] 2xl:top-[calc(50%-0rem)] z-[4] mix-blend-difference uppercase text-center items-center'>
          <h1 id="first" className='first w-full leading-[8rem] text-[10rem] text-white mix-blend-difference inline-block inter-sans'>HELLO<br /></h1>

          <h1 id="second" className='second w-full leading-[8rem] text-[10rem] text-white mix-blend-difference inline-block inter-sans'>I'M KEONIIS</h1>
          </div>
          <div id="container2" className='absolute h-auto left-[0] right-0 overflow-hidden top-[calc(50%-10rem)] 2xl:top-[calc(50%-5rem)] z-[4] mix-blend-difference uppercase'>
          <h1 id="third" className='third leading-[5rem] 2xl:leading-[7rem] text-[6rem] 2xl:text-[8rem] text-white inter-sans mix-blend-difference'>Creative<br />Developer</h1>
  <h1 id="fourth" className='fourth leading-[5rem] 2xl:leading-[7rem] text-[6rem] 2xl:text-[8rem] text-white inter-sans mix-blend-difference'>Graphic<br />Designer</h1>
  </div>
    </div>
        

          
          {/*<div className='absolute overflow-hidden top-[33%] z-[4]'>
            
            <span onMouseEnter={glitched} data-value="HELLO"className='first text-[100px] text-white inline-block translate-y-[300px] mont-light'>HELLO</span>
            <span onMouseEnter={glitched} data-value={["I'M"]} className='ml-10 second text-[100px] text-white inline-block translate-y-[300px] mont-light'>I'M</span>
            
           </div>
          <div className='absolute overflow-hidden top-[39%] z-[4] left-[0]'>
            <h1 onMouseEnter={glitched} data-value={["KEONIIS"]} className='third text-[155px] text-white translate-y-[300px] mont-light'>KEONIIS</h1>
          </div>
          <div className='absolute overflow-hidden bottom-[30%] left-0 z-[3]'>
            <h1 onMouseEnter={glitched} data-value="CREATIVE" className='fourth text-[140px] text-white translate-y-[300px] mont-light'>CREATIVE</h1>
          </div>
          <div className='absolute overflow-hidden bottom-[24%] left-0 z-[2]'>
            <h1 onMouseEnter={glitched} data-value="DEVELOPER" className='fifth text-[100px] text-white translate-y-[300px] mont-light'>DEVELOPER</h1>
         </div>*/}
        </div>
        {/*<div className='absolute top-[calc(100vh-400px)] z-[2]'>
          <div ref={slider} className='relative whitespace-nowrap'>
            <p ref={firstText} className='m-0 text-white/20 text-[270px] relative pr-[50px] font-[monument]'>Frontend Developer •</p>
            <p ref={secondText} className='m-0 text-white/20 text-[270px] absolute left-[100%] top-0 pr-[50px] font-[monument]'>Frontend Developer •</p>
          </div>
  </div>*/}
      </div>
      <div className='w-[100%] h-[50vh] relative bg-slate-500'>
      <HoverButton text="Hello" />
      </div>
      
      
    </main>
  );
}
