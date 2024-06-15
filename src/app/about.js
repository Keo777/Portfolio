import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger"; // Ensure you have imported ScrollTrigger

export default function About() {

  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -0.5;

  useEffect(() => {

    // Infinite Scroll Text

    gsap.registerPlugin(ScrollTrigger);

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
    };

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
    });

  }, []);

  return (
    <div className='w-full h-full absolute bg-white z-[10] overflow-hidden containershadow'>
      <div className='absolute top-0 z-[2]'>
          <div ref={slider} className='relative whitespace-nowrap uppercase'>
            <p ref={firstText} className='m-0 text-[#DB3D4E] text-[14rem] relative pr-[50px] mont-heavy'>About Me • What I do •</p>
            <p ref={secondText} className='m-0 text-[#DB3D4E] text-[14rem] absolute left-[100%] top-0 pr-[50px] mont-heavy'>About Me • What I do •</p>
          </div>
    </div>
    </div>
  );
};