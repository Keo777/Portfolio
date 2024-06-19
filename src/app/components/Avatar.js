import { forwardRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

const Avatar = forwardRef(({ src, translateX, scale, opacity, zIndex, bottom, top, right, xlRight, xxlRight, left, width, height, index, total }, ref) => {
  useEffect(() => {
    const maxRotate = 10; // Maximum rotation in degrees

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
        const scaleValue = (index + 1) / total;
        const scaledRotateX = rotateX * scaleValue;
        const scaledRotateY = rotateY * scaleValue;

      gsap.to(ref.current, {
        rotationX: scaledRotateX,
        rotationY: -scaledRotateY,
        transformPerspective: 500,
        ease: "power2.out",
        duration: 2,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("deviceorientation", handleDeviceOrientation);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
    };
  }, [ref]);

  return (
    <Image
      alt="avatarimg"
      ref={ref}
      src={src}
      height={height}
      width={width}
      className={`opacity-${opacity} w-[clamp(500px,48vw,1000px)] absolute bottom-${bottom} top-${top} right-${right} left-${left} xl:right-[-40%] 2xl:right-[-30%] m-auto z-[${zIndex}] `}
      style={{ transform: `translateX(${translateX}) scale(${scale})` }}
    />
  );
});

Avatar.displayName = "Avatar"; // Required for forwardRef components

export default Avatar;