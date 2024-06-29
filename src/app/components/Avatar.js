import { forwardRef, useEffect } from "react";
import Image from "next/image";

const Avatar = forwardRef(({ src, translateX, scale, opacity, zIndex, bottom, top, right, xlRight, xxlRight, left, width, height, index, total }, ref) => {
  
  return (
    <Image
      alt="avatarimg"
      ref={ref}
      src={src}
      height={height}
      width={width}
      className={`opacity-${opacity} w-[clamp(25rem,50vw,60rem)] absolute bottom-${bottom} top-${top} right-${right} left-${left} xl:right-[${xlRight}] 2xl:right-[${xxlRight}] m-auto z-[${zIndex}] `}
      style={{ transform: `translateX(${translateX}) scale(${scale})`, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
    />
  );
});

Avatar.displayName = "Avatar"; // Required for forwardRef components

export default Avatar;