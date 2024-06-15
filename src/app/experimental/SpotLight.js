// components/SpotLightParticles.js
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const MovingSpotLight = () => {
  const particlesRef = useRef();

  useFrame(() => {
    // Update particle positions or attributes here
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry attach="geometry">
        {/* Define particle positions */}
        <bufferAttribute
          attachObject={['attributes', 'position']}
          array={new Float32Array([0, 0, 0, 1, 1, 1])}
          count={2}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        color="white"
        size={0.1}
        sizeAttenuation
        transparent
        opacity={0.5}
        blending="AdditiveBlending"
      />
    </points>
  );
};

export default MovingSpotLight;