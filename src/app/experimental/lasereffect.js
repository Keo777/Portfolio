// components/LaserBeam.js
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const LaserBeam = () => {
  const laserRef = useRef();

  // Initial static position for debugging
  return (
    <line ref={laserRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={['attributes', 'position']}
          array={new Float32Array([0, 0, 0, 0, 5, 0])} // Y-axis line for better visibility
          count={2}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial attach="material" color="red" />
    </line>
  );
};

export default LaserBeam;