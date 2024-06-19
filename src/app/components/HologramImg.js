import Avatar from "./Avatar";
import { useRef, createRef, forwardRef, useImperativeHandle } from "react";

const HologramImg = forwardRef(({ numImages, src, translateX, opacity, width, height }, ref) => {
    const avatarRefs = useRef([]);

   // Initialize refs if not already done
   if (avatarRefs.current.length !== numImages) {
    avatarRefs.current = Array(numImages)
      .fill()
      .map((_, i) => avatarRefs.current[i] || createRef());
  }

  useImperativeHandle(ref, () => ({
    avatars: avatarRefs.current,
  }), [avatarRefs]);

  const avatars = Array.from({ length: numImages }, (_, index) => ({
    scale: 1 - index * 0.06,
    top: `${index}%`,
    zIndex: numImages - index,
  }));

  return (
    <>
      {avatars.map((avatar, index) => (
        <Avatar
          key={index}
          index={index}
          total={numImages}
          ref={avatarRefs.current[index]}
          src={src}
          translateX={translateX}
          scale={avatar.scale}
          opacity={opacity}
          zIndex={avatar.zIndex}
          bottom="0"
          top="0"
          width={width}
          height={height}
          right="0"
          left="0"
          xlRight="-40%"
          xxlRight="-30%"
        />
      ))}
    </>
  );
});

HologramImg.displayName = "HologramImg"; // Required for forwardRef components

export default HologramImg;