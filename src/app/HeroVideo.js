// components/YoyoVideo.js
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const HeroVideo = ({ activeVideo }) => {
  const videoRefs = [useRef(null), useRef(null), useRef(null)];
  const container = useRef(null);

  useEffect(() => {
    // Animate intro for the first video on mount
    
    gsap.to(container.current, { y: 0, duration: 1 });
    
  }, []);

  useEffect(() => {
    videoRefs.forEach((ref, index) => {
      const video = ref.current;
  
      // Ensure video element and HTMLVideoElement methods are available
      if (video instanceof HTMLVideoElement) {
        if (index === activeVideo - 1) {
          gsap.to(video, { opacity: 1, duration: 1 });
          video.play().catch(error => {
            // Handle play promise rejection (e.g., autoplay policy)
            console.error('Error playing video:', error);
          });
        } else {
          gsap.to(video, { opacity: 0, duration: 1 });
          video.pause();
          video.currentTime = 0; // Optional: reset video to start
        }
      } else {
        console.warn('Ref is not pointing to an HTMLVideoElement:', video);
      }
    });
  }, [activeVideo, videoRefs]);
  

  return (
    <div ref={container} className='opacity-1 absolute left-0 top-0 right-0 bottom-0 mx-auto translate-y-[100%]'>
      <video
        ref={videoRefs[0]}
        id="video1"
        muted
        loop
        playsInline
        className="blurred w-[100%] h-[100%] absolute bottom-[0%] left-0 object-cover opacity-0"
      >
        <source src="/images/bgacid3.webm" type="video/webm" />
      </video>
      <video
        ref={videoRefs[1]}
        id="video2"
        muted
        loop
        playsInline
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
        playsInline
        className="blurred w-[100%] h-[100%] absolute bottom-[0%] left-0 object-cover"
      >
        <source src="/images/bg11.webm" type="video/webm" />
      </video>
    </div>
  );
};

export default HeroVideo;