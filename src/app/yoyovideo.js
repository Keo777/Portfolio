// components/YoyoVideo.js
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const YoyoVideo = ({ activeVideo }) => {
  const videoRefs = [useRef(null), useRef(null), useRef(null)];
  const container = useRef(null);

  useEffect(() => {
    // Animate intro for the first video on mount
    
    gsap.to(container.current, { opacity: 1, duration: 3 });
    
  }, []);

  useEffect(() => {
    videoRefs.forEach((ref, index) => {
      if (index === activeVideo - 1) {
        gsap.to(ref.current, { opacity: 1, duration: 1 });
        ref.current.play();
      } else {
        gsap.to(ref.current, { opacity: 0, duration: 1 });
        ref.current.pause();
        ref.current.currentTime = 0; // Optional: reset video to start
      }
    });
  }, [activeVideo]);

  

  return (
    <div ref={container} className='opacity-0'>
      <video
        ref={videoRefs[0]}
        id="video1"
        muted
        loop
        className="blurred w-[100%] h-[100%] absolute bottom-[0%] left-0 object-cover opacity-0"
      >
        <source src="/images/bgacid3.webm" type="video/webm" />
      </video>
      <video
        ref={videoRefs[1]}
        id="video2"
        muted
        loop
        className="blurred w-[100%] h-[100%] absolute bottom-[0%] left-0 object-cover opacity-0"
      >
        <source src="/images/bgacid2.webm" type="video/webm" />
      </video>
      <video
        ref={videoRefs[2]}
        id="video3"
        autoPlay
        muted
        loop
        className="blurred w-[100%] h-[100%] absolute bottom-[0%] left-0 object-cover"
      >
        <source src="/images/bg11.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default YoyoVideo;