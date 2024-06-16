import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

const BgLines1 = () => {
    const linesRef = useRef([]);

    useEffect(() => {
        
    }, []);

    return (
        <div className='lines'>
            {Array(5).fill().map((_, i) => (
                <div key={i} ref={el => linesRef.current[i] = el} className='line'></div>
            ))}
        </div>
    );
};

export default BgLines1;